import { Cloud, DeviceThermostat, QuestionMark, Water } from "@mui/icons-material";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import Sensor from "../models/sensor";
import { GetReadings } from "../services/api-service";
import { AppContext } from "../utils/app-context";

const ReadingTile:React.FC<{sensor:Sensor}> = ({...props}):ReactElement => {
    const context = useContext(AppContext);
    const [reading, setReading] = useState<number | string>("Brak danych");
    
    const GetUnit = ():string => {
        switch(props.sensor.unit){
            case "Celsius":
                return "°C"
            
            case "Percentage":
                return "%"
            
            case "PM2.5":
                return "PM2.5"
            
            default:
                return " "
        }
        
    }
    const TileIcon = ():ReactElement => {
        switch(props.sensor.sensor_name){
            case "Temperature":
                return <DeviceThermostat />
            
            case "Humidity":
                return <Water />
            
            case "Pollution":
                return <Cloud />
            
            default:
                return <QuestionMark />
        }
    }

    const TileTitle = ():string => {
        switch(props.sensor.sensor_name){
            case "Temperature":
                return "Temperatura"
            
            case "Humidity":
                return "Wilgotność"
            
            case "Pollution":
                return "Zanieczyszczenie"
            
            default:
                return "Nieznane"
        }
    }

    useEffect(() => {
        const getReadings = async () => {
            const res = await GetReadings(context.selectedCityId, props.sensor.id, context.readingsDate);
            if(res.status === 200 && res.data){
                setReading(res.data);
            }
            else{
                console.error(`Status: ${res.status} | ${res.data}`)
                setReading("Brak danych")
            }
        }
        getReadings()
    }, [context.selectedCity, props.sensor.id, context.selectedCityId, context.readingsDate])

    return(
        <React.Fragment>
            <Card className="readings-card">
                <CardHeader className="readings-card-header" avatar={TileIcon()} title={TileTitle()} />
                <CardContent className="readings-card-content">
                    <Typography variant="body1" className="readings-card-content-body">
                        {reading !== "Brak danych" ?
                            <span className="readings-card-value">{reading}&nbsp;<span className="readings-card-unit">{GetUnit()}</span></span> :
                            <span className="readings-card-missing-data">{reading}</span>
                        }
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default ReadingTile
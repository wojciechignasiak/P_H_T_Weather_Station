import React, { ReactElement, useContext, useEffect } from "react"
import "../assets/styles/main-page.scss"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import City from "../models/city" 
import { GetCities, GetSensors } from "../services/api-service"
import { AppContext } from "../utils/app-context"
import Sensor from "../models/sensor"
import { useNavigate } from "react-router-dom"

const MainPage:React.FC = ():ReactElement => {
    const context = useContext(AppContext)
    const navigate = useNavigate();
    useEffect(() => {
        const getCities = async () => {
            const res = await GetCities();
            if(res.status === 200 && res.data){
                context.setCities(res.data as City[])
            }
            else{
                console.error(`Status: ${res.status} | ${res.data}`)
            }
        }
        const getSensors = async () => {
            const res = await GetSensors();
            if(res.status === 200 && res.data){
                context.setSensors(res.data as Sensor[])
            }
            else{
                console.error(`Status: ${res.status} | ${res.data}`)
            }
        }
        getCities();
        getSensors();
    }, [])

    const handleChange:Function = (e:SelectChangeEvent<number>):void => {
        context.setSelectedCityId(e.target.value as number)
        if(context.cities.length > 0){
            var city = context.cities.find(x => x.id === e.target.value as number);
            var sensors:Sensor[] = []
            if(city !== undefined){
                city.sensor_list.forEach(x => {
                    context.sensors.forEach(y => {
                        if(y.id === x)
                        {
                            sensors.push(y)
                        }
                    });
                })
                context.setSelectedCity(city)
                context.setSelectedCitySensors(sensors)
            }
        }
    }

    return(
        <React.Fragment>
            <div className="main-page-wrapper">
                <div className="main-page-content">
                    <h1>PHT Weather station</h1>
                    <h2>Temperatura, wilgotność, zanieczyszczenie</h2>
                    <FormControl variant="standard" className="city-select-control">
                        <InputLabel id="city-select-label" className="city-select-label">Miasto</InputLabel>
                        <Select className="city-select" labelId="city-select-label" value={context.selectedCityId !== null ? context.selectedCityId : null }  onChange={(e:SelectChangeEvent<unknown>) => {handleChange(e)}}>
                            {context.cities.map((city, index) =>  {
                                return(
                                    <MenuItem key={index} value={city.id}>{city.city_name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <div className="check-weather-btn-wrapper">
                        <Button disabled={context.selectedCityId !== null ? false : true} variant="outlined" className="check-weather-btn" onClick={()=>{navigate("/readings")}}>Sprawdź</Button>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    )
}

export default MainPage
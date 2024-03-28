import React, { ReactElement, useContext, useEffect, useState } from "react"
import "../assets/styles/readings-page.scss"
import { FormControl, Select, MenuItem, SelectChangeEvent, Button } from "@mui/material"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ReadingTile from "../components/reading-tile"
import { AppContext } from "../utils/app-context"
import { useNavigate } from "react-router-dom"
import Sensor from "../models/sensor"


const ReadingsPage:React.FC = ():ReactElement => {
    const context = useContext(AppContext)
    const [readingDate, setReadingDate] = useState<Date | null>(context.readingsDate)
    const navigate = useNavigate();
    useEffect(() => {
        if(context.cities.length > 0 && context.selectedCityId !== null){
            document.title = `PHT - ${context.selectedCity.city_name}`
        }
        else{
            navigate("/")
        }
    }, [context, navigate])

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

    const getReadingsFromDate = () => {
        context.setReadingsDate(readingDate)
    }
    const getTodaysReadings = () => {
        setReadingDate(null)
        context.setReadingsDate(null)
    }

    return(
        <React.Fragment>
            <div className="readings-page">
                <div className="readings-page-content">
                    <div className="readings-header">
                        <h1>Aktualne warunki pogodowe w</h1>
                        <FormControl variant="standard" className="city-select-control">
                            <Select className="city-select" labelId="city-select-label"  value={context.selectedCityId !== null ? context.selectedCityId : null } onChange={(e:SelectChangeEvent<unknown>) => {handleChange(e)}}>
                                {context.cities.map((city, index) =>  {
                                    return(
                                        <MenuItem key={index} value={city.id}>{city.city_name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="readings-dates">
                        <div className="readings-dates-form">
                            <FormControl className="readings-dates-from-control">
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DateTimePicker className="reading-date-select" value={readingDate} onChange={(value) => {setReadingDate(value)}} label={"Data odczytów"} ampm={false} views={['year', 'day', 'hours', 'minutes']}/>
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl className="readings-dates-from-control readings-dates-button">
                                <Button disabled={readingDate !== null ? false : true} variant="outlined" className="switch-date-btn" onClick={()=>{getReadingsFromDate()}}>Sprawdź</Button>
                            </FormControl>
                            <FormControl className="readings-dates-from-control readings-dates-button">
                                <Button variant="outlined" className="switch-date-btn" onClick={()=>{getTodaysReadings()}}>Aktualne</Button>
                            </FormControl>
                        </div>
                    </div>
                    <div className="readings-container">
                        {context.selectedCitySensors.map((sensor, id) => {
                            return(
                                <ReadingTile sensor={sensor} key={id} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ReadingsPage
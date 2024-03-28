import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import City from "../models/city";
import Sensor from "../models/sensor";

interface AppContextType{
    cities: City[];
    sensors: Sensor[];
    selectedCity: City
    selectedCitySensors: Sensor[]
    selectedCityId: number | null
    readingsDate:Date | null
    formattedDate:string | null
    setCities:Dispatch<SetStateAction<City[]>>
    setSensors:Dispatch<SetStateAction<Sensor[]>>
    setSelectedCity:Dispatch<SetStateAction<City>>
    setSelectedCitySensors:Dispatch<SetStateAction<Sensor[]>>
    setSelectedCityId:Dispatch<SetStateAction<number | null>>
    setReadingsDate:Dispatch<SetStateAction<Date | null>>
    setFormattedDate:Dispatch<SetStateAction<string | null>>
}

const defaultState:AppContextType = {
    cities: [],
    sensors: [],
    selectedCity: {id: NaN, city_name:"", sensor_list:[]},
    selectedCitySensors:[],
    selectedCityId: null,
    readingsDate: null,
    formattedDate: null,
    setCities: () => {},
    setSensors: () => {},
    setSelectedCity: () => {},
    setSelectedCitySensors: () => {},
    setSelectedCityId: () => {},
    setReadingsDate: () => {},
    setFormattedDate: () => {}
}

export const AppContext = createContext<AppContextType>(defaultState)

type AppProvider = {
    children: ReactNode
}

export const AppContextProvider:React.FC<AppProvider> = ({children}:AppProvider) => {

    const [cities, setCities] = useState<City[]>([])
    const [sensors, setSensors] = useState<Sensor[]>([])
    const [selectedCity, setSelectedCity] = useState<City>({id:NaN, city_name:'', sensor_list:[]})
    const [selectedCitySensors, setSelectedCitySensors] = useState<Sensor[]>([])
    const [selectedCityId, setSelectedCityId] = useState<number | null>(null)
    const [readingsDate, setReadingsDate] = useState<Date | null>(null)
    const [formattedDate, setFormattedDate] = useState<string | null>(null)

    return(
        <AppContext.Provider value={{cities, setCities, sensors, setSensors, selectedCity, setSelectedCity, selectedCitySensors, setSelectedCitySensors, selectedCityId, setSelectedCityId, readingsDate, setReadingsDate, formattedDate, setFormattedDate}}>{children}</AppContext.Provider>
    )
}


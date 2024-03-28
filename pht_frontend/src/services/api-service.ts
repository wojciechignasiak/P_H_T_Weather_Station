import axios, { Axios, AxiosResponse } from "axios";
import moment from "moment";
const instance:Axios = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    headers:{
        Accept: 'application/json'
    }
})

export const GetCities:Function = async () => {
    var res:AxiosResponse;
    try{
        res = await instance.get("/cities")
        if(res.status === 200 && res.data)
        {
            return {data:res.data.cities, status: 200}
        }
    }   
    catch(Err:any){
        return { data: Err, status: 400}
    }
}

export const GetSensors:Function = async () => {
    var res:AxiosResponse;
    try{
        res = await instance.get("/sensors")
        if(res.status === 200 && res.data)
        {
            return {data:res.data.sensors, status: 200}
        }
    }   
    catch(Err:any){
        return { data: Err, status: 400}
    }
}

export const GetReadings:Function = async (CityId:number, SensorId:number, date?:Date) => {
    var res:AxiosResponse;
    try{
        if(date){
            var readingsDate = moment(date).format('YYYY-MM-DDTHH:mm:00')
            res = await instance.get(`/readings-date/${CityId}/${readingsDate}Z`)
            if(res.status === 200 && res.data)
            {   
                var data:string;
                if (res.data.Temperature !== undefined) {
                    data = Number(res.data.Temperature).toFixed(2);
                }else if (res.data.Humidity !== undefined) {
                    data = Number(res.data.Humidity).toFixed(2);
                } else if (res.data.Pollution !== undefined) {
                    data = Number(res.data.Pollution).toFixed(2);
                }
                else {
                    data = "Brak danych"
                }
                return {data: data, status:200 }
            }
        }
        else{
            res = await instance.get(`/readings/${CityId}/${SensorId}`)
            if(res.status === 200 && res.data)
            {   
                // var data:string;
                if (res.data.Temperature !== undefined) {
                    data = Number(res.data.Temperature).toFixed(2);
                }else if (res.data.Humidity !== undefined) {
                    data = Number(res.data.Humidity).toFixed(2);
                } else if (res.data.Pollution !== undefined) {
                    data = Number(res.data.Pollution).toFixed(2);
                }
                else {
                    data = "Brak danych"
                }
                return {data: data, status:200 }
            }
        }
        
    }
    catch(Err:any)
    {
        return { data:Err, staus: 400 }
    }
}

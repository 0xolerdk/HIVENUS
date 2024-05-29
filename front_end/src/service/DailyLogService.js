import axios from 'axios';

class DailyLog {

    static BASE_URL = "http://localhost:8080"


    static async addLog(data, token){
        try{
            const response = await axios.post(`${DailyLog.BASE_URL}/dailylogs`, data,{
                headers: {Authorization: `Bearer ${token}`}
            })
            return response;

        }catch(err){
            throw err;
        }
    }



}

export default DailyLog;
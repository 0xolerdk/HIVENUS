import axios from 'axios';
import UserService from './logRegLogic';

class DailyLog {

    static BASE_URL = "http://localhost:8080"


    static async addLog(data, token){
        try{
            const id = localStorage.getItem("user_id");
            console.log(id);
            const response = await axios.post(`${DailyLog.BASE_URL}/dailylogs/${id}`, data,{
                headers: {Authorization: `Bearer ${token}`}
            })
            return response;

        }catch(err){
            throw err;
        }
    }



}

export default DailyLog;
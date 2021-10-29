import http from "./http-common";
import Axios from 'axios';
import {getToken} from "../Utils/tokenConfig";

class ComputersService {
    async getAll(date) {
        return await Axios.get("http://localhost:8000/api/computers", {
           params: {
               date: date,
           },
            /*headers: {
                Authorization: `Bearer ${getToken()}`
            }*/
       });
    }

    async create(data) {
        return await Axios.post('http://127.0.0.1:8000/api/computer/create',data,{
             headers: {
                 Authorization: `Bearer ${getToken()}`
             }
        });
    }

    delete(id) {
        return http.post(`/attribution/remove/${id}`,  {headers: {
                Authorization: `Bearer ${getToken()}`
            }});
    }
}
export default new ComputersService();

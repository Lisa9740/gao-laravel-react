import http from "./http-common";
import Axios from 'axios';
import {getToken} from "../Utils/tokenConfig";

class AttributionService {
    async getAll(date) {
        return await http.get("/attributions", {
            params: {
                date: date,
            },
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    async create(data){
        return await http.post("/attribution/create", data, {headers :  {
            Authorization: `Bearer ${getToken()}`
        }})
    }

    delete(id) {
        return http.post(`/attribution/remove/${id}`, { headers: {
                Authorization: `Bearer ${getToken()}`
            }});
    }
}
export default new AttributionService();

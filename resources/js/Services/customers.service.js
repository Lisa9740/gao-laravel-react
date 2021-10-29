import http from "./http-common";
import {getToken} from "../Utils/tokenConfig";

class CustomerService {
    async create(data){
        return await http.post("/customer/create", data, {headers: {
            Authorization: `Bearer ${getToken()}`
        }})
    }

    async search(customer) {
        return await http.get("/customer/search", {
            params: {
                customer: customer,
            },
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }
}
export default new CustomerService();

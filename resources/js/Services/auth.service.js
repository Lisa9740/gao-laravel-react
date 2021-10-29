import http from "./http-common";
import Axios from 'axios';

class AuthService {
    async login(data) {
        return await http.post('/login', data)
    }

}
export default new AuthService();

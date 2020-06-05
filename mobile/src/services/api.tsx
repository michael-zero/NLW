import axios from 'axios';
//exp://192.168.18.146:19000
const api = axios.create({
    baseURL: 'http://192.168.18.146:3333',
})

export default api;
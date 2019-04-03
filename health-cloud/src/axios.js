import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8057'
});

let token = localStorage.getItem('token');

if (token) {
    instance.defaults.headers.common['Authorization'] = token;
}




// instance.interceptors.request...

export default instance;
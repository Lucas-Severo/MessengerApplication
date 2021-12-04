import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.API_URL || 'http://192.168.0.106:1337'
});

export default instance;
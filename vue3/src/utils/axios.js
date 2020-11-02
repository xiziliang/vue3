import axios from 'axios';
const instens = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000,

})
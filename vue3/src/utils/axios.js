import axios from 'axios';
const axios = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000,
    
})
axios.interceptors.request.use((config)=>{
    return config
})

axios.interceptors.response.use((res)=>{
    return res.data
},err=>{
    return Promise.reject(err)
})

export default {
    post(opts){
        return axios({
            methods: 'post',
            ...opts
        })
    },
    get(opts){
        return axios({
            methods: 'get',
            ...opts
        })
    }
}
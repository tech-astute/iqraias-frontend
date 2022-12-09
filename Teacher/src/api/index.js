import axios from 'axios'

const API = axios.create({
    baseURL: 'https://iqra.onrender.com/api/ias'
});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer $(JSON.parse(localStorage.getItem('profile')).token)`;
    }
    return req;
} , (error) => {
    return Promise.reject(error);
} );

export const login = (authInfo) => API.post("/loginTeacher", authInfo);
export const register = (authInfo) => API.post("/registerTeacher", authInfo);
export const updatePassword = (authInfo) => API.post("/updatePassword", authInfo);


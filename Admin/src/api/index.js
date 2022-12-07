import axios from 'axios'

const API = axios.create({
    // baseURL: 'http://localhost:5000/api/'
    baseURL: 'https://iqra.onrender.com/api/'
});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer $(JSON.parse(localStorage.getItem('profile')).token)`;
    }
    return req;
} , (error) => {
    return Promise.reject(error);
} );

export const login = (authInfo) => API.post("/login", authInfo);
export const register = (authInfo) => API.post("/register", authInfo);
export const updatePassword = (authInfo) => API.post("/updatePassword", authInfo);

export const addNewCategory = (catInfo) => API.post("/master/add-categorys", catInfo);
export const getCategories = () => API.get("/master/categorys");

export const addNewMedium = (mediumInfo) => API.post("/master/add-mediums", mediumInfo);
export const getMediums = () => API.get("/master/mediums");

export const addNewLevel = (levelInfo) => API.post("/master/add-levels", levelInfo);
export const getLevels = () => API.get("/master/levels");

export const addNewSubjects = (subjectInfo) => API.post("/master/add-subjects", subjectInfo);
export const getSubjects = () => API.get("/master/subjects");
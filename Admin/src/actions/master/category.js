import { ADD_NEW_CATEGORY, GET_ALL_CATEGORIES } from "../../constants/actionTypes";
import * as api from '../../api/index'

export const addCategory = (catInfo) => async(dispatch) => {
    try{
        const {data} = await api.addNewCategory(catInfo);
        dispatch({type: ADD_NEW_CATEGORY, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const getCategories = () => async(dispatch) => {
    try{
        console.log("hello");
        const {data} = await api.getCategories();
        console.log(data);
        dispatch({type: GET_ALL_CATEGORIES, payload:data});
    }catch(error){
        console.log(error);
    }
}
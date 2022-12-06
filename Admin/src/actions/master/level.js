import { ADD_NEW_LEVEL, GET_ALL_LEVELS } from "../../constants/actionTypes";
import * as api from '../../api/index'

export const addLevel = (levelInfo) => async(dispatch) => {
    try{
        const {data} = await api.addNewLevel(levelInfo);
        dispatch({type: ADD_NEW_LEVEL, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const getLevels = () => async(dispatch) => {
    try{
        const {data} = await api.getLevels();
        dispatch({type: GET_ALL_LEVELS, payload:data});
    }catch(error){
        console.log(error);
    }
}

import { ADD_NEW_MEDIUM, GET_ALL_MEDIUMS } from "../../constants/actionTypes";
import * as api from '../../api/index'

export const addMedium = (mediumInfo) => async(dispatch) => {
    try{
        const {data} = await api.addNewMedium(mediumInfo);
        dispatch({type: ADD_NEW_MEDIUM, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const getMediums = () => async(dispatch) => {
    try{
        const {data} = await api.getMediums();
        dispatch({type: GET_ALL_MEDIUMS, payload:data});
    }catch(error){
        console.log(error);
    }
}

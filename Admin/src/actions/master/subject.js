import { ADD_NEW_SUBJECT, GET_ALL_SUBJECTS } from "../../constants/actionTypes";
import * as api from '../../api/index'

export const addSubject = (subjectInfo) => async(dispatch) => {
    try{
        const {data} = await api.addNewSubjects(subjectInfo);
        dispatch({type: ADD_NEW_SUBJECT, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const getSubjects = () => async(dispatch) => {
    try{
        const {data} = await api.getSubjects();
        dispatch({type: GET_ALL_SUBJECTS, payload:data});
    }catch(error){
        console.log(error);
    }
}

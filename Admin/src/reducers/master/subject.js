import * as types from '../../constants/actionTypes';

const subjectReducer = (state = { subjects: [] }, action) => {
    switch (action.type) {
        case types.GET_ALL_SUBJECTS:
            return { ...state, subjects: action.payload };
        case types.ADD_NEW_SUBJECT:
            return { ...state, subjects: [...state.subjects, action.payload] };
        default:
            return state;
    }
}

export default subjectReducer;
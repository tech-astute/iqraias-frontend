import * as actionType from '../../constants/actionTypes';

const levelReducer = (state = { levels: [] }, action) => {
    switch (action.type) {
        case actionType.GET_ALL_LEVELS:
            return { ...state, levels: action.payload };
        case actionType.ADD_NEW_LEVEL:
            return { ...state, levels: [...state.levels, action.payload] };
        default:
            return state;
    }
}   

export default levelReducer;
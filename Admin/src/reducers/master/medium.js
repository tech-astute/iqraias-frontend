import * as types from '../../constants/actionTypes';

const mediumReducer = (state = { mediums: [] }, action) => {
    switch (action.type) {
        case types.GET_ALL_MEDIUMS:
            return { ...state, mediums: action.payload };
        case types.ADD_NEW_MEDIUM:
            return { ...state, mediums: [...state.mediums, action.payload] };
        default:
            return state;
    }
}

export default mediumReducer;
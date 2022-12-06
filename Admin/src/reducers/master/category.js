import * as actionType from '../../constants/actionTypes';

const categoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case actionType.GET_ALL_CATEGORIES:
            return { ...state, categories: action.payload };
        case actionType.ADD_NEW_CATEGORY:
            return { ...state, categories: [...state.categories, action.payload] };
        default:
            return state;
    }
}   

export default categoryReducer;
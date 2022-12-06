import {combineReducers} from 'redux';


import category from './master/category';
import subject from './master/subject';
import level from './master/level';
import medium from './master/medium';



export const reducers = combineReducers({
    category,
    subject,
    level,
    medium
});
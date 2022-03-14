import { combineReducers } from 'redux';
import { player, token } from './login';

const rootReducer = combineReducers({ player, token });

export default rootReducer;

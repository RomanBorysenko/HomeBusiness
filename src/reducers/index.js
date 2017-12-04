import {combineReducers} from 'redux-immutablejs';
import { reducer as formReducer } from 'redux-form/immutable';
import signInReducer from './signInReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    auth: signInReducer,
    profileReducer,
    form: formReducer
});

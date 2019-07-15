import {
    combineReducers
} from 'redux'

import authReducer from './authReducer';
import user from '../components/Auth/reducer'
import auth from '../components/Layout/reducer'
import account from '../pages/account/reducer'

const rootReducer = combineReducers({
    authReducer,
    user,
    auth,
    account
})

export default rootReducer;
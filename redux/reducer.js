import {
    combineReducers
} from 'redux'

import authReducer from './authReducer';
import user from '../components/Auth/reducer'
import auth from '../components/Layout/reducer'
import notification from '../components/Notification/reducer'
import account from '../pages/account/reducer'

const rootReducer = combineReducers({
    authReducer,
    user,
    auth,
    notification,
    account
})

export default rootReducer;
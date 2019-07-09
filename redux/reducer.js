import {
    combineReducers
} from 'redux'

import auth from '../components/Auth/reducer'
import head from '../components/Layout/reducer'
import account from '../pages/account/reducer'

const rootReducer = combineReducers({
    head,
    auth,
    account
})

export default rootReducer;
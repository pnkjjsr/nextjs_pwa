import {
    combineReducers
} from 'redux'

import auth from '../components/Auth/reducer'
import head from '../components/Layout/reducer'

const rootReducer = combineReducers({
    head,
    auth
})

export default rootReducer;
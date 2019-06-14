import {
    combineReducers
} from 'redux'

import auth from '../components/Auth/reducer'

const rootReducer = combineReducers({
    auth
})

export default rootReducer;
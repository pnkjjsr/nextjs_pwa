import {
    COUNCILLOR
} from './constant'

const initialState = {
    councillor: ""
};

const ministers = (state = initialState, action) => {
    switch (action.type) {
        case COUNCILLOR:
            return Object.assign({}, state, {
                councillor: action.payload
            });
        default:
            return state;
    }
};

export default ministers;
import {
    COUNCILLOR,
    MLA,
    MP
} from './constant'

const initialState = {
    councillor: "",
    mla: "",
    mp: ""
};

const ministers = (state = initialState, action) => {
    switch (action.type) {
        case COUNCILLOR:
            return Object.assign({}, state, {
                councillor: action.payload
            });
        case MLA:
            return Object.assign({}, state, {
                mla: action.payload
            });
        case MP:
            return Object.assign({}, state, {
                mp: action.payload
            });
        default:
            return state;
    }
};

export default ministers;
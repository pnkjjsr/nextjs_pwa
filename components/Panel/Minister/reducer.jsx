import {
    COUNCILLOR,
    MLA
} from './constant'

const initialState = {
    councillor: "",
    mla: ""
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
        default:
            return state;
    }
};

export default ministers;
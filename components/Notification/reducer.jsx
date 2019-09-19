import {
    SHOW, HIDE
} from './constant'

const initialState = {
    open: false,
    message: "",
    type: "error"
};

const notification = (state = initialState, action) => {
    switch (action.type) {
        case SHOW:
            return Object.assign({}, state, {
                open: true,
                message: action.payload.message,
                type: action.payload.type
            });
        case HIDE:
            return Object.assign({}, state, {
                open: false,
                message: "",
                type: ""
            });
        default:
            return state;
    }
};

export default notification;
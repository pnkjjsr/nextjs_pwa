import {
    SHOW, HIDE
} from './constant'

const initialState = {
    open: false,
    message: ""
};

const notification = (state = initialState, action) => {
    switch (action.type) {
        case SHOW:
            return Object.assign({}, state, {
                open: true,
                message: action.payload.message
            });
        case HIDE:
            return Object.assign({}, state, {
                open: false,
                message: ""
            });
        default:
            return state;
    }
};

export default notification;
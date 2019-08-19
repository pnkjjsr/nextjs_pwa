import {
    GET_VERIFICATION,
    GET_REGISTRATION
} from "./constant"

const initialState = {
    view: 0
};

const home = (state = initialState, action) => {
    switch (action.type) {
        case GET_VERIFICATION:
            return Object.assign({}, state, {
                view: action.payload
            });
        case GET_REGISTRATION:
            return Object.assign({}, state, {
                view: action.payload
            });
        default:
            return state;
    }
};

export default home;
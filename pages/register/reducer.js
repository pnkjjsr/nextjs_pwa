import {
    CHECK_LOGIN,
    GET_AREA
} from "./constant"

const initialState = {
    view: 0,
    area: []
};

const register = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_LOGIN:
            return Object.assign({}, state, {
                view: 1
            });
        case GET_AREA:
            return Object.assign({}, state, {
                area: action.payload
            });
        default:
            return state;
    }
};

export default register;
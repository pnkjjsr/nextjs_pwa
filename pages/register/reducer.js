import {
    CHECK_LOGIN
} from "./constant"

const initialState = {
    view: 0
};

const register = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_LOGIN:
            return Object.assign({}, state, {
                view: 1
            });
        default:
            return state;
    }
};

export default register;
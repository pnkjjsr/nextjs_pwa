import {
    UPDATE,
    UPDATE_PATH
} from './constant'

const initialState = {
    title: "Name",
    desc: "Main page description.",
    path: ""
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE:
            return Object.assign({}, state, {
                home: action.payload
            });
        case UPDATE_PATH:
            return Object.assign({}, state, {
                path: action.payload
            });
        default:
            return state;
    }
};

export default auth;
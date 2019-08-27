import {
    UPDATE
} from './constant'

const initialState = {
    profile: ""
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE:
            return Object.assign({}, state, {
                profile: action.payload
            });
        default:
            return state;
    }
};

export default user;
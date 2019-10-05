import {
    VIEW,
    USER_IMAGE
} from './constant'

const initialState = {
    view: 0,
    imgUser: ""
};

const account = (state = initialState, action) => {
    switch (action.type) {
        case VIEW:
            return Object.assign({}, state, {
                view: action.payload
            });
        case USER_IMAGE:
            return Object.assign({}, state, {
                imgUser: action.payload
            });
        default:
            return state;
    }
};

export default account;
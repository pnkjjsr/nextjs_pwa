import {
    UPDATE_LOCATION
} from './constant'

const initialState = {
    v_location: ""
};

const account = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            return Object.assign({}, state, {
                v_location: action.payload
            });
        default:
            return state;
    }
};

export default account;
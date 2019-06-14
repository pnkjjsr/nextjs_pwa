import {
    ADD
} from './constant'

const initialState = {
    account: "Pankaj Jasoria"
};

const account = (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            return Object.assign({}, state, {
                account: "Jasoria Pankaj"
            });
        default:
            return state;
    }
};

export default account;
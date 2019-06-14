import {
    UPDATE
} from './constant'

const updateUser = (el) => {
    return {
        type: UPDATE,
        payload: el
    };
};

export default {
    updateUser
};
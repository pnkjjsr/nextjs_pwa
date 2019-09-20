import {
    UPDATE,
    UPDATE_PATH
} from './constant'

const update = () => {
    return {
        type: UPDATE
    };
};
const update_path = (e) => {
    return {
        type: UPDATE_PATH,
        payload: e
    };
}

export default {
    update,
    update_path
};
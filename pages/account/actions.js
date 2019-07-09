import {
    UPDATE_LOCATION
} from './constant'

const udpate_vLocation = (e) => {
    return {
        type: UPDATE_LOCATION,
        payload: e
    };
};

export default {
    udpate_vLocation
};
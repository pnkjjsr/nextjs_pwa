import {
    COUNCILLOR
} from './constant'

import {
    service
} from "utils"
import authSession from "components/utils/authSession"

const prefetchData = () => {
    return (dispatch) => {
        const session = new authSession();
        const profile = session.getProfile();
        let data = {
            pincode: profile.pincode
        }

        service.post('/councillor', data)
            .then(res => {
                dispatch(councillor(res.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const councillor = (e) => {
    return {
        type: COUNCILLOR,
        payload: e
    }
}


export default {
    prefetchData,
    councillor
};
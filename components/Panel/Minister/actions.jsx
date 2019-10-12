import {
    COUNCILLOR,
    MLA
} from './constant'

import {
    service
} from "utils"
import authSession from "components/utils/authSession"

const prefetchData = (e) => {
    return async (dispatch) => {
        const session = new authSession();
        const profile = session.getProfile();
        let data = {
            pincode: profile.pincode
        }

        service.post(`/${e}`, data)
            .then(res => {
                if (e == 'councillor') {
                    dispatch(councillor(res.data))
                }
                else if (e == 'mla') {
                    dispatch(mla(res.data))
                }
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
const mla = (e) => {
    return {
        type: MLA,
        payload: e
    }
}


export default {
    prefetchData,
    councillor
};
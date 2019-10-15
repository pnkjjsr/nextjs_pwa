import {
    COUNCILLOR,
    MLA,
    MP
} from './constant'

import { service } from "apiConnect"
import authSession from "utils/authSession"

const prefetchData = (e) => {
    return async (dispatch) => {
        const session = new authSession();
        const profile = session.getProfile();

        let data = {
            pincode: profile.pincode,
            district: profile.district
        }

        service.post(`/${e}`, data)
            .then(res => {
                if (e == 'councillor') {
                    dispatch(councillor(res.data))
                }
                else if (e == 'mla') {
                    dispatch(mla(res.data))
                }
                else if (e == 'mp') {
                    dispatch(mp(res.data))
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
const mp = (e) => {
    return {
        type: MP,
        payload: e
    }
}


export default {
    prefetchData,
    councillor
};
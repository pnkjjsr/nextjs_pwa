import {
    VIEW,
    USER_IMAGE
} from './constant'

import {
    service
}
from "apiConnect"
import authSession from "utils/authSession"

const prefetchData = () => {
    return (dispatch) => {
        let e;
        const session = new authSession();
        const token = session.getToken();
        let data = {
            uid: token
        }

        service.post("/getLocation", data)
            .then((res) => {
                e = res.data;
                if (!e.pincode) {
                    dispatch(location())
                } else if (!e.phoneNumber) {
                    dispatch(mobile())
                } else if (e.pincode && e.phoneNumber) {
                    dispatch(account())
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

const location = () => {
    return {
        type: VIEW,
        payload: 1
    }
}
const mobile = () => {
    return {
        type: VIEW,
        payload: 2
    }
}
const account = () => {
    return {
        type: VIEW,
        payload: 3
    }
}
const getUserImage = (e) => {
    return {
        type: USER_IMAGE,
        payload: e
    }
}

export default {
    prefetchData,
    location,
    mobile,
    account
};
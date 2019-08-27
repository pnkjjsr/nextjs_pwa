import {
    VIEW
} from './constant'

import {
    service
} from "../../utils/service"
import authSession from "../../components/utils/authSession"

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
                } else if (!e.pincode && e.phoneNumber) {
                    let data = {
                        location: 0,
                        mobile: 1
                    };
                    dispatch(mobile())
                } else if (e.pincode && e.phoneNumber) {
                    let data = {
                        location: 1,
                        mobile: 1
                    };
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

export default {
    prefetchData,
    location,
    mobile,
    account
};
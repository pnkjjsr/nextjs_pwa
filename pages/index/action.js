import authSession from "../../components/utils/authSession"

import {
    GET_VERIFICATION,
    GET_REGISTRATION
} from "./constant"

let registration = 0;
let verification = 1;

const get_verification = function () {
    const session = new authSession();
    const token = session.getToken();

    if (token) {
        return {
            type: GET_VERIFICATION,
            payload: verification
        };
    } else {
        return {
            type: GET_REGISTRATION,
            payload: registration
        };
    }
};

const get_registration = function () {
    return {
        type: GET_REGISTRATION,
        payload: registration
    };
};

export default {
    get_verification,
    get_registration
};
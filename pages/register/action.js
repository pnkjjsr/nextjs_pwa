import {
    CHECK_LOGIN
} from "./constant"

import authSession from "../../components/utils/authSession"

const check_login = function () {
    const session = new authSession;
    const token = session.getToken();
    return function (dispatch) {
        if (token) {
            dispatch({
                type: CHECK_LOGIN
            })
        }
    }


}

export default {
    check_login
};
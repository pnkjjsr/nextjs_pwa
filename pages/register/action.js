import {
    CHECK_LOGIN,
    GET_AREA
} from "./constant"

import authSession from "utils/authSession"
import dataGov from "utils/dataGov"
import stringModifier from "utils/stringModifier";

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

const get_area = function (pincode) {
    return async function (dispatch) {
        const string = new stringModifier;
        const data = new dataGov
        const location = await data.getLocation(pincode)
        const updatedArea = await string.removeWord(location, 'S.O')
        if (!updatedArea) {
            console.log("no area for this pincode");
        } else {
            dispatch({
                type: GET_AREA,
                payload: updatedArea
            })
        }
    }
}

export default {
    check_login,
    get_area
};
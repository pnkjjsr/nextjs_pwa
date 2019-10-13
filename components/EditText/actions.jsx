import { service } from "utils"
import authSession from "utils/authSession"

const prefetch = () => {
    const session = new authSession;
    let token = session.getToken();
    console.log(token);

    return (dispatch) => {
        service.post('/user', { uid: token })
            .then(res => {
                return res
            })
            .catch(err => {
                console.log(err);

            });
    }
}

export default {
    prefetch
}
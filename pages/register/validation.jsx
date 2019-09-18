import { isEmail, isEmpty, isBoolean } from 'functions/utils/validation';

function validation(data) {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Email must not be empty';
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address';
    }

    if (isEmpty(data.fullName)) errors.fullName = 'Full name must not be empty';

    if (isEmpty(data.password)) errors.password = 'Password must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };

}

export default validation
import { isEmail, isEmpty, isBoolean } from 'functions/utils/validation';

function validation(data) {
    let errors = {};

    if (isEmpty(data.address)) errors.address = 'Address must not be empty';
    if (isEmpty(data.state)) errors.state = 'State must not be empty';
    if (isEmpty(data.pincode)) errors.pincode = 'Pincode must not be empty';
    if (isEmpty(data.country)) errors.country = 'Country must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };

}

export default validation
const {
  isEmpty,
  isBoolean
} = require('../../utils/validation');

exports.validateCouncillorData = (data) => {
  let errors = {};

  if (isEmpty(data.pincode)) errors.pincode = 'Pincode is not define.';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
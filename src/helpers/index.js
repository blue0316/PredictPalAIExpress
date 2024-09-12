/**
 * Sends a success response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to send back the appropriate response.
 * @param {object|array} data - The data to be sent in the response.
 * @param {number} [code=200] - The HTTP status code for the response (default is 200).
 *
 * @returns {object} - The response object with success data.
 */
const successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  });

/**
 * Sends an error response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to send back the appropriate response.
 * @param {string} [errorMessage='Something went wrong'] - The error message to be sent in the response.
 * @param {number} [code=500] - The HTTP status code for the response (default is 500).
 * @param {object} [error={}] - Additional error details.
 *
 * @returns {object} - The response object with error data.
 */
const errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.status(code).send({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

/**
 * Validates an email address.
 *
 * @param {string} email - The email address to validate.
 *
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates required fields in an object.
 *
 * @param {object} object - The object to validate.
 * @param {array} fields - The list of required fields.
 *
 * @returns {string} - Returns an error message if any field is missing, otherwise an empty string.
 */
const validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(", ")} are required fields.` : "";
};

/**
 * Generates a unique ID of specified length.
 *
 * @param {number} [length=13] - The desired length of the unique ID (default is 13).
 *
 * @returns {string} - Returns a unique ID string.
 */
const uniqueId = (length = 13) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Calculates pagination parameters.
 *
 * @param {string|number} page - The current page number. Can be a string or a number.
 * @param {string|number} size - The number of items per page. Can be a string or a number.
 *
 * @returns {Object} - Returns an object containing the limit and offset for pagination.
 */
const getPagination = (page, size) => {
  // Ensure page and size are treated as numbers
  const pageNumber = parseInt(page, 10);
  const sizeNumber = parseInt(size, 10);

  // Set default values if parsing fails or inputs are invalid
  const limit = isNaN(sizeNumber) ? 10 : sizeNumber;
  const offset = isNaN(pageNumber) ? 0 : limit * Math.max(pageNumber - 1, 0);

  return { limit, offset };
};

module.exports = {
  successResponse,
  errorResponse,
  validateEmail,
  validateFields,
  uniqueId,
  getPagination,
};
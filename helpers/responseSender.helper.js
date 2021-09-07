module.exports = {
  //generic response templates for success, error and validation error case to keep consistent response object
  sendErrorResponse: (res, err, code) => {
    if (!code) {
      code = 400;
    }
    if (!err) {
      err = "Some unexpected error occur";
    }

    return res.status(code).send({
      status: false,
      message: err,
      errors: [err],
    });
  },
  sendValidationError: (res, errors) => {
    return res.status(422).send({
      status: false,
      message: "Validation Failed",
      errors: Array.isArray(errors) ? errors : ["Validation Failed"],
    });
  },
  sendSuccessResponse: (res, data, msg, code) => {
    if (!code) {
      code = 200;
    }
    if (!msg) {
      msg = "API executed successfully";
    }
    return res.status(code).send({
      status: true,
      message: msg,
      data: data ?? null,
    });
  },
};

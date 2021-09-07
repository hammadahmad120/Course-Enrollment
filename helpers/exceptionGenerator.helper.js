module.exports = function (msg, code) {
  //generic exception format generator for overall API
  if (!code) {
    code = 400;
  }
  if (!msg) {
    msg = "Some unexpected error occur";
  }
  return {
    code: code,
    message: msg,
  };
};

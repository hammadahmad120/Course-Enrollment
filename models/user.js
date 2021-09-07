const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    validate: {
      validator: async function (val) {
        const user = await User.find({ username: val });
        const rslt = user.length ? false : true;
        return rslt;
      },
      message: "User with username already exist",
    },
  },
  password: { type: String, required: true, minlength: 2, maxlength: 200 },
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: {
    type: String,
    required: true,
    validate: [
      {
        validator: function (val) {
          let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(val);
        },
        message: "Invalid Email Provided",
      },
      {
        validator: async function (val) {
          const user = await User.find({ email: val });
          const rslt = user.length ? false : true;
          return rslt;
        },
        message: "User with provided email already exists",
      },
    ],
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

//single generic method to generate token with payload to keep it consistent in overall API
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { userId: this._id, role: this.role?.roleName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

const User = new mongoose.model("User", userSchema);

exports.User = User;

const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    roleName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 150,
      validate: {
        validator: async function (val) {
          const role = await Role.find({ roleName: val });
          const rslt = role.length ? false : true;
          return rslt;
        },
        message: "Role provided already exist",
      },
    },
    isActive: { type: Boolean, default: true },
  })
);

exports.Role = Role;

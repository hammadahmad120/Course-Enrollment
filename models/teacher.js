const mongoose = require("mongoose");
const Joi = require("joi");

const Teacher = new mongoose.model(
  "Teacher",
  new mongoose.Schema({
    presentDegree: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 150,
    },
    bio: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 300,
    },
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  })
);

exports.Teacher = Teacher;

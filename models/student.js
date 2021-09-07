const mongoose = require("mongoose");
const Joi = require("joi");
const constants = require("../constants");

const courseTeacherSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
});

const studentSchema = new mongoose.Schema({
  degree: {
    type: String,
    enum: {
      values: constants.STUDENT_DEGREES,
      message: "{VALUE} is not supported for degree",
    },
    required: true,
  },
  session: {
    type: String,
    enum: {
      values: constants.STUDENT_SESSIONS,
      message: "{VALUE} is not supported for session",
    },
    required: true,
  },
  userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coursesEnroll: [{ type: courseTeacherSchema }],
});

const Student = new mongoose.model("Student", studentSchema);

//while creating student keep enroll courses as empty array
studentSchema.pre("save", function (next) {
  if (!this.coursesEnroll) {
    this.coursesEnroll = [];
  }
  next();
});

exports.Student = Student;

const mongoose = require("mongoose");
const Joi = require("joi");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    validate: {
      validator: async function (val) {
        const course = await Course.find({ name: val });
        const rslt = course.length ? false : true;
        return rslt;
      },
      message: "Course with name already exist",
    },
  },
  tags: { type: Array, default: [] },
  creditHours: { type: Number, required: true, min: 2, max: 4 },
  isPublished: { type: Boolean, default: true },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
});
const Course = mongoose.model("Course", courseSchema);

//while creating course if teachers not provided then save empty array for it
courseSchema.pre("save", function (next) {
  if (!this.teachers) {
    this.teachers = [];
  }
  next();
});

exports.Course = Course;

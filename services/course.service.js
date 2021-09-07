const { Course } = require("../models/course");
const exceptionGenerator = require("../helpers/exceptionGenerator.helper");
const { Teacher } = require("../models/teacher");

module.exports = {
  createNewCourse: async (courseObj) => {
    const course = new Course(courseObj);

    const savedCourse = await course.save();
    if (!savedCourse) throw exceptionGenerator("Course not created");
    return savedCourse;
  },
  updateCourseTeachers: async (cId, obj) => {
    const course = await Course.findById(cId);
    if (!course) throw exceptionGenerator("Course not found with given id");

    obj.teachers.forEach((tid) => {
      if (course.teachers.includes(tid))
        throw exceptionGenerator(
          `Teacher with id ${tid} already in this course`
        );
    });

    const teachers = await Teacher.find({ _id: { $in: obj.teachers } });
    if (teachers.length !== obj.teachers.length)
      throw exceptionGenerator(`Some invalid teacher id provided`);

    course.teachers = course.teachers.concat(obj.teachers);

    const savedCourse = await course.save({ validateBeforeSave: false });

    return savedCourse;
  },
  getCourseInfo: async (cId) => {
    const course = await Course.findById(cId)
      .populate("teachers")
      .populate({
        path: "teachers",
        populate: {
          path: "userInfo",
          select: "email name",
        },
      });
    if (!course) throw exceptionGenerator("Course not found with given id");

    return course;
  },
};

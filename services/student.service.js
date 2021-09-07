const { Student } = require("../models/student");
const { Course } = require("../models/course");
const _ = require("lodash");
const exceptionGenerator = require("../helpers/exceptionGenerator.helper");

module.exports = {
  createNewStudent: async (studentObj) => {
    const student = new Student(studentObj);

    const savedStudent = await student.save();
    return savedStudent;
  },
  enRollCourse: async (userId, enrollObj) => {
    const course = await Course.findById(enrollObj.courseId);
    if (!course) throw exceptionGenerator("Invalid course id provided");
    if (!course.teachers.includes(enrollObj.teacherId))
      throw exceptionGenerator("Teacher with given id not exist in course");

    const student = await Student.findOne({ userInfo: userId });

    if (!student) throw exceptionGenerator("Invalid student id provided");
    student.coursesEnroll.forEach((ec) => {
      if (
        ec.courseId.toString() === enrollObj.courseId &&
        ec.teacherId.toString() === enrollObj.teacherId
      )
        throw exceptionGenerator("You already enrolled in this course");
    });

    student.coursesEnroll.push(enrollObj);

    const uptStudent = await student.save();
    return uptStudent;
  },
};

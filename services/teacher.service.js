const { Teacher } = require("../models/teacher");
const exceptionGenerator = require("../helpers/exceptionGenerator.helper");

module.exports = {
  createNewTeacher: async (teacherObj) => {
    const teacher = new Teacher(teacherObj);

    const savedTeacher = await teacher.save();
    return savedTeacher;
  },
};

const _ = require("lodash");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const { Teacher } = require("../models/teacher");
const exceptionGenerator = require("../helpers/exceptionGenerator.helper");
const bcrypt = require("bcrypt");
const teacherService = require("./teacher.service");
const studentService = require("./student.service");

module.exports = {
  createNewUser: async (userObj, role) => {
    const user = new User(userObj.userInfo);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await user.save();
    if (!newUser) throw exceptionGenerator("User not created", 500);
    let roleInfo = {};
    if (role?.roleName === "teacher") {
      roleInfo = await teacherService.createNewTeacher({
        ...userObj.roleInfo,
        userInfo: newUser._id,
      });
    } else if (role?.roleName === "student") {
      roleInfo = await studentService.createNewStudent({
        ...userObj.roleInfo,
        userInfo: newUser._id,
      });
    }

    return { userInfo: newUser, roleInfo: roleInfo };
  },
  getCurrentUser: async (userId) => {
    const user = await User.findById(userId)
      .populate("role", "-_id -isActive")
      .select("-password");
    if (!user) throw exceptionGenerator("User not found", 404);
    return user;
  },
  loginUser: async (username, password) => {
    const user = await User.findOne({ username: username }).populate(
      "role",
      "roleName"
    );

    if (!user) throw exceptionGenerator("Invalid username or password");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw exceptionGenerator("Invalid username or password");

    const responseUser = _.pick(user, [
      "password",
      "username",
      "name",
      "email",
      "_id",
    ]);
    responseUser.token = user.generateAuthToken();
    return responseUser;
  },
  testingTransaction: async (userId, val) => {
    const user = await User.findById(userId);
    const teacher = await Teacher.findOne({ userInfo: userId });
    if (!user) throw exceptionGenerator(`User not found for ${userId}`, 404);
    if (!teacher)
      throw exceptionGenerator("Teacher info not exist for user", 404);
    user.name = val;
    teacher.presentDegree = teacher.presentDegree + " (" + val + ")";

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const savedUser = await user.save({
        validateModifiedOnly: true,
        session,
      });
      const savedTeacher = await teacher.save({ session });

      await session.commitTransaction();
      session.endSession();
      return savedUser;
    } catch (error) {
      // If an error occurred, abort the whole transaction and
      // undo any changes that might have happened
      await session.abortTransaction();
      session.endSession();
      throw error;
    }

    /* It finds and update object and return updated value*/

    // const savedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { $set: { name: val } },
    //   { new: true }
    // );

    /* Alternative: update object and save it and validate only modified value*/
    // user.username = val;
    // const savedUser = await user.save({ validateModifiedOnly: true });

    //return savedUser;
  },
};

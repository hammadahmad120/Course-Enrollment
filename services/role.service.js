const { Role } = require("../models/role");
const exceptionGenerator = require("../helpers/exceptionGenerator.helper");

module.exports = {
  getAllRolesData: async () => {
    const roles = await Role.find({ isActive: true }).select("_id roleName");
    return roles;
  },
  getRoleById: async (id) => {
    const role = await Role.findById(id);
    return role;
  },
  createNewRole: async (roleObj) => {
    const role = new Role(roleObj);

    const savedRole = await role.save();
    if (!savedRole) throw exceptionGenerator("Role not created", 500);
    return savedRole;
  },
  toggleRoleStatus: async (id, status) => {
    const savedRole = await Role.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isActive: status,
        },
      },
      { new: true }
    );

    if (!savedRole) throw exceptionGenerator("Invalid role id provided");
    return savedRole;
  },
};

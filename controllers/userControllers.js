const user = require("../schemas/user");

const createUser = async (credentials) => {
  await user.create(credentials);
};

module.exports = createUser;

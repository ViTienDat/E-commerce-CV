const jwt = require("jsonwebtoken");

const createAccessToken = (uid, role, isblock) => {
  return jwt.sign({ _id: uid, role, isblock }, process.env.JWT_KEY, { expiresIn: "1d" });
};

module.exports = {
  createAccessToken,
};

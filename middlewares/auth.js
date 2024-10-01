const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

exports.protect = async (req, res, next) => {

  const token =  req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({
      attributes: [
        "id",
        "firstname",
        "lastname",
        "email",
      ],
      where: {
        id: decoded.id,
      },
    });

    req.user = user.dataValues;

    next();
  } catch (err) {
    res.redirect('/');
  }
};
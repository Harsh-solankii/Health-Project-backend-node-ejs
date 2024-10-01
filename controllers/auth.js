const { Op } = require("sequelize");
const { User , user_session} = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.signup = async (req, res, next) => {
  const user = await User.create(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();


  res.redirect('/');
};

exports.logout = async(req,res) =>{
try {
    const result = await user_session.destroy({
        where: { cookie_token: req.cookies.token },
      });
    
    res.clearCookie(req.cookies.token).status(200).redirect("/");    
} catch (error) {
    console.log(error);
}

}

exports.logoutfromalldevices = async(req,res) =>{

  const result = await user_session.destroy({ where: { userId: req.cookies.userid } });

    res.clearCookie("token").status(200).redirect("/");
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next({
      message: "The email is not yet registered",
      statusCode: 400,
    });
  }


  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (!passwordMatch) {
      return next({ message: "The password does not match", statusCode: 400 });
    }
    
  const payload = { id: user.id,email:user.email };
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: '1h',
  });

  const sessiondetails = await user_session.create({ userId: user.id,
    cookie_token: token})

  res.cookie("token", token, {maxAge:2 * 24 * 60 * 60 * 1000});

  res.redirect('/home');
};

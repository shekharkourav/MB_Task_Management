const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('auth/login',{req});
};

exports.getRegister = (req, res) => {
  res.render('auth/register',{req});
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.redirect('/auth/login');
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.redirect('/auth/login?error=UserAlreadyExists');
  }
  // if (!match) return res.redirect('/auth/login');
  req.session.userId = user._id;
  res.redirect('/tasks');
};

exports.postRegister = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.redirect('/auth/register?error=UserAlreadyExists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  req.session.userId = user._id;
  res.redirect('/tasks');
};


exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};

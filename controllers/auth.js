const User = require("../models");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../configs");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

// 1. Recevies email, password from body
// 2. Checks in DB if users is existing via email
// 3. If user exists, throws 400
// 4. Otherwise, hashs password via bcrypt and creates gravatar
// 5. Creates new user with request body, hashed password and gravatar
// 6. Returns 201, email and subscription of new user
const createNewUser = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const generatedAvatar = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: generatedAvatar,
  });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

// 1. Recevies email, password from body
// 2. Finds user in DB via email
// 3. If user doesnt exist, throws 401
// 4. Compares password in DB with request password via bcrypt
// 5. If different password, throws 401
// 6. Otherwise, writes down user ID to payload
// 7. Creates token via jwt
// 8. Updates users token in DB
// 9. Returns with token, user's email and subcription status
const signInUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

// 1. Receives user's id from authorisation
// 2. Deletes users token from DB
const logOutUser = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json("");
};

// 1. Recevies user from authorisation middleware
// 2. Returns email and subcription
const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

// 1. Recevies id from authorisation middleware
// 2. Updates user's subcription in DB with request
// 3. Returns 200 and message
const subcriptionUser = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {
    subscription: req.body.subscription,
  });
  res.status(200).json("Subcription updated");
};

// 1. Recevies user from authorisation middleware
// 2. Recevies file from request
// 3. Resizing image via jimp
// 4. Changes file name and direction to public
// 5. Writes down path to final image
// 6. Updates user in DB with new avatar
// 7. Returns 200 and url to avatar
const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  await Jimp.read(tempUpload).then((image) => {
    image.resize(250, 250);
    image.write(tempUpload);
  });
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL: avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = {
  createNewUser: ctrlWrapper(createNewUser),
  signInUser: ctrlWrapper(signInUser),
  logOutUser: ctrlWrapper(logOutUser),
  currentUser: ctrlWrapper(currentUser),
  subcriptionUser: ctrlWrapper(subcriptionUser),
  updateAvatar: ctrlWrapper(updateAvatar),
};

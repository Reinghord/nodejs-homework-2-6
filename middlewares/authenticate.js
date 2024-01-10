const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = require("../configs");

// 1. Checks request headers, if no authorization, makes it empty string
// 2. Splits Bearer Token
// 3. If no "bearer", throws 401
// 4. Checks token via jwt
// 5. Finds user in DB
// 6. If no user or no token or req token !== user token, throws 401
// 7. Otherwise, writes down user to request
// 8. Passes to next middleware
const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Unauthorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Unauthorized"));
  }
};

module.exports = authenticate;

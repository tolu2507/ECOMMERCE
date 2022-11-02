import jwt from "jsonwebtoken";
import config from "./config.js";
const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
  }, config.JWT_SECRET, { expiresIn: "48h" });
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const trueToken = token.slice(7, token.length);
    jwt.verify(trueToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid Token" });
      }
      req.user = decode;
      next();
      return
    });
  } else {
    return res.status(401).send({ msg: "token not supplied" });
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  }
  return res.status(401).send({ msg: "Admin token is not valid" });
}

export { getToken, isAuth, isAdmin };

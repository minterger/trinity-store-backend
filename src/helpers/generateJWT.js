import jwt from "jsonwebtoken";

const generateJWT = (user) => {
  const { id, admin, username, email, uuid } = user;

  return jwt.sign({ id, admin, username, email, uuid }, process.env.SECRET, {
    expiresIn: "2d",
  });
};

export default generateJWT;

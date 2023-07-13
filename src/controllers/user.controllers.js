import User from "../models/User.js";
import generateJWT from "../helpers/generateJWT.js";

const validateEmail = (email) => {
  return String(email).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const createUser = async (req, res) => {
  let { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Rellene todos los datos" });
  }

  // Eliminar espacios en blanco alrededor de los campos
  username = username.trim();
  email = email.trim().toLowerCase();
  password = password.trim();
  confirmPassword = confirmPassword.trim();

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Ingrese un email válido" });
  }

  try {
    const existEmail = await User.findOne({ email });
    const existUsername = await User.findOne({
      username: { $regex: new RegExp(username, "i") },
    });
    if (existEmail || existUsername) {
      return res.status(400).json({
        message: "El correo electrónico o el nombre de usuario ya existe",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Las contraseñas no coinciden",
      });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    const user = await newUser.save();

    const token = generateJWT(user);
    return res
      .status(200)
      .json({ message: "Usuario creado exitosamente", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error, message: "Ha ocurrido un error en el servidor" });
  }
};

export const loginUser = async (req, res) => {
  const user = req.body;

  if (!user.email || !user.password)
    return res.status(400).json({ message: "Rellene todos los campos" });

  const email = user.email.toLowerCase();

  try {
    const findUser = await User.findOne({ email });

    if (!findUser)
      return res.json({ message: "Email o Contraseña incorrecta" });

    const checkPassword = await findUser.checkPassword(user.password);

    if (!checkPassword)
      return res.json({ message: "Email o Contraseña incorrecta" });

    const token = generateJWT(findUser);

    res.json({ message: "logeado correactamente", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: "Ha ocurrido un error en el servidor" });
  }
};

export const getUser = async (req, res) => {
  return res.json(req.user);
};

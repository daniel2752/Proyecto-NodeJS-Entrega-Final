import bcrypt from "bcryptjs";
import { create, findByEmail } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body || {};

  if (
    typeof email != "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return res.status(400).send("Se requiere ingresar email y password");
  }

  const existingUser = await findByEmail(email);
  if (existingUser) {
    return res.status(400).send("Este email ya se encuentra registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await create({ email, password: hashedPassword });

  res.status(201).send({ id: user.id, email: user.email });
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).send("email o password inválidos");
  }

  const user = await findByEmail(email);

  if (!user || typeof password !== "string" || !password) {
    return res.status(400).send("email o password inválidos");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send("email o password inválidos");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h",});

  res.send({ token});
};

import { StatusCodes } from "http-status-codes";
import User from "../model/user";
import { signInSchema, signUpSchema } from "../schemas/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const { error } = signUpSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const messages = error.details.map((err) => err.message);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messages });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ messages: "Email da ton tai" });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
    console.log(role);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      role,
    });

    res.status(StatusCodes.CREATED).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// Đăng nhập
export const signin = async (req, res) => {
  const { email, password } = req.body;

  const { error } = signInSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const { errors } = error.details.map((err) => err.message);

    return res.status(400).json({
      status: 400,
      message: errors,
    });
  }

  const user = await User.findOne({ email });

  try {
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Email khong ton tai",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        message: "Mat khau khong dung",
      });
    }

    const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      user,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

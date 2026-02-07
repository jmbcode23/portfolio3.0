import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateAccessToken = (userId: string, email: string) => {
  return jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: "7d" });
};

const generateRefreshToken = (userId: string, email: string) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};

const emailToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "15min" });
};

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// const emailToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET!,
//       { expiresIn: "15m" }
//     );

export { generateAccessToken, generateRefreshToken, emailToken };

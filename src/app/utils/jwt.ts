import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secrect: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secrect, { expiresIn } as SignOptions);
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const verifiedToken = jwt.verify(token, secret);
  return verifiedToken;
};

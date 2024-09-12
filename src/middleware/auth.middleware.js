import jwt from "jsonwebtoken";
import { errorResponse } from "../helpers";

const jwtSecret = process.env.JWT_SECRET || "p2jwtsecret";
const refreshSecret = process.env.REFRESH_SECRET || "p2refreshsecret";
const TOKEN_EXPIRATION_DAYS = 1;

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  const refreshToken = req.header("x-refresh-token");
  if (!token) {
    return errorResponse(req, res, "Access denied. No token provided.", 401);
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    if (ex.name === "TokenExpiredError" && refreshToken) {
      try {
        const decodedRefreshToken = jwt.verify(refreshToken, refreshSecret);
        const newToken = jwt.sign(
          {
            id: decodedRefreshToken.id,
            User_Name: decodedRefreshToken.User_Name,
          },
          jwtSecret,
          { expiresIn: `${TOKEN_EXPIRATION_DAYS}h` }
        );

        res.header("Authorization", `Bearer ${newToken}`);
        req.user = decodedRefreshToken;
        next();
      } catch (refreshError) {
        return errorResponse(
          req,
          res,
          "Invalid refresh token",
          401,
          refreshError
        );
      }
    } else {
      return errorResponse(req, res, "Invalid token", 400, ex);
    }
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return errorResponse(req, res, "Access denied.", 403);
  }
  next();
};

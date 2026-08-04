import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {

  console.log("Auth middleware reached");
  console.log("Cookies received:", req.cookies);

  const token = req.cookies["extension-cookie"];

  if (!token) {
    console.log("No cookie found");
    return res.status(401).json({ message: "please login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log("Decoded token:", decoded);

    req.id = decoded.id;

    next();

  } catch(err) {
    console.log("JWT error:", err.message);
    return res.status(401).json({ message:"invalid token" });
  }
}

export default authMiddleware;

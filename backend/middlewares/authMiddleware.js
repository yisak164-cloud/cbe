import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.cookies["extension-cookie"];
  if (!token) {
    return res.status(401).json({ message: "please login first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).send("invalid token");
  }
}

export default authMiddleware;

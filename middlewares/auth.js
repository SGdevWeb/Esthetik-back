const jwt = require("jsonwebtoken");
const adminService = require("../services/adminService");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const admin = await adminService.getAdministratorByUsername(
      decodedToken.sub.username
    );
    if (!admin || !admin.is_admin) {
      return res.status(403).json({ message: "Accès refusé" });
    }
    req.auth = {
      admin: true,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

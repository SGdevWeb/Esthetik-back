const adminService = require("../services/adminService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthDTO = require("../dtos/AuthDTO");
const { AuthenricationError } = require("../services/errorService");

const signIn = async (req, res) => {
  const { username, password } = req.body;
  const authDTO = new AuthDTO(username, password);
  try {
    const admin = await adminService.getAdministratorByUsername(
      authDTO.username
    );

    if (!admin) {
      return res
        .status(401)
        .json({ message: "Paire username/mot de passe incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Paire username/mot de passe incorrect" });
    }

    const payload = {
      sub: {
        AdminId: admin.id,
        username: admin.username,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

    res.status(200).json({ adminId: admin.id, token: token });
  } catch (error) {
    console.error(error);

    if (error instanceof AuthenricationError) {
      return res.status(401).json({ message: error.message });
    }

    res.status(500).json({ error: "Erreur lors de l'authentification" });
  }
};

module.exports = {
  signIn,
};

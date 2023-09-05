// const jwt = require("jsonwebtoken");
// const { pool } = require("../config/db");
// require("dotenv").config();

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // Modifier pour utiliser la clé secrète stockée dans l'environnement
//     const userId = decodedToken.userId;

//     pool
//       .execute("SELECT * FROM users WHERE id = ?", [userId])
//       .then(([rows]) => {
//         if (rows.length === 0) {
//           return res.status(401).json({ error: error.message });
//         }
//         req.auth = { userId: userId };
//         next();
//       })
//       .catch((error) => {
//         res.status(401).json({ error: error.message });
//       });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// };
// ***********************************************
// const jwt = require("jsonwebtoken");
// const { pool } = require("../config/db");
// require("dotenv").config();

// module.exports = (req, res, next) => {
//   // Si c'est une requête OPTIONS, renvoyez simplement une réponse OK
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
//     const userId = decodedToken.userId;

//     pool.execute(
//       "SELECT * FROM users WHERE id = ?",
//       [userId],
//       (error, [rows]) => {
//         if (error) {
//           return res.status(401).json({ error: error.message });
//         }

//         if (rows.length === 0) {
//           return res.status(401).json({ error: "Utilisateur non trouvé" });
//         }

//         req.auth = { userId: userId };
//         next();
//       }
//     );
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// };
// *******************************
const jwt = require("jsonwebtoken");
const sequelize = require("../config/db");
require("dotenv").config();

module.exports = async (req, res, next) => {
  // Si c'est une requête OPTIONS, renvoyez simplement une réponse OK
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Token d'authentification manquant" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Utilisation de Sequelize pour rechercher l'utilisateur
    const user = await sequelize.models.User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    req.auth = { userId: user.id };
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

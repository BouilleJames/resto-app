const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisePool } = require("../config/db"); // Importer le promisePool

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        email: req.body.email,
        password: hash,
      };

      return promisePool.execute(
        "INSERT INTO users (login, password) VALUES (?, ?)",
        [user.email, user.password]
      );
    })
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  promisePool
    .execute("SELECT * FROM users WHERE login = ?", [email])
    .then(([rows]) => {
      if (rows.length === 0) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      const user = rows[0];
      return bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          const token = jwt.sign(
            { userId: user.id },
            process.env.RANDOM_TOKEN_SECRET,
            { expiresIn: "8h" }
          );

          // Ajouter le console.log pour vérifier l'enregistrement du token
          console.log("Token enregistré dans le localStorage:", token);

          res.status(200).json({
            userId: user.id,
            token: token,
          });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.logout = (req, res, next) => {
  res.status(200).json({ message: "Utilisateur déconnecté !" });
};

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { promisePool } = require("../config/db"); // Importer le promisePool

// exports.signup = (req, res, next) => {
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => {
//       const user = {
//         email: req.body.email,
//         password: hash,
//       };

//       return promisePool.execute(
//         "INSERT INTO users (login, password) VALUES (?, ?)",
//         [user.email, user.password]
//       );
//     })
//     .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//     .catch((error) => res.status(400).json({ error: error.message }));
// };

// exports.login = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   promisePool
//     .execute("SELECT * FROM users WHERE login = ?", [email])
//     .then(([rows]) => {
//       if (rows.length === 0) {
//         return res
//           .status(401)
//           .json({ message: "Paire login/mot de passe incorrecte" });
//       }
//       const user = rows[0];
//       return bcrypt
//         .compare(password, user.password)
//         .then((valid) => {
//           if (!valid) {
//             return res
//               .status(401)
//               .json({ message: "Paire login/mot de passe incorrecte" });
//           }
//           res.status(200).json({
//             userId: user.id,
//             token: jwt.sign(
//               { userId: user.id },
//               process.env.RANDOM_TOKEN_SECRET, // Modifier pour utiliser la clé secrète stockée dans l'environnement
//               { expiresIn: "8h" }
//             ),
//           });
//         })
//         .catch((error) => res.status(400).json({ error: error.message }));
//     })
//     .catch((error) => res.status(500).json({ error: error.message }));
// };

// exports.logout = (req, res, next) => {
//   res.status(200).json({ message: "Utilisateur déconnecté !" });
// };

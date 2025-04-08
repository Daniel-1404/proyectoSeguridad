
// Función para validar la sesión
const sessionValidation = (req, res) => {
  if (req.session && req.session.user) {   
    return res.json({ loggedIn: true, user: req.session.user });
  } else {
    return res.json({ loggedIn: false });
  }
};

module.exports = {
    sessionValidation
};

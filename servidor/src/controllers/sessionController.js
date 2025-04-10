
// Función para validar la sesión
const sessionValidation = (req, res) => {
  if (req.session && req.session.user) {   
    return res.json({ loggedIn: true, user: req.session.user });
  } else {
    return res.json({ loggedIn: false });
  }
};

const closeSession = (req, res) => {
  res.clearCookie('access_token').json({message: 'Sesión cerrada'}); 
};  

module.exports = {
    sessionValidation,closeSession
};

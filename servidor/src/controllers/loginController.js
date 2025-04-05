const UserRepository = require('../repository/userRepository');



const loginAutentication = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserRepository.login({username, password});
        res.status(200).json(user); 
    } catch (err) {
        res.status(401).json({ error: 'Hubo un error al iniciar sesion' });
    }
};

module.exports = {
    loginAutentication
};



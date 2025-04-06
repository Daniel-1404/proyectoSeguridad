const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/index.html'); 
    }

    next();
};

module.exports = requireAuth;
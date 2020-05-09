function isAuthenticated(req, res, next) {
    if (req.session.uuid) {
        next();
    } else {
        res.status(401).json({
            code: 401,
            success: false,
            error : {
                type : 'NOT_AUTHORIZED',
                message : "You are not authorised to access this resource."
            }
        });
    }
}

module.exports = isAuthenticated;
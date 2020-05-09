const {Router} = require('express');
const {check, validationResult, Result} = require('express-validator');
const {Container} = require('typedi');
const {AuthService} = require('../../services/authService.js');
const isAuthenticated = require('../middleware/isAuthenticated.js');


const router = Router();

const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errors);
    } else next();
};

router.post('/signup',
    [
        check('firstName').isLength({min: 2}),
        check('lastName').isLength({min: 2}),
        check('email').isEmail(),
        check('password').isLength({min: 8})
    ],
    checkValidation,
    async (req, res, next) => {
        const authService = Container.get(AuthService);
        try {
            await authService.signUp(req.body);
        } catch (e) {
            return next(e);
        }

        res.json({
            code: 200,
            success: true,
            result: req.body
        });
    }
);

router.post('/signin', async (req, res, next) => {
    const authService = Container.get(AuthService);
    try {
        const uuid = await authService.signIn(req.body.email, req.body.password);
        req.session.uuid = uuid;
    } catch (e) {
        return next(e);
    }

    res.json({
        code: 200,
        success: true,
        result: req.body
    });
})


router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.json({
        code : 200,
        success : true,
        result : null
    });
});

//error handlers

router.use((err, req, res, next) => {
    if (err instanceof Result) {
        res.status(400).json({
            code: 400,
            success: false,
            error: {
                type: 'INVALID_DATA',
                message: 'Provided data is invalid.'
            }

        });
    } else next(err);
});

router.use((err, req, res, next) => {
    if (err.code === AuthService.USER_EXISTS) {
        res.status(409).json({
            code: 409,
            success: false,
            error: {
                type: 'EMAIL_TAKEN',
                message: 'A user with a provided email already exists.'
            }
        });
    } else {
        res.status(500).json({
            code: 500,
            success: false,
            error: {
                type: 'SERVER_ERROR',
                message: 'Internal server error.'
            }
        });
    }
});


module.exports = router;
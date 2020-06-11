const {Router} = require('express');
const {AuthService,
        EmailTakenError,
        DatabaseError} = require('../services/auth.js');
const {Container} = require('typedi');

const router = Router();


router.post('/register', async (req, res, next) => {
    const authService = Container.get(AuthService);
    const {firstName, lastName, email, password} = req.body;
    const user = {
        firstName,
        lastName,
        email,
        password
    }
    try{
        await authService.signUp(user);
        res.redirect('/login');
    }
    catch(err) {
        next(err)
    }
});

router.use((err, req, res, next) => {
   if(err instanceof EmailTakenError) {
       res.status(409);
       const errorParam = 'emailtaken'
       res.redirect(`/register?error=${errorParam}`);
   }
   else next();
});

router.use((err, req, res, next) => {
    res.status(500);
    const errorParam = 'error';
    res.redirect(`/register?error=${errorParam}`);
    console.error(err)
});

module.exports = router;
const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
   res.render('index.ejs');
});

router.get('/login', (req, res) => {
   res.render('login.ejs');
});

router.get('/register', (req, res) => {
   res.render('register.ejs', {
      error : req.query.error
   });
});


module.exports = router;
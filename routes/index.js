const router = require('express').Router();
const {signup,login,logout,logoutfromalldevices} = require('../controllers/auth');
const {protect} = require('../middlewares/auth');
 

router.get("/signup",(req,res)=>{
    res.render('signup');
});
router.get('/',(req,res)=>{
    res.render('login');
})

router.get('/home',protect,(req,res)=>{
    res.render('home');
})
router.get('/logout',protect,logout);

router.get('/logoutfromall',protect,logoutfromalldevices);

router.post("/signup",signup);
router.post("/login",login);


module.exports = router;

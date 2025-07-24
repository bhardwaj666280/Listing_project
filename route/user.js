const express = require('express');
const router = express.Router();
const wrapAsyncs = require('../utiles/wrapAsyncs.js')

const Usermodel = require('../modals/user.js');
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware.js');
const constroller= require('../controllers/user.js')



router.get('/signUp', constroller.signUpRender)

router.post('/signUp', wrapAsyncs(constroller.signUp))

router.get('/login', constroller.loginRender)

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), wrapAsyncs(async (req, res) => {
  req.flash('success', 'welcome back wonderlust page ')
 
  res.redirect('/listings')


}))


router.get('/logout',(req,res,next)=>{

  req.logout((error)=>{
    if(error){
      return next();
    }
    req.flash('success','you are logOut Wonderlust ');
    res.redirect('/listings')
  })
})



module.exports = router;


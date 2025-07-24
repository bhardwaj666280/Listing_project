const express= require('express');
const router= express.Router();
var cookieParser = require('cookie-parser');


router.use(cookieParser('secretcode'))

router.get('/cookies',(req,res)=>{
  
    res.cookie('county','india',{signed:true})
    let {name='Tarun'}= req.cookies;
    res.send(`name is ${name}`)

})
router.get('/check',(req,res)=>{
    console.log(req.signedCookies);
    res.send('signed cookies')
})


router.get('/user',(req,res)=>{
    console.log(req.cookies);
    res.send("user")
})

router.get('/user/:id',(req,res)=>{
    res.send("user id ")
})

router.post('/user/:id',(req,res)=>{
    res.send("user post")
})

router.delete('/user',(req,res)=>{
    res.send("user delete")
})

module.exports= router;
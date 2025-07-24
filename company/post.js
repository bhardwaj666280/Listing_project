const express= require('express');
const router= express.Router();

router.get('/post',(req,res)=>{
    res.send("post")

})

router.get('/post/:id',(req,res)=>{
    res.send("post id ")

})

router.post('/post/:id',(req,res)=>{
    res.send(" post")

})

router.delete('/post',(req,res)=>{
    res.send("post delete")

})

module.exports= router;
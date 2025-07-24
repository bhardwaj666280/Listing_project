const express= require('express');
const app= express();
const user =require('./user.js')
const post =require('./post.js')

const router = require('./user.js');





let port=3000;

app.listen(port,()=>{
    console.log('server is running')
});

app.use('/',user);
app.use('/',post);



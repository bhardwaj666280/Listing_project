const mongooose= require('mongoose');
let {initdata}=require('./data.js');

const Listingmodel= require('../modals/listing.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{'Connected to DataBase'})
.catch((err)=>console.log(err))

 async function main(){
    await mongooose.connect(MONGO_URL);
 }

 const initdb=   async()=>{
     await Listingmodel.deleteMany({ });
 
    initdata= initdata.map((obj)=>({...obj,Owner:'687dc267b43b0e996c22af6e'}))
       await Listingmodel.insertMany(initdata)
    console.log(initdata)
 }
initdb()


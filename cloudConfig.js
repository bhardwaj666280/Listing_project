const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET
})


const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Wonderlust',
  allowedFormats: ['jpg', 'png','jpeg'], 
});

module.exports={cloudinary,storage};
const express = require('express');
const router = express.Router();
const wrapAsyncs = require('../utiles/wrapAsyncs.js')
const { IsLogged,isOwner } = require('../middleware.js')
const controllers=require('../controllers/listings.js')
const {storage}= require("../cloudConfig.js")
const multer  = require('multer')

const upload = multer({storage})

// listings
router.get('/', controllers.allListing)

// Add data 
router.get('/add', IsLogged,controllers.newListing )

// Add data 
router.post('/', IsLogged,upload.single('image[url]'), wrapAsyncs(controllers.newListingRender))



// More details
router.get('/:id', wrapAsyncs(controllers.moreDetail))

// Edit details
router.get('/:id/edit', IsLogged,isOwner, wrapAsyncs(controllers.editRender))

// Edit details
router.put('/:id', IsLogged, isOwner,upload.single('image[url]'), wrapAsyncs(controllers.editRenderPost))

// Delete details
router.delete('/:id', IsLogged,isOwner, wrapAsyncs(controllers.destroy));

module.exports = router;
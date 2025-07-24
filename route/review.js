const express= require('express');
const router= express.Router();
const Listingmodel = require('../modals/listing.js')
const wrapAsyncs = require('../utiles/wrapAsyncs.js')
const Reviewmodel = require('../modals/review.js')
const {IsLogged, isAuthor}= require('../middleware.js')

const controllers=require('../controllers/review.js')



// Review add data
router.post("/listings/:id/review",IsLogged, wrapAsyncs(async(req, res) => {
    let { id } = req.params;
    req.flash('success', 'New Riview Added');
    let listing_Detail = await Listingmodel.findById(req.params.id);
    let newReview = new Reviewmodel(req.body.review);  
        newReview.author= req.user;        
    await listing_Detail.review.push(newReview);
    await newReview.save();
    await listing_Detail.save();   
    res.redirect(`/listings/${id}`);
})
)
// Riview delete
router.delete("/listings/:id/review/:reviewId", IsLogged,isAuthor, controllers.reviewDestroy )

module.exports= router;
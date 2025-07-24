const Listingmodel = require('./modals/listing')
const Reviewmodel = require('./modals/review.js')
const { reviewschema } = require('./schema.js')
const { listingschema } = require('./schema.js')
const ExpressError = require('./utiles/expressError.js')


module.exports.IsLogged = (req, res, next) => {
   console.log(req.originalUrl);
   if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;

      req.flash('success', 'Please login Wonderlust Account !')
      return res.redirect('/login')
   }
   next();
}


module.exports.saveRedirectUrl = (req, res, next) => {
   if (req.session.redirect) {
      res.locals.redirectUrl = req.session.redirect
   }
   next();
}


module.exports.isOwner = async (req, res, next) => {
   const { id } = req.params;
   let newListing = await Listingmodel.findById(id);
   if (!newListing.Owner._id.equals(res.locals.currUser._id)) {
      req.flash('success', 'You are not the Owner of the Listing ');
      return res.redirect(`/listings/${id}`);
   }
   next();
}

module.exports.isAuthor = async (req, res, next) => {
   const { id ,reviewId} = req.params;
   let review = await Reviewmodel.findById(reviewId);
   if (!review.author.equals(res.locals.currUser._id)) {
      req.flash('success', 'You are not the Author  of the Listing ');
      return res.redirect(`/listings/${id}`);
   }
   next();
}


const validateError = (req, res, next) => {
   const error = listingschema.validate(req.body);
   console.log(error)
   if (error) {
      let errorDetails = error.details
      throw new ExpressError(300, errorDetails);
   }
   else {
      next();
   }
}

const reviewValidate = (req, res, next) => {
   const { error } = reviewschema.validate(req.body);
   console.log(error)
   if (error) {
      throw new ExpressError(300, errorDetails);
   } else {
      next();
   }
}
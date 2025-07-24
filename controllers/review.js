const Listingmodel=require('../modals/review')
const Reviewmodel= require('../modals/review')





module.exports.reviewDestroy= async (req, res) => {
    const { id, reviewId } = req.params;
       req.flash('success', 'Review Deleted');
    await Listingmodel.findByIdAndUpdate(id, { $pull: { review: reviewId } })
    await Reviewmodel.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)


}
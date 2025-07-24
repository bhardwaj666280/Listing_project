const Listingmodel = require('../modals/listing.js')

module.exports.allListing = async (req, res) => {
    const data = await Listingmodel.find();
    res.render('listing.ejs', { data });
}

module.exports.newListing = (req, res) => {
    res.render('add.ejs')
}

module.exports.newListingRender = async (req, res, next) => {
    console.log(req.file)
    let fileName = req.file.display_name;
    let filePath = req.file.secure_url;    
    let data = new Listingmodel(req.body);
    data.Owner = req.user._id
    data.image.filename = fileName;
    data.image.url = filePath;
    req.flash('success', 'New Listing Created');
    await Listingmodel.insertOne(data);
    res.redirect('/');
}

module.exports.moreDetail = async (req, res) => {
    const { id } = req.params;

    const data = await Listingmodel.findById(id).populate({ path: 'review', populate: { path: 'author' } }).populate('Owner');
    if (!data) {
        req.flash('failer', 'Listing does not exit');
        res.redirect('/')
    }

    res.render('moreDetails.ejs', { data });
}

module.exports.editRender = async (req, res) => {
    const { id } = req.params;
    const data = await Listingmodel.findById(id);
    res.render('edit.ejs', { data });
}

module.exports.editRenderPost = async (req, res) => {
    const { id } = req.params;
    req.flash('success', 'Update Exitsing Listing');
    let update_lising = await Listingmodel.findByIdAndUpdate(id, { ...req.body });
    if (req.file) {
        let filename = req.file.display_name;
        let url = req.file.secure_url;
        update_lising.image = { filename, url }
        await update_lising.save();
    }

    res.redirect(`/${id}`);
}

module.exports.destroy = async (req, res) => {
    const { id } = req.params;
    await Listingmodel.findByIdAndDelete(id);
    req.flash('success', 'Deleted Listing');
    res.redirect('/');

}
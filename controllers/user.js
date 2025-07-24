const Usermodel= require('../modals/user')


module.exports.signUpRender=(req, res) => {
  res.render('signUpForm/signUp.ejs');
}

module.exports.signUp=async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new Usermodel({ username, email })
    let userDetail = await Usermodel.register(newUser, password)   
    req.login(userDetail,(err)=>{
      if(err){
        next(err);
      }
    req.flash('success', 'New User Created');
    res.redirect('/listings')
    }) }
     catch (error) {
    req.flash('success', error.message)
    res.redirect('/signUp')
  }
}

module.exports.loginRender=(req, res) => {
  res.render('signUpForm/login.ejs');
}


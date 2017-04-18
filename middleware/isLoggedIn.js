module.exports = function(req, res, next) {
  if(!req.user) {
    req.flash('error', 'You must be logged in to access that page')
    res.redirect('/login')
    return
  } else {
    next()
  }
}

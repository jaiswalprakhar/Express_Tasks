exports.getContactus = (req, res, next) => {
    console.log('Contact Us Page rendered');
    res.render('contactus', {
      pageTitle: 'Contact Us',
      path: '/contactus',
      formsCSS: true,
      mainCSS: true,
      activeContactus: true
    });
  };

exports.postContactus = (req, res, next) => {
    console.log('Contact Details Added');
    console.log(req.body);
    res.redirect('/success');
};

exports.success = (req, res, next) => {
    console.log('Form filled successfully');
    res.render('success', {
        pageTitle: 'Success',
        path: '/success',
        mainCSS: true
      });
}
exports.get404 = (req, res, next) => {
  console.log('Page Not Found');
  res.status(404).render('404', { 
    pageTitle: 'Page Not Found',
    path: '',
    mainCSS: true
  });
};
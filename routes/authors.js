const express = require('express');
const author = require('../models/author');
const router = express.Router();
const Author = require('../models/author');

// All authors Route
router.get('/', async (req, res) => {
  //  Search request parameters
  let searchOptions = {}
  // using query as request is using get ethod
  
  if( req.query.name != null && req.query.name !== '' ){
    
    // 'i' is case sencitive
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find( searchOptions );
    res.render('authors/index', { 
      authors: authors,
      searchOptions: req.query
    });

  } catch {
    res.redirect('/');
  }
});

// Get New Author route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// Create New Author
router.post('/', async (req, res) => {
  // create a new Author
  const author = new Author({
    name: req.body.authorName
  });
  try {
    // Save new Author 
    const newAuthor = await author.save();
    //res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`)
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })
  }

  // send the name from the Form
  // form post method from views/authors/new.ejs
  // res.send( req.body.authorName );
});

module.exports = router;
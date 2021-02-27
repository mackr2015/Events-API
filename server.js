// If we are in local load env
if( process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));


// MongoDB
const mongoose = require('mongoose');
// Connection to DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// check the DB connection
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


// use default route for routes/index.js
app.use('/', indexRouter);
// use Author route for routes/authors.js
// everything is pre-pended with authors
app.use('/authors', authorRouter);


//liste on port
app.listen(process.env.PORT || 4000);
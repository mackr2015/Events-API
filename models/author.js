const mongoose = require('mongoose');
// create a schema
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// 'Author' is a table inside of MongoDB, pass the Schema
module.exports = mongoose.model('Author', authorSchema);
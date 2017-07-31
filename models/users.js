let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
});

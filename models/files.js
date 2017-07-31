let mongoose = require('mongoose');

let filedirSchema = mongoose.Schema({
  dir:{
    type: String,
    required: true
  },
  file:{
      type: String,
      required: true,
  },
  createdAt:{
      type: String,
      required: false
  }
  extension:{
      type: String,
      required: true
  }
});

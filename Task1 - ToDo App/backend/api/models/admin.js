const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Task1', {useNewUrlParser: true});
var conn =mongoose.Collection;
 
var adminSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  _UserID:{
    type: mongoose.Types.ObjectId,
    required:true
  },
  completed: {
    type: Boolean
    // default: false
  }
});
 
var adminModel = mongoose.model('Admins', adminSchema);
module.exports=adminModel;
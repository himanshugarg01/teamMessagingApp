const mongoose = require('./db');

let channels = new mongoose.Schema({
    name: {
      type: String
  },
  description: {
      type: String
  },
  users : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'users'
  }],
  tags : [{
    type : String,
  }],
  createdBy :{
    type : String
  },
  invites : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users'
}]
  // messages :{
  //   type : Array
  // }, 
   
},{
  timestamps: true,
});

module.exports = mongoose.model('channels', channels);
const mongoose = require('./db');

let messages = new mongoose.Schema({
    channel : mongoose.Schema.Types.ObjectId,
    userName : String,
    message : String,
},{
  timestamps: true,
});

messages.index({channel : 1});

module.exports = mongoose.model('messages', messages);
const mongoose = require('./db');

let messages = new mongoose.Schema({
    channel : mongoose.Schema.Types.ObjectId,
    userName : String,
    message : String,
},{
  timestamps: true,
});

messages.index({channel : 1});





//1 db.messages.aggregate([{$group : {_id : "$channel",sum : {$sum : 1}}},{$sort : {sum : -1}}])
// 2 db.channels.aggregate([{$unwind : '$tags'},{$group : {_id : "$tags",sum : {$sum : 1}}},{$sort : {sum : -1}}])

//3 db.users.aggregate([{$group : {_id : "$region",sum : {$sum : 1}}},{$sort : {sum : -1}}])

//4  db.messages.aggregate([{$group : {_id : "$userName",sum : {$sum : 1}}},{$sort : {sum : -1}}])





//3 db.users.aggregate([{$match : {"createdAt" : {$gt : new ISODate("2019-10-20"),$lt : new ISODate("2019-10-24")}}},{$group : {_id : "$region",sum : {$sum : 1}}},{$sort : {sum : -1}}])

//1 db.messages.aggregate([{$match : {"createdAt" : {$gt : new ISODate("2019-10-20"),$lt : new ISODate("2019-10-24")}}},{$group : {_id : "$channel",sum : {$sum : 1}}},{$sort : {sum : -1}}])
// 2 db.channels.aggregate([{$match : {"createdAt" : {$gt : new ISODate("2019-10-20"),$lt : new ISODate("2019-10-24")}}},{$unwind : '$tags'},{$group : {_id : "$tags",sum : {$sum : 1}}},{$sort : {sum : -1}}])



//4  db.messages.aggregate([{$match : {"createdAt" : {$gt : new ISODate("2019-10-20"),$lt : new ISODate("2019-10-24")}}},{$group : {_id : "$userName",sum : {$sum : 1}}},{$sort : {sum : -1}}])


module.exports = mongoose.model('messages', messages);
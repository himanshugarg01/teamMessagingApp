const mongoose = require('./db');

let users = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId : {
        type : String,
    },
    region : {
        type : String,
    },
    userName: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    channels : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'channels'
    }],
    requests : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'channels'
    }],

},
{
    timestamps : true
}
);

users.index({userName : 1});
users.index({userName : 1,password : 1});


module.exports = mongoose.model('users', users);
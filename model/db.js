const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/teamapp')
mongoose.connection.on('error', (err) => {
    throw err;
})

module.exports = mongoose;
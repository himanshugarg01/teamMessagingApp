let router = require('express').Router();
let LoginRoute = require('./LoginRoute');
let SignupRoute = require('./SignupRoute');
let Default = require('./Default');
let ChannelRoute = require('./ChannelRoute');
let DiscussionRoute = require('./DiscussionRoute');
let middleFunc = require('../statics/functions').middleFunc;


router.use('/login' ,LoginRoute);
router.use('/signup',SignupRoute);
router.use('/channel',middleFunc ,ChannelRoute);
router.use('/discussion',middleFunc ,DiscussionRoute);
router.use('/',Default);

module.exports = router;

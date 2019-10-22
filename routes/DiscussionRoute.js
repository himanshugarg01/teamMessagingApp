let router = require('express').Router();
let services = require('../services/index');
var flash = require('connect-flash');
router.use(flash());

router.post('/getChannel', (req, res) => {
    services.DiscussionService.getChannel(req, res);
})

router.post('/sendMessage', (req, res) => {
    services.DiscussionService.sendMessage(req, res);
})
router.post('/getMessages', (req, res) => {
    services.DiscussionService.getMessages(req, res);
})

module.exports = router;
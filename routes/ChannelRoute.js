let router = require('express').Router();
let services = require('../services/index');
var flash = require('connect-flash');
router.use(flash());

router.get('/getChannel', (req, res) => {
    services.ChannelService.getChannel(req, res);
})
router.get('/currentUser', (req, res) => {
    services.ChannelService.currentUser(req, res);
})


router.post('/add', (req, res) => {
    services.ChannelService.addChannel(req, res);
})
router.post('/search', (req, res) => {
    services.ChannelService.searchChannel(req, res);
})

router.post('/getUsers', (req, res) => {
    services.ChannelService.getUsers(req, res);
})
router.post('/searchUser', (req, res) => {
    services.ChannelService.searchUser(req, res);
})

router.post('/addUser', (req, res) => {
    services.ChannelService.addUser(req, res);
})
router.post('/joinChannel', (req, res) => {
    services.ChannelService.joinChannel(req, res);
})
router.post('/rejectRequest', (req, res) => {
    services.ChannelService.rejectRequest(req, res);
})


module.exports = router;
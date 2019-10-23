let router = require('express').Router();
let services = require('../services/index');
var flash = require('connect-flash');
router.use(flash());


router.post('/', (req, res) => {
    services.SignupService.SignupServices(req, res);
})
router.post('/checkName', (req, res) => {
    services.SignupService.checkName(req, res);
})

module.exports = router;
let router = require('express').Router();
let services = require('../services/index');
var flash = require('connect-flash');
router.use(flash());

router.post('/', (req, res) => {
    services.DashboardService.dashboard(req, res);
})

module.exports = router;
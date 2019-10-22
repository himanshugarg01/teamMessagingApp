let router = require('express').Router();
let services = require('../services/index');




router.get('/', (req, res) => {
    res.render.sendFile('index.html');
})



module.exports = router;
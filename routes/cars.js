var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/rout', function(req, res, next) {
  res.json('My cars');
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('GET respond with a resource BURAK');
});

router.post('/', function(req, res) {
  res.send('POST respond with a resource BURAK');
});

router.put('/:regId', function(req, res) {
  res.send('PUT respond with a resource BURAK');
});

router.delete('/', function(req, res) {
  res.send('DELETE respond with a resource BURAK');
});

module.exports = router;

const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
const config = require('../config/app.json');

router.get('/', function(req, res){
	fs.readFile(config.log_path, (err, data) => {
		if (err) {
			res.send(err);
		}
		logger.debug(data);
		res.send(data.toString());
	});
});

module.exports = router;
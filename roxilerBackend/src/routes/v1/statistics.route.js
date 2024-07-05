const express = require('express');
const router = express.Router();
const statistics = require('../../modules/statistics/controller/index')

router.get('/statistics', statistics.getStatisticsController);


module.exports = router;

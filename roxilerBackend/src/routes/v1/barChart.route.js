const express = require('express');
const router = express.Router();
const barChartData = require('../../modules/barChart/controller/index')

router.get('/barChartData', barChartData.getBarChartDataController);


module.exports = router;

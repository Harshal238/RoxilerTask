const express = require('express');
const router = express.Router();
const pieChartData = require('../../modules/pieChart/controller/index')

router.get('/getUniqueCategory', pieChartData.uniqueCategoryController);


module.exports = router;

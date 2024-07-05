const express = require('express');
const seedDatabaseController = require('../../modules/transaction/controller/index')
const router = express.Router();

router.get('/seed-database', seedDatabaseController.seedDatabase);

router.get('/getAllTransaction', seedDatabaseController.getAllTransactionController);

router.get('/getCombinedData', seedDatabaseController.getAllApiDataController);


module.exports = router;

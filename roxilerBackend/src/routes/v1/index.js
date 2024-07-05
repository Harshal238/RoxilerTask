const express = require('express');
const seedDatabase  = require('./seedDatabase.route');
const statistics = require('./statistics.route')
const barchart = require('./barChart.route')
const pieChart = require('./pieChart.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/seeddatabase',
    route: seedDatabase,
  },
  {
    path: '/statistics',
    route: statistics,
  },
  {
    path: '/barchart',
    route: barchart,
  },
  {
    path: '/piechart',
    route: pieChart,
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

const getStatisticsService = require('../../statistics/services/statistics.service');
const getBarChartDataService = require('../../barChart/services/getBarChartData.service');
const uniqueCategoryService = require('../../pieChart/services/uniqueCategory.service');

const getAllApiDataService = async (month) => {
    try {
        console.log(month);
        const statisticsData = await getStatisticsService(month);
        const barChartData = await getBarChartDataService(month);
        const pieChartData = await uniqueCategoryService(month);

        const combinedData = {
            statistics: statisticsData,
            barChart: barChartData,
            pieChart: pieChartData
        };
        if(!combinedData){
            return {
                data: "data not found",
                code: 400,
                status: false
            }; 
        }
        return {
            data: combinedData,
            code: 200,
            status: true
        };
    } catch (error) {
        return {
            data: 'Something went wrong',
            code: 500,
            error
        };
    }
};

module.exports = getAllApiDataService;

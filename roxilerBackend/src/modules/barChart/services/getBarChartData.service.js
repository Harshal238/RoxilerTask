const Transaction = require('../../transaction/transaction.modal');

const getMonthFromDate = (date) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthIndex = monthNames.findIndex(name => name.toLowerCase() === date.toLowerCase());
    if (monthIndex === -1) {
        throw new Error('Invalid month name');
    }
    return monthIndex + 1; 
};

const getBarChartDataService = async (month) => {
    try {
        const monthNumber = getMonthFromDate(month);
        console.log(monthNumber);
        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const priceRangeCounts = await Promise.all(priceRanges.map(async ({ range, min, max }) => {
            const query = {
                $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
                price: { $gte: min }
            };
            if (max !== Infinity) {
                query.price.$lt = max;
            }

            const count = await Transaction.countDocuments(query);
            return { range, count };
        }));

        console.log("Price range counts:", priceRangeCounts);

        return {
            data: priceRangeCounts,
            code: 200,
            status: true
        };
    } catch (error) {
        return { code: 500, data: 'something went wrong', error };
    }
};

module.exports = getBarChartDataService;

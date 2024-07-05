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

const getStatisticsService = async (month) => {
    try {
        const monthNumber = getMonthFromDate(month);

        console.log("Month Number:", monthNumber);

        const totalSaleAmount = await Transaction.aggregate([
            {
                $project: {
                    month: { $month: "$dateOfSale" },
                    price: 1,
                    sold: 1
                }
            },
            {
                $match: {
                    month: monthNumber,
                    sold: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$price' }
                }
            }
        ]);

        const totalSoldItems = await Transaction.aggregate([
            {
                $project: {
                    month: { $month: "$dateOfSale" },
                    sold: 1
                }
            },
            {
                $match: {
                    month: monthNumber,
                    sold: true
                }
            },
            {
                $count: "totalSoldItems"
            }
        ]);

        const totalNotSoldItems = await Transaction.aggregate([
            {
                $project: {
                    month: { $month: "$dateOfSale" },
                    sold: 1
                }
            },
            {
                $match: {
                    month: monthNumber,
                    sold: false
                }
            },
            {
                $count: "totalNotSoldItems"
            }
        ]);

        return {
            data: {
                totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
                totalSoldItems: totalSoldItems.length > 0 ? totalSoldItems[0].totalSoldItems : 0,
                totalNotSoldItems: totalNotSoldItems.length > 0 ? totalNotSoldItems[0].totalNotSoldItems : 0
            },
            code: 200,
            status: true
        };
    } catch (error) {
        return { code: 500, data: 'something went wrong', error };
    }
};

module.exports = getStatisticsService;

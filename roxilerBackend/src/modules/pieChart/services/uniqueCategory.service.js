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

const uniqueCategoryService = async (month) => {
    try {
        const monthNumber = getMonthFromDate(month);
        console.log(monthNumber);
        const results = await Transaction.aggregate([
            {
                $project: {
                    category: 1,
                    dateOfSale: 1
                }
            },
            {
                $addFields: {
                    saleMonth: { $month: "$dateOfSale" }
                }
            },
            {
                $match: {
                    saleMonth: monthNumber
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    category: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        if(results){

            return{
                data: results,
                code: 200,
                status: true
            };
        }else{
            return {data: 'result not fetched', code: 400, status: false}
        }

    } catch (error) {
        return{
            data: 'something went wrong',
            code: 500,
            error
        };
    }
};

module.exports = uniqueCategoryService ;

const Transaction = require('../../transaction/transaction.modal');
const httpStatus = require("http-status");

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

const getAllTransactionService = async (pageNum, limitNum, searchCriteria, month) => {
    try {
        const length = limitNum && parseInt(limitNum, 10) > 0 ? parseInt(limitNum, 10) : 500;
        const start = pageNum && parseInt(pageNum, 10) > 0 ? parseInt(pageNum, 10) : 1;
        const skip = (start - 1) * length;
        const monthNumber = month ? getMonthFromDate(month) : null;

        let filterQuery = {
            $or: [
                { title: { $regex: `.*${searchCriteria}.*`, $options: "i" } },
                { description: { $regex: `.*${searchCriteria}.*`, $options: "i" } }
            ]
        };

        if (monthNumber) {
            filterQuery.$expr = { $eq: [{ $month: '$dateOfSale' }, monthNumber] };
        }
        let aggregateQuery = [{ $match: filterQuery }];

        const transactions = await Transaction.aggregate(aggregateQuery).skip(skip).limit(length);
        console.log(transactions?.length);

        if (transactions.length > 0) {
            const totalCount = await Transaction.countDocuments(filterQuery);
            const totalPages = Math.ceil(totalCount / length);

            return {
                code: 200,
                data: {
                    transactions,
                    total: totalCount,
                    page: start,
                    limit: length,
                    totalPages
                },
                status: true
            };
        } else {
            return { code: 400, status: false, data: 'No data found' };
        }
    } catch (error) {
        return {
            code: 500,
            message: error.message || 'Something went wrong',
            data: 'Something went wrong'
        };
    }
};

module.exports = getAllTransactionService;

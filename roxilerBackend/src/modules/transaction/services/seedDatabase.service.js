const axios = require('axios');
const Transaction = require('../transaction.modal');
const httpStatus = require("http-status");
const sendResponse = require('../../../utils/responseHanlder') 

const seedDatabaseService = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    await Transaction.deleteMany({});

    for (const transaction of transactions) {
      const newTransaction = new Transaction(transaction);
      await newTransaction.save();
    }

    if(transactions){
        return { data: transactions, status: true, code: 200 };
    }else{
        return { data: "Error while fetching", status: false, code: 400 };
    }
   
  } catch (error) {
    return { status: false, code: 500, data: error.message };
  }
};

module.exports = seedDatabaseService;

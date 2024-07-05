import React, { useEffect, useState } from "react";
import { apiGET } from "../../utils/apiHandler";
import Statistics from "./Statistics";
import BarChart  from "./BarChartComp";

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("March");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [limit, setLimit] = useState(3);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setCurrentPage(1); 
    };

    const handleInputChange =(event)=>{
        setSearch(event.target.value)
    }

    const getMonthTransaction = async (month, page) => {
        try {

            const response = await apiGET(`/v1/seeddatabase/getAllTransaction?month=${month}&page=${page}&limit=${limit}&search=${search}`);
            console.log(response);
            if (response.status === 200) {
                setTransactions(response.data.data.transactions);
                setPageCount(response.data.data.totalPages);
            } else {
                console.error("Failed to fetch transactions");
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        getMonthTransaction(selectedMonth, currentPage);
    }, [selectedMonth, currentPage, search]);

    const handlePageChange = (action) => {
        if (action === "prev") {
            setCurrentPage((prevPage) => prevPage - 1);
        } else if (action === "next") {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

   
    return (
        <div className="bg-[#caddef] pt-5 pb-44">
            <div className="flex flex-col justify-center items-center px-40 gap-5">
                <div className="text-[30px] text-[#373435] font-bold bg-white rounded-full w-56 h-56 flex text-center items-center">
                    Transaction Dashboard
                </div>
                <div className="flex justify-between w-full">
                    <input

                        className="bg-[#f8df8c] px-3 py-2 rounded-2xl w-[250px] outline-none"
                        placeholder="search transaction"
                        onChange={handleInputChange}
                        value={search}
                    />
                    <Dropdown
                        options={months}
                        placeholder="Select month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    />
                </div>
                <div className="w-full">
                    <table className="w-full bg-[#f8df8c] rounded-3xl">
                        <thead>
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Sold</th>
                                <th className="p-4">Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="">
                                    <td className="p-4 text-center">
                                        {transaction.id}
                                    </td>
                                    <td className="p-4 text-center">
                                        {transaction.title}
                                    </td>
                                    <td className="p-4 text-center">
                                        {transaction.description}
                                    </td>
                                    <td className="p-4 text-center">
                                        {transaction.price}
                                    </td>
                                    <td className="p-4 text-center">
                                        {transaction.category}
                                    </td>
                                    <td className="p-4 text-center">
                                        {transaction.sold ? "Yes" : "No"}
                                    </td>
                                    <td className="p-4 text-center">
                                        <img
                                            src={transaction.image}
                                            alt="transaction-img"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* {pageCount > 1 && ( */}
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => handlePageChange("prev")}
                                className={`px-3 py-1 mx-1 rounded w-32 ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <span className="px-3 py-1 mx-1">{currentPage}</span>
                            <button
                                onClick={() => handlePageChange("next")}
                                className={`px-3 py-1 mx-1 rounded w-32 ${currentPage === pageCount ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                disabled={currentPage === pageCount}
                            >
                                Next
                            </button>
                        </div>
                    {/* )} */}
                </div>
                <div>
                    <Statistics selectedMonth={selectedMonth}/>
                </div>
                <div className="w-full">
                    <BarChart selectedMonth={selectedMonth}/>
                </div>
            </div>
        </div>
    );
}

const Dropdown = ({ options, placeholder, value, onChange }) => {
    return (
        <select
            className="bg-[#f8df8c] px-4 py-3 w-[250px] rounded-2xl outline-none"
            value={value}
            onChange={onChange}
        >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Dashboard;

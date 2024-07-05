import React, { useEffect, useState } from 'react'
import { apiGET } from '../../utils/apiHandler';

function Statistics({selectedMonth}) {
  
  const [statistics, setStatistics] = useState({});

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await apiGET(`/v1/statistics/statistics?month=${selectedMonth}`);
        console.log(response.data.data.data);
        if (response.status === 200) {
          setStatistics(response.data.data.data)
        } else {
          console.error("Failed to fetch statistics");
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  },[selectedMonth])

  return (
    <div className='my-[50px] flex flex-col gap-10'>
      <div className='text-[50px] font-bold'>Statistics - {selectedMonth}</div>
      <div className='text-[20px] flex flex-col gap-3 font-medium p-4 bg-[#f8df8c] rounded-3xl'>
        <div className='flex justify-between'><span>Total Sale</span><span className='text-left'>{statistics.totalSaleAmount}</span></div>
        <div className='flex justify-between'><span>Total Sold Item</span><span className='text-left'>{statistics.totalSoldItems}</span></div>
        <div className='flex justify-between'><span>Total Not Sold Item</span><span className='text-left'>{statistics.totalNotSoldItems}</span></div>
      </div>
    </div>
  )
}

export default Statistics

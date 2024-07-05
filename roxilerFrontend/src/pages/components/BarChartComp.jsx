import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';
import { apiGET } from '../../utils/apiHandler';





function BarChartComp({selectedMonth}) {


  const [barChartData, setBarChartData] = useState([])

  const handleBarClick = (data) => {
    console.log(`The ${data.range} with value ${data.count} was clicked`);
  };

console.log(selectedMonth);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await apiGET(`/v1/barchart/barChartData?month=${selectedMonth}`);
        console.log(response.data.data.data);
        if (response.status === 200) {
          setBarChartData(response.data.data.data)
        } else {
          console.error("Failed to fetch statistics");
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  },[selectedMonth])

  const data = [
    { name: 'Facebook', value: 500 },
    { name: 'WhatsApp', value: 340 },
    { name: 'Skype', value: 100 },
    { name: 'Gmail', value: 140 },
  ];
  console.log(barChartData);
  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h6" gutterBottom>
        <span className='text-[20px] font-bold'>Bar Chart Status</span> <span className='text-[50px] font-bold'>{selectedMonth}</span>
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" onClick={handleBarClick} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default BarChartComp;

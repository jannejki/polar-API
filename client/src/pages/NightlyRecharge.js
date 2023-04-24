import React, { useEffect } from 'react';

import axios from '../api/axios';
import Chart from '../LineChart';
import Navigation from '../components/Navigation';

function NightlyRecharge() {
  const [data, setData] = React.useState(null);


  const getNightlyData = async () => {
    const response = await axios('/api/nightlyRecharge', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    setData(response.data.recharges);
  }

  useEffect(() => {
    getNightlyData();
  }, []);

  return (
    <div>

      <Navigation/>
      <h1>NightlyRecharge</h1>
      <div style={{ width: '66%', margin: 'auto' }}>
        <Chart data={data} />
      </div>
    </div>
  )
}

export default NightlyRecharge;
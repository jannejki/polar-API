import React, { useEffect } from 'react';

import axios from '../api/axios';
import Chart from '../LineChart';
import Navigation from '../components/Navigation';

function NightlyRecharge() {
  const [data, setData] = React.useState(null);
  const [lines, setLines] = React.useState([]);


  const getNightlyData = async () => {
    const response = await axios('/api/nightlyRecharge', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    // going through the data and adding only wanted data to the array
    const tmp = [];
    response.data.recharges.forEach((item) => {
      tmp.push({
        ans_charge: item.ans_charge,
        ans_charge_status: item.ans_charge_status,
      });
    });

    const keys = Object.keys(tmp[0]);
    setLines(keys);
    setData(tmp);
  }

  useEffect(() => {
    getNightlyData();
  }, []);

  return (
    <div>

      <Navigation />
      <h1>NightlyRecharge</h1>
      <div style={{ width: '66%', margin: 'auto' }}>
        <Chart data={data} lines={lines} header="ANS Charge" />
      </div>
    </div>
  )
}

export default NightlyRecharge;
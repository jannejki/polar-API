import React, { useEffect } from 'react';

import axios from '../api/axios';
import Chart from '../LineChart';
import Navigation from '../components/Navigation';

function CardioLoad() {
  const [data, setData] = React.useState(null);
  const [lines, setLines] = React.useState([]);


  const getCardioLoad = async () => {
    const response = await axios('/api/cardioload', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    // removing all strings from the data 
    response.data.forEach((item) => {
      delete item.cardio_load_status;
      delete item.cardio_load_level;
      delete item.cardio_load;
      delete item.date;
    });

    const keys = Object.keys(response.data[0]);
    setLines(keys);
    setData(response.data);
  }

  useEffect(() => {
    getCardioLoad();
  }, []);

  return (
    <div>

      <Navigation />
      <h1>Cardio load</h1>
      <div style={{ width: '66%', margin: 'auto' }}>
        <Chart data={data} lines={lines} header="Cardio load" />
      </div>
    </div>
  )
}

export default CardioLoad;
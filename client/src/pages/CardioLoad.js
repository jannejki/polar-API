import React, { useEffect } from 'react';

import axios from '../api/axios';
import Chart from '../LineChart';
import Navigation from '../components/Navigation';
import { Checkbox } from '@mui/material';

function CardioLoad() {
  const [data, setData] = React.useState(null);
  const [lines, setLines] = React.useState([]);
  const [checkboxes, setCheckboxes] = React.useState([]);



  const getCardioLoad = async () => {
    const response = await axios('/api/cardioload', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    // going through the data and adding only wanted data to the array
    const tmp = [];

    // removing all strings from the data 
    response.data.forEach((item) => {
      tmp.push({
        cardio_load: item.cardio_load,
        cardio_load_ratio: item.cardio_load_ratio,
        strain: item.strain,
        tolerance: item.tolerance,
      });
    });

    const keys = Object.keys(tmp[0]);
    setLines(keys);
    setCheckboxes(keys);
    setData(tmp);
  }

  useEffect(() => {
    getCardioLoad();
  }, []);

  const checkboxToggle = (e) => {
    if (e.target.checked) {
      setLines([...lines, e.target.value]);
    } else {
      setLines(lines.filter((line) => line !== e.target.value));
    }
  };

  if (!data) {
    return <div><h1>Loading...</h1></div>;
  }

  return (
    <section className='overlay'>
      <h1>Cardio load</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Chart data={data} lines={lines} />
      </div>

      <div className='d-flex flex-wrap'>
        {checkboxes.map((checkbox, i) => {
          return (
            <div className='col-sm-3 p-3' key={i}>
              <label className="text-break" htmlFor={checkbox}>{checkbox}</label><br></br>
              <Checkbox
                defaultChecked
                id={checkbox}
                value={checkbox}
                onClick={checkboxToggle}
                sx={{
                  color: "white",
                  '&.Mui-checked': {
                    color: "green",
                  },
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default CardioLoad;
import React, { useEffect } from 'react';
import axios from '../api/axios';
import Chart from '../LineChart';
import Checkbox from '@mui/material/Checkbox';
import '../css/nightlyRecharge.css';

function NightlyRecharge() {
  const [data, setData] = React.useState(null);
  const [lines, setLines] = React.useState([]);
  const [checkboxes, setCheckboxes] = React.useState([]);

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
        beat_to_beat_avg: item.beat_to_beat_avg,
        breathing_rate_avg: item.breathing_rate_avg,
        heart_rate_avg: item.heart_rate_avg,
        heart_rate_variability_avg: item.heart_rate_variability_avg,
        nightly_recharge_status: item.nightly_recharge_status,
      });
    });

    const keys = Object.keys(tmp[0]);
    setLines(keys);
    setCheckboxes(keys);
    setData(tmp);
  };

  useEffect(() => {
    getNightlyData();
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
    <section className='overlay container-sm'>
      <h1>NightlyRecharge</h1>
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
  );

}

export default NightlyRecharge;

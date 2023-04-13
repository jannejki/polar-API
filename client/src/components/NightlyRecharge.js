import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';
import Chart from '../LineChart';

function NightlyRecharge() {
  const { setAuth } = useContext(AuthContext);
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();

  const getNightlyData = async () => {
    const response = await axios('/data', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    setData(response.data.recharges);
  }


  const logout = async () => {
    setAuth({});
    navigate('/login');
  }

  useEffect(() => {
    getNightlyData();
  }, []);

  return (
    <div>
      <Link to="/">Home</Link><br></br>
      <Link to="/about">About</Link><br></br>
      <Link to="/NightlyRecharge">Nightly recharge</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
      <h1>NightlyRecharge</h1>
      <div style={{ width: '66%', margin: 'auto' }}>
        <Chart data={data} />
      </div>
    </div>
  )
}

export default NightlyRecharge;
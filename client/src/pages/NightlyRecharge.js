import React, { useEffect } from 'react';

function NightlyRecharge() {

  const [data, setData] = React.useState(null);

  const getNightlyData = async () => {
    const response = await fetch('http://localhost:5000/data');
    const data = await response.json();
    setData(data);
  }
  
  useEffect(() => {
    console.log("nightlyProps: ");
    getNightlyData();
  }, []);

  return(
    <div>
      <h1>NightlyRecharge</h1>
      <button onClick={getNightlyData}>Get Nightly Data</button>
    </div>
  )
}

export default NightlyRecharge;
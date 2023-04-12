import React, { useEffect, useState } from "react";
import "./css/App.css";
import Axios from "axios";
import Chart from "./LineChart";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";

const DEV_API_URL = 'https://localhost:5001';
const PROD_API_URL = 'https://jannejki.ddns.net';

function App() {
  const [polarAccess, setPolarAccess] = useState();
  const [polarData, setPolarData] = useState([]);
  const [clientID, setClientID] = useState("");
  const [API_URL, setAPI_URL] = useState("");


  useEffect(() => {
    switch (process.env.NODE_ENV) {
      case 'production':
        setAPI_URL(PROD_API_URL);
        break;
      case 'development':
        setAPI_URL(DEV_API_URL);
        break;
    }

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('access')) {
      setPolarAccess(urlParams.get('access'));
    }

    console.log('polarAccess: ', polarAccess);
    setClientID('642a3448-e7fc-4dff-9ef6-f0701ccdee91');
  }, []);


  const getUser = async () => {
    console.log("Getting data from: ", API_URL);
    try {
      const rsp = await Axios({
        method: "GET",
        withCredentials: true,
        url: `${API_URL}/data`,
      });
      if (rsp.status === 200) setPolarData(rsp.data);
    } catch (error) {
      alert(error.response.status + " " + error.response.data);
    }
  };

  if (polarAccess === 'granted') {
    return (
      <div className="App">
        {process.env.NODE_ENV === 'development' ? <div className={'devBar'}><h1 style={{ margin: 0, color: 'white' }}>DEV</h1></div> : null}
        <h1>Polar API</h1>

        <div>
          <button onClick={getUser}>Get data</button>
          <Chart data={polarData}></Chart>
        </div>

        <footer>
          <div>
            <p> Author:<a href="https://github.com/jannejki">Jannejki</a></p>
            <p>Data from <a href="https://www.polar.com/accesslink-api/">Polar Accesslink</a></p>
          </div>
        </footer>
      </div>
    )
  } else {
    return (
      <div className="App">
        <Login clientID={clientID}></Login>
      </div>
    )
  }
}

export default App;

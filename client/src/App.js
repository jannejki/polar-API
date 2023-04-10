import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Chart from "./LineChart";

const DEV_API_URL= 'https://localhost:5001';
const DEV_CLIENT_ID= '65ef5498-dc96-4383-bda7-0ce53662bbcb';

const PROD_API_URL= 'https://jannejki.ddns.net';
const PROD_CLIENT_ID= '642a3448-e7fc-4dff-9ef6-f0701ccdee91';

function App() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [polarData, setPolarData] = useState([]);
  const [clientID, setClientID] = useState("");
  const [API_URL, setAPI_URL] = useState("");

  useEffect(() => {
    switch (process.env.NODE_ENV) {
      case 'production':
        setAPI_URL(PROD_API_URL);
        setClientID(PROD_CLIENT_ID);
        break;
      case 'development':
        setAPI_URL(DEV_API_URL);
        setClientID(PROD_CLIENT_ID);
        break;
    }
    console.log({API_URL, clientID});
  }, []);

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: `${API_URL}/login`,
    }).then((res) => console.log(res));
  };

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
      alert(error.response.status + " " + error.response.statusText);
    }
  };

  return (
    <div className="App">
      <h1>hello world</h1>
      <div>
        <a href={`https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${clientID}`}>Polar login</a>
      </div>

      <button onClick={getUser}>Get data</button>

      <Chart data={polarData}></Chart>
    </div>
  );
}

export default App;

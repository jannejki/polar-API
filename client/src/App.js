import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import Chart from "./LineChart";

function App() {
  const API_URL = "http://152.70.178.116:3000";
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [polarData, setPolarData] = useState([]);


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

    try {
      const rsp = await Axios({
        method: "GET",
        withCredentials: true,
        url: `${API_URL}/data`,
      });
      if (rsp.status === 200) setPolarData(rsp.data);
    } catch (error) {
      alert(error.response.status+ " " + error.response.statusText);
    }
  };



  return (
    <div className="App">

      <div>
        <a href="https://flow.polar.com/oauth2/authorization?response_type=code&client_id=642a3448-e7fc-4dff-9ef6-f0701ccdee91">Polar login</a>
      </div>


      <button onClick={getUser}>Get data</button>

      <Chart data={polarData}></Chart>
    </div>
  );
}

export default App;

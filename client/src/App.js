import React, { useEffect } from "react";
import "./css/App.css";

import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Missing from "./components/Missing";
import About from "./components/About";
import NightlyRecharge from "./components/NightlyRecharge";
import Home from "./components/Home";
import Oauth_CB from "./components/Oauth_CB";

function App() {

  useEffect(() => {
    console.log('App.js useEffect');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/about" element={<About />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/NightlyRecharge" element={<NightlyRecharge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>

      <Route path="/oauth_cb" element={<Oauth_CB />} />
    </Routes>
  );
}

export default App;

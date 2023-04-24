import React, { useEffect } from "react";
import "./css/App.css";

import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Layout from "./pages/Layout";
import RequireAuth from "./components/RequireAuth";
import Missing from "./pages/Missing";
import About from "./components/About";
import NightlyRecharge from "./pages/NightlyRecharge";
import Home from "./pages/Home";
import Oauth_CB from "./components/Oauth_CB";

function App() {
  useEffect(() => {

  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/oauth_cb" element={<Oauth_CB />} />
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

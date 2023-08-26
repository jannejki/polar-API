import React, { useEffect, useState } from "react";
import "./css/App.css";

import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import About from "./components/About";

import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NightlyRecharge from "./pages/NightlyRecharge";
import Missing from "./pages/Missing";
import Home from "./pages/Home";
import CardioLoad from "./pages/CardioLoad";

import Oauth_CB from "./components/Oauth_CB";
import useAuth from "./hooks/useAuth";
import Settings from "./pages/Settings";

function App() {
  const { polarLogin } = useAuth();

  useEffect(() => {
    const url = window.location.href;
    let code = url.split('=')[1] || '';
    // if code has a '#' in it, remove the '#' and everything after it
    if (code.includes('#')) {
      const codeArr = code.split('#');
      code = codeArr[0];
    }
    if (code !== '') {
      polarLogin(code);
    }
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
          <Route path="/cardioload" element={<CardioLoad />} />
          <Route path="/Settings" element={<Settings />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>

      <Route path="/oauth_cb" element={<Oauth_CB />} />
    </Routes>
  );
}

export default App;

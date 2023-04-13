import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";

function About() {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('about');
    });

    return (
        <section>
            <Link to="/">Home</Link><br></br>
            <Link to="/NightlyRecharge">Nightly recharge</Link>
            <h1>About</h1>
            <p>This page is free for all</p>
        </section>
    )
}

export default About;
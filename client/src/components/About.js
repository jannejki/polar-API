import Navigation from '../components/Navigation';
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from 'react-router-dom';

function About() {
    const { auth } = useContext(AuthContext);

    return (
        <section>
            {auth.user
                ? <Navigation />
                : <Link to="/login">Login</Link>
            }
            <h1>About</h1>
            <p>This page is free for all</p>
        </section>
    )
}

export default About;
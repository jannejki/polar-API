import React, { useEffect } from 'react';

function About() {

    useEffect(() => {
        console.log("aboutProps: ");
    }, []);
    
    return (
        <div>
            <h1>About</h1>
            <p>This page is free for all</p>
        </div>
    )
}

export default About;
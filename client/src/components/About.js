import { useState } from "react";

function About() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    return (
        <section>
            <h1>About</h1>
            <p>This page is free for all</p>
            <h1>Screen size is: {height} X {width} px</h1>
        </section>
    )
}

export default About;
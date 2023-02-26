import React from 'react';
import Navbar from "../Components/Navbar/Navbar"
import About from "../Components/About/About";
import Projects from "../Components/Projects/Projects";
import Slideshow from "../Components/Slideshow/Slideshow";
import Services from "../Components/Services/Services";
import Contact from "../Components/Contact/Contact";
function User() {
    return (
        <div>
            <Navbar />
            <Slideshow />
            <About />
            <Projects />
            <Services />
            <Contact />
        </div>
    )
}

export default User
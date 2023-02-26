import React, { useState, useEffect } from "react";
import "../About/About.css";
import Axios from "axios";

function About() {
  const [about, setAbout] = useState([]);
  const Request = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/api/about");
      const res = await response.data;
      console.log(res);
      setAbout(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Request();
  }, []);

  return (
    <>
      <div className="About-main">
        <h1 className="About-h1" id="about">
          About
        </h1>

        <div className="About-content">
          <div className="About-image">
            <img src={`http://localhost:5000/${about[0]?.image}`} alt="title" />
          </div>

          <div className="About-text">
            <img
              className="hide-show"
              src={`http://localhost:5000/${about[0]?.image}`}
              alt="title"
            />
            <div className="wrep">
              <h3 className="About-h3">{about[0]?.title}</h3>
              <p className="About-p">{about[0]?.text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

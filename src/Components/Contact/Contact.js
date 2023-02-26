import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useState, useEffect } from "react";
import "../Contact/Contact.css";

function Contact() {
  const form = useRef();
  const [Contact, setContact] = useState([]);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4cbd9gb",
        "template_sj88xly",
        e.target,
        "kpuzN6_Mcnfkpouoj"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get("/api/contact");
        const result = await response.data;
        setContact(result);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="contact" id="contact">
      <div className="whatsapp-btn-container">
        <a className="whatsapp-btn" href={Contact[0]?.whatsapp}>
          <i class="fa-brands fa-whatsapp"></i>
        </a>
        <span>Contact Us</span>
      </div>

      <div className="cont-contact">
        <div className="contact-heading">
          <h2> Contact </h2>

          <p>Contact us for more information</p>
        </div>
        <div className="container">
          <div className="socials-media">
            <div className="socials-icons icon">
              <i class="fa-sharp fa-solid fa-location-dot"></i>
              <a href={Contact[0]?.adress}>
                <h5>Address</h5>
              </a>
            </div>

            <div className="socials-icons icon">
              <i class="fa-solid fa-envelope"></i>
              <a href={Contact[0]?.email}>
                <h5>E-mail</h5>
              </a>
            </div>

            <div className="socials-icons icon">
              <i className="fa-brands fa-linkedin"></i>
              <a
                target="_blank"
                rel="noreferrer"
                href={Contact[0]?.linkedin}>
                <h5>Linkedin</h5>
              </a>
            </div>
          </div>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <input type="text" placeholder="Name" name="name_from" required />
              <input
                type="email"
                placeholder="E-mail"
                name="email_from"
                required
              />
              <input type="text" placeholder="Subject" required name="subject" />
              <textarea
                placeholder="Message"
                name="message"
                required></textarea>
              <button type="submit" value="send" className="site-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

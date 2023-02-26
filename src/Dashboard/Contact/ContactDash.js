import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ContactDash.css";

function ContactDash() {
  const form = useRef();
  const [Contact, setContact] = useState([]);
  const [OpenEdit,setEditContact] = useState(false);
  const [EditAdress,setEditAdress] = useState(Contact[0]?.adress);
  const [EditLinkedin,setEditLinkedin] = useState(Contact[0]?.linkedin);
  const [EditEmail,setEditEmail]=useState(Contact[0]?.email)
  const [EditWhatsapp,setEditWhatsapp] = useState(Contact[0]?.whatsapp)

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
  const fetchContact = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contact");
      const result = await response.data;
      setContact(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const EditContactForm = async () => {
    const form = {
      "adress":EditAdress,
      "linkedin":EditLinkedin,
      "email":EditEmail,
      "whatsapp":EditWhatsapp
    }
    try{
      const response = await axios.put(`http://localhost:5000/api/contact/${Contact[0]?._id}`,form,
      {
        content : "application/json",
        headers: {
            "Authorization" : 'Bearer ' + localStorage.getItem('token')
        }
       });
       const res = await response.data;
       console.log(res);
       fetchContact()
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="contact-dash" id="contact">
        <button className="Edit-contact-button" onClick={()=>setEditContact(!OpenEdit)}>Edit Contact</button>
      {OpenEdit &&
      <div>
        <label className="Contact-label">Please Update Address Link  
          <br />
      <input className="Contact-inputt"  onChange={(e)=>{setEditAdress(e.target.value)}} defaultValue={Contact[0]?.adress}/>
      </label>
      <br />
      <label className="Contact-label">Please Update Email Link 
      <br />
      <input className="Contact-inputt"  onChange={(e)=>{setEditEmail(e.target.value)}} defaultValue={Contact[0]?.email}/>
      </label>
      <br />
      <label className="Contact-label">Please Update Linkedin Link 
      <br />
      <input  className="Contact-inputt" onChange={(e)=>{setEditLinkedin(e.target.value)}} defaultValue={Contact[0]?.linkedin}/>
      </label>
      <br />
      <label className="Contact-label">Please Update Whatsapp Link 
      <br />
      <input  className="Contact-inputt" onChange={(e)=>{setEditWhatsapp(e.target.value)}} defaultValue={Contact[0]?.whatsapp}/>
      </label>
      <br />
       <button className="Contact-submit" onClick={()=>EditContactForm()}>Update</button>
       <br />
       <button className="Exit-Contact" onClick={()=>setEditContact(!OpenEdit)}>Exit</button>

      </div>
      }
          

      <div className="whatsapp-btn-container-dash">
        
        <a className="whatsapp-btn-dash" href={Contact[0]?.whatsapp}>
          <i className="fa-brands fa-whatsapp-dash"></i>
        </a>
        <span>Contact Us </span>
      </div>

      <div className="cont-contact-dash">
        <div className="contact-heading-dash">
          <h2> Contact </h2>

          <p>Contact us for more information</p>
        </div>
        <div className="container-dash">
          <div className="socials-media-dash">
            <div className="socials-icons-dash icon-dash">
              <i className="fa-sharp fa-solid fa-location-dot"></i>
              <a href={Contact[0]?.adress}>
                <h5 className="h5-dash">Address</h5>
              </a>
            </div>

            <div className="socials-icons-dash icon-dash">
              <i className="fa-solid fa-envelope"></i>
              <a href={Contact[0]?.email}>
                <h5 className="h5-dash">E-mail</h5>
              </a>
            </div>

            <div className="socials-icons-dash icon-dash">
              <i className="fa-brands fa-linkedin"></i>
              <a
                target="_blank"
                rel="noreferrer"
                href={Contact[0]?.linkedin}>
                <h5 className="h5-dash">Linkedin</h5>
              </a>
            </div>
          </div>
          <div className="contact-form-dash">
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
              <button type="submit" value="send" className="site-btn-dash">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDash;

import React, { useState, useEffect } from "react";
import "./AboutDash.css";
import Axios from "axios";

function AboutDash() {
  const [about, setAbout] = useState([]);
  const [title,settitle] = useState(about[0]?.title);
  const [image,setimage] = useState(about[0]?.image);
  const [text,settext] = useState(about[0]?.text);
  const [openEdit,setopenEdit] = useState(false);
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

  const EditAbout = async() => {
    const form = new FormData();
    form.append('image',image);
    form.append('title',title);
    form.append('text',text);
    try{
      const response = await Axios.put(`http://localhost:5000/api/about/${about[0]._id}`,form,
      {
        content : "application/json",
        headers: {
            "Authorization" : 'Bearer ' + localStorage.getItem('token')
        }
    })
      const res = await response.data;
      console.log(res)
      Request();
      setopenEdit(!openEdit)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    Request();
  }, []);

  return (
    <>
      <div className="About-main-dash">
      {openEdit &&
    <div className="Edit-about">
      <img src={`http://localhost:5000/${about[0]?.image}`} alt='About-title' style={{width:"50px"}}/>
      <br/>
      <button className="Exit-about" onClick={()=>{setopenEdit(!openEdit)}}>
       ❌
        </button>
        <br />
        <input className="Choose-about-image" onChange={(e)=>{setimage(e.target.files[0])}} type="file"/>
        <br/>
        <label className="About-label" htmlFor='About-title'>Please provide About title
        <br/>
        <input className="About-title-input" defaultValue={about[0]?.title} id='About-title' onChange={(e)=>{settitle(e.target.value)}}/>
        </label>
        <br/>
        <label className="About-label" htmlFor='About-description'>Please provide About description
        <br/>
        <input className="About-description-input" defaultValue={about[0]?.text} id='About-description' onChange={(e)=>{settext(e.target.value)}}/>
        </label>
       <br />
        <button className="About-submit-button" onClick={()=>{EditAbout()}}>Update</button>
    </div>
    }   
    
        <h1 className="About-h1-dash" id="about">
          About
        </h1>
        <button className="edit-about-button" onClick={()=>{setopenEdit(!openEdit)}}>
          Edit About
        </button>

        <div className="About-content-dash">
          <div className="About-image-dash">
            <img src={`http://localhost:5000/${about[0]?.image}`} alt="title" style={{maxWidth:'500px'}}/>
          </div>

          <div className="About-text-dash">
            <img
              className="hide-show-dash"
              src={`http://localhost:5000/${about[0]?.image}`}
              alt="title"
            />
            <div className="wrep-dash">
              <h3 className="About-h3-dash">{about[0]?.title}</h3>
              <p className="About-p-dash">{about[0]?.text}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default AboutDash;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loading from "../../Loading/Loading";
import "./slider.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

function Slider() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Image,setImage]=useState(null);
  const [openDivPost,setdivPost]=useState(false);
  const [Title,setTitle]=useState('');

  const Request = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:5000/api/announcements"
      );
      const res = await response.data;
      setAnnouncements(res);
      setLoading(true);
      console.log(res);
      console.log(loading);
    } catch (err) {
      console.log(err);
    }
  };
  
  const PostImage =async ()=>{
    const form = new FormData();
    form.append("image",Image);
    form.append("title",Title)
    try{
    const res = await Axios.post(`http://localhost:5000/api/announcements`,form, 
    {
        content : "application/json",
        headers: {
            "Authorization" : 'Bearer ' + localStorage.getItem('token')
        }
    }
    )
    const response =await res.data;
    console.log(response);
    Request();

}catch(err){
    console.log(err);
}
  }

  const DeleteImage =async (id)=>{
    try{
    const res = await Axios.delete(`http://localhost:5000/api/announcements/${id}`,
    {
        content : "application/json",
        headers: {
            "Authorization" : 'Bearer ' + localStorage.getItem('token')
        }
    }
    )
    const response =await res.data;
    console.log(response);
    Request();
    setdivPost(false);

}catch(err){
    console.log(err);
}
  }
 
  useEffect(() => {
    Request();
  }, []);
  return (
    <>
 <button onClick={()=>setdivPost(true)} className='AddSlide'>Create new Image</button>
    {openDivPost &&
    <div className="Slider-opendiv">
      <label htmlFor="slider-input-image" className="Image-slider-label"> Image
      <br />
        <input id="slider-input-image" type="file" className="Choose-slider-image" onChange={(e)=>{setImage(e.target.files[0])}}/>
        </label>
        <br />
        <label htmlFor='Slider-title' className="Slider-label">Please provide image title
        <br />
        <input 
       id="Slider-title" placeholder="Image title" className="Slider-title-input" type="text"onChange={(e)=>{setTitle(e.target.value)}}/>
        </label>
        <br />
        <button onClick={()=>PostImage()} className='Submit-button'>Submit</button>
        <br />
        <button onClick={()=>setdivPost(!openDivPost)} className='Exit-slider'>Exit</button>
    </div>
}
      <div className="main-slideshow-dash">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="SlideshowSwiper-dash">
          {loading ? (
            announcements?.map((obj) => {
              return (
                <SwiperSlide key={obj._id} className="Slideshow-Swiperslide">
                  <div className="Slideshow-container-dash">
                    <img
                      src={`http://localhost:5000/${obj.image}`}
                      alt={obj.title}
                    />
                  </div>
                  <button className="DeleteSlide" onClick={()=>DeleteImage(obj._id)}>Delete this slide</button>
                </SwiperSlide>
              );
            })
          ) : (
            <Loading />
          )}
        </Swiper>
      </div>
    </>
  );
}

export default Slider;

import React, { useState, useEffect } from "react";
import "../Slideshow/Slideshow.css";
import Axios from "axios";
import Loading from "../../Loading/Loading";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

function Slideshow() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    Request();
  }, []);
  return (
    <>
      <div className="main-slideshow">
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
          className="SlideshowSwiper">
          {loading ? (
            announcements?.map((obj) => {
              return (
                <SwiperSlide key={obj._id} className="Slideshow-Swiperslide">
                  <div className="Slideshow-container">
                    <img
                      src={`http://localhost:5000/${obj.image}`}
                      alt={obj.title}
                    />
                  </div>
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

export default Slideshow;

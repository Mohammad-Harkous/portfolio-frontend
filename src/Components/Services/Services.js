import { useState, useEffect } from "react";
import "../Services/Services.css";
import Axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

function Services() {
  const [Service, setService] = useState([]);
  const Request = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/api/services");
      const res = await response.data;
      console.log(res);
      setService(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Request();
  }, []);

  return (
    <>
      <div className="Service-main" id="services">
        <h1 className="Service-h1">Services</h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="ServiceSwiper">
          {Service?.map((obj) => {
            return (
              <SwiperSlide key={obj._id} className="ServiceSlide">
                <h2 className="Service-h2">{obj.title}</h2>
                <p className="Service-p">{obj.description}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export default Services;

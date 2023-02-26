import React from 'react'
import Slider from '../SliderComponent/slider';
import AboutDash from '../About/AboutDash';
import ProjectsDash from '../projects/ProjectsDash';
import ServicesDash from '../services/ServicesDash';
import ContactDash from '../Contact/ContactDash';
function Dashboard() {
  return (
    <div>
      <Slider/>
      <AboutDash/>
      <ProjectsDash/>
      <ServicesDash />
      <ContactDash />
    </div>
  )
}

export default Dashboard;
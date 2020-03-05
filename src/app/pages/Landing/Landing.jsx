import React from 'react';
import Hero from 'App/pages/Landing/Hero.jsx';
import Activities from 'App/pages/Landing/Activities.jsx';
import NewArrivals from 'App/pages/Landing/NewArrivals.jsx';
import PopularCategories from 'App/pages/Landing/PopularCategories.jsx';
import Events from 'App/pages/Landing/Events.jsx';

export default function Landing() {
  return  (
    <div className="landing-page">
      <Hero />
      <PopularCategories />
      <Activities />
      <Events />
      <NewArrivals />
    </div>
  )
}
import React from 'react';
import Hero from 'App/landing/Hero.jsx';
import Activities from 'App/landing/Activities.jsx';
import NewArrivals from 'App/landing/NewArrivals.jsx';
import PopularCategories from 'App/landing/PopularCategories.jsx';
import Events from 'App/landing/Events.jsx';

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
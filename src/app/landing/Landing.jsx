import React from 'react';
import Hero from 'App/landing/Hero.jsx';
import Activities from 'App/landing/Activities.jsx';
import NewArrivals from 'App/landing/NewArrivals.jsx';
import PopularCategories from 'App/landing/PopularCategories.jsx';

export default class Landing extends React.Component {
  render(){
    return  (
      <div className="landing-page">
        <Hero />
        <PopularCategories />
        <Activities />
        <NewArrivals />
      </div>
    );
  }
}
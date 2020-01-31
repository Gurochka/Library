import React from 'react';
import Hero from 'App/landing/Hero.jsx';
import Activities from 'App/landing/Activities.jsx';

export default class Landing extends React.Component {
  render(){
    return  (
      <div className="landing-page">
        <Hero />
        <Activities />
        <h1>Landing Component</h1>
      </div>
    );
  }
}
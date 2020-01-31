import React from 'react';
import Hero from 'App/landing/Hero.jsx';

export default class Landing extends React.Component {
  render(){
    return  (
      <div className="landing-page">
        <Hero />
        <h1>Landing Component</h1>
      </div>
    );
  }
}
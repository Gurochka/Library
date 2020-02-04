import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';

export default class Footer extends React.Component {
  render(){
    return(
      <footer>
        
        <div className="footer-links container">
          <div>
            <h2 className="flex align-items-center"><Logo /> libraria </h2>
            <p>Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper.</p>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p><b></b></p>
            <p>Phone: (123) 123-456</p>
            <p>Email: <a href="#">libraria@example.com</a></p>
            <p>
              <button className="round-button facebook-btn"> <FontAwesomeIcon icon={['fab', 'facebook-f']} title="Facebook"/> </button>
              <button className="round-button instagran-btn"> <FontAwesomeIcon icon={['fab', 'instagram']} title="Instagram"/> </button>
              <a className="round-button github-btn" href="https://github.com/Gurochka/Library" target="__blank"> <FontAwesomeIcon icon={['fab', 'github-alt']} title="github"/> </a> 
            </p>
          </div>
          <div>
            <h4>Сopyrights</h4>
            <p>Here I will list all сopyrights to authors</p>
          </div>
        </div>

        <div className="footer-copyrights">
          <div>@ This is <a target="__blank" href="https://github.com/Gurochka/Library">gurochka</a> test project. </div>
          <div className="brands">Made with 
            <FontAwesomeIcon icon={['fab', 'react']} title="React"/> 
            <FontAwesomeIcon icon={['fab', 'sass']} title="Sass" />
            <FontAwesomeIcon icon={['fab', 'npm']} title="npm" />
          </div>       
        </div>

      </footer>
    );
  }
}
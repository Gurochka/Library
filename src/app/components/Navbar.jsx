import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from "./Logo.jsx";

export default class Navbar extends React.Component {
  render(){
    return  (
<nav className="navbar white">
  <div className="container flex align-items-center">
    
    <a className="navbar-brand flex align-items-center" href="#"><Logo /><strong>libraria</strong></a>
    
    <div className="collapse navbar-collapse align-items-center justify-content-between flex-grow-1">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">Dashboard  <FontAwesomeIcon icon="angle-down"/></a>
          
          <div className="dropdown-menu">
            <a href="#">Latest Performance</a>
            <a href="#">Latest Assessment</a>
            <a className="active" href="#">Better Performance</a>
            <a href="">Manage Risks</a>
            <a href="#">Update Account</a>
            <a href="#">Logout</a>
          </div>

        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Market Overview  <FontAwesomeIcon icon="angle-down"/></a>
          <div className="dropdown-menu">
            <a href="#">Overall Status</a>
            <a href="#">Rising/Falling Trend</a>
          </div>         
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Help  <FontAwesomeIcon icon="angle-down"/></a>
          <div className="dropdown-menu">
            <a href="">Benefits For registered users</a>
            <a href="">How to use Pension Angel Tools</a>
          </div>          
        </li>
      </ul>

      <ul className="navbar-nav">
        <button className="btn btn-secondary"> <FontAwesomeIcon icon="sign-out-alt"/> Sign In</button>
      </ul>
    </div>
  </div>
</nav>
);
  }

}
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Logo } from "/public/images/books.svg";

export default class Navbar extends React.Component {
  render(){
    return  (
<nav className="navbar">
  <div className="container">
    
    <a className="navbar-brand" href="#"><Logo/><strong>Librarian</strong></a>
    
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">Dashboard</a>
          
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
          <a className="nav-link" href="#">Market Overview</a>
          <div className="dropdown-menu">
            <a href="#">Overall Status</a>
            <a href="#">Rising/Falling Trend</a>
          </div>         
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Help</a>
          <div className="dropdown-menu">
            <a href="">Benefits For registered users</a>
            <a href="">How to use Pension Angel Tools</a>
          </div>          
        </li>
      </ul>
    </div>
  </div>
</nav>
);
  }

}
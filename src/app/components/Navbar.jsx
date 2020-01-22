import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';

export default class Navbar extends React.Component {
  render(){
    return  (
      <nav className="navbar white">
        <div className="container flex align-items-center">
          
          <Link to="/" className="navbar-brand flex align-items-center"><Logo /><strong>libraria</strong></Link>
          
          <div className="collapse navbar-collapse align-items-center justify-content-between flex-grow-1">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/readers">Readers</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Books  <FontAwesomeIcon icon="angle-down"/></a>
                <div className="dropdown-menu">
                  <NavLink activeClassName="active" to="/books_search">Books Search</NavLink>
                  <a href="#">Managing Books</a>
                </div>         
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Orders  <FontAwesomeIcon icon="angle-down"/></a>
                <div className="dropdown-menu">
                  <a href="">Orders List</a>
                  <a href="">Create New Order</a>
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
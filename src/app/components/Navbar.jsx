import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import Logo from 'App/components/Logo.jsx';

export default function Navbar() {
  return  (
    <nav className="navbar white">
      <div className="container flex align-items-center">
        
        <Link to="/" className="navbar-brand flex align-items-center"><Logo /><strong>libraria</strong></Link>
        
        <div className="collapse navbar-collapse align-items-center justify-content-between flex-grow-1">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/readers">Readers</NavLink>
              <NavLink className="nav-link" activeClassName="active" to="/readers/new">Add Reader</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Books  <FontAwesomeIcon icon="angle-down"/></a>
              <div className="dropdown-menu">
                <NavLink activeClassName="active" to="/books">Books Search</NavLink>
                <NavLink activeClassName="active" to="/book/new">Add Book</NavLink>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Orders  <FontAwesomeIcon icon="angle-down"/></a>
              <div className="dropdown-menu">
                <NavLink activeClassName="active" to="/orders">Orders List</NavLink>
                <NavLink activeClassName="active" to="/order/new">Create New Order</NavLink>
              </div>
            </li>
          </ul>

          <ul className="navbar-nav">
            <button className="btn btn-secondary"> <FontAwesomeIcon icon="sign-out-alt"/> Sign In</button>
          </ul>
        </div>
      </div>
    </nav>
  )
}
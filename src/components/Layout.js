/** @format */

import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const ulStyles = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#333',
  };

  const liStyles = {
    float: 'left',
    borderRight: '1px solid #bbb',
  };

  const liLastChildStyles = {
    borderRight: 'none',
  };

  const liLinkStyles = {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
  };

  const activeStyles = {
    backgroundColor: '#04AA6D',
  };

  const isActive = (path) => {
    return location.pathname === path ? activeStyles : {};
  };

  return (
    <>
      <nav>
        <ul style={ulStyles}>
          <li style={liStyles}>
            <Link to='/' style={{ ...liLinkStyles, ...isActive('/') }}>
              Home
            </Link>
          </li>
          <li style={liStyles}>
            <Link to='/users' style={{ ...liLinkStyles, ...isActive('/users') }}>
              Users
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;

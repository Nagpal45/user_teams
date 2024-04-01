import React from 'react'
import './navbar.css';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
  return (
    <div className='navbar'>
        <Link to='/'>
            <p className={location.pathname === '/' ? 'activeLink' : ''}>Home</p>
        </Link>
        <Link to='/teams'>
            <p className={location.pathname === '/teams' ? 'activeLink' : ''}>All Teams</p>
        </Link>
    </div>
  )
}

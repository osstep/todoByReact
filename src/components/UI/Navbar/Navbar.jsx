import { Link } from "react-router-dom";

import React from 'react'
import About from "../../../pages/About";
import Posts from "../../../pages/Posts";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar__links">
        <Link to='/about'>О нас</Link>
        <Link to='/'>Главная</Link>

      </div>
    </div>
  )
}

export default Navbar
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='container' >
      <ul className='ul-header' >
        <li>
          <Link to='/' className='nav-li' >Product</Link>
        </li>
        <li>
          <Link to='/add' >Add Proudct</Link>
        </li>
        <li>
          <Link to='/update' >Update Product</Link>
        </li>
        <li>
          <Link to='/logout' >Logout</Link>
        </li>
        <li>
          <Link to='/profile' >Profile</Link>
        </li>
         <li>
          <Link to='/sign-up' >Sign up</Link>
        </li>
      </ul>

    </div>
  )
}

export default Nav
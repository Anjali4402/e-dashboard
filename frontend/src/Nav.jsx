import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('user');
    navigate('/sign-up')

  }

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
          <Link to='/profile' >Profile</Link>
        </li>

        {
          auth ?
            <li>
              <Link  to={'/sign-up'} onClick={handleLogout} >Logout</Link>
            </li>
            :
            <>

            <li>
              <Link to='/sign-up' >Sign up</Link>
            </li>

            <li>
              <Link to='/login' >Login</Link>
            </li>
            
            </>
        }



      </ul>

    </div>
  )
}

export default Nav
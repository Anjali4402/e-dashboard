import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {

  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth)
  const navigate = useNavigate();

  const handleLogout = () => {
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
          <Link to='/add' >Add/Update Proudct</Link>
        </li>
        {/* <li>
          <Link to='/update' >Update Product</Link>
        </li> */}
        <li>
          <Link to='/profile' >Profile</Link>
        </li>

        {
          auth ?
            <li>
              <Link to={'/sign-up'} onClick={handleLogout} >Logout</Link>
            </li>
            :
            <>

              <li>
                <Link to='/login' >Login</Link>
              </li>

            </>
        }

        {
          auth &&
          <li>{auth?.name}</li>
        }



      </ul>

    </div>
  )
}

export default Nav
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface LoginResponse {
    user : {
      _id : string;
      name : string;
      email : string;
    },
    auth : string;
  }


const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // run initially if use is already logedin then don't show this page.
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate("/")
    }
  })



  const handleLoginApi = async () => {
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // console.warn(res)
      const response: LoginResponse = await res.json(); 


      // store data in localstorage
      localStorage.setItem('user', JSON.stringify(response?.user))
      localStorage.setItem('token', JSON.stringify(response?.auth))
      console.warn(response);
      if (response) {
        navigate('/')
      }


    } catch (error) {
      console.log(error)
    }
  }





  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted details', email, password);
    handleLoginApi();
  }

  const clearData = () => {
    setEmail("");
    setPassword("");
  };



  return (
    <div className='signup-box'>

      <h2 >Sign up </h2>
      <form onSubmit={handleSubmit}>


        <div className='formData-div' >
          <label htmlFor="email">Email</label>
          <input type='email'
            id='email'
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
            required
            placeholder='Enter Email'
          />
        </div>


        <div className='formData-div' >
          <label htmlFor="password">Password</label>
          <input type='password'
            id='password'
            value={password}
            onChange={(event) => { setPassword(event.target.value) }}
            required
            placeholder='Enter Password'
          />
        </div>

        <div className='button-div' >
          <button
            type='button'
            onClick={clearData}
          >
            Reset
          </button>

          <button
            type='submit'
          >
            Submit
          </button>

        </div>


        <p
          style={{ textAlign: 'center' }}
        >don't have account ? <Link
          to='/sign-up'
        > Sign up </Link></p>






      </form>



    </div>
  )
}

export default Login
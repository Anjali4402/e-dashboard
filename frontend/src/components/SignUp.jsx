import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const submitUseSignup = async() => {
        try {
            
            let response = await fetch("http://localhost:5000/register", {
                method : 'POST',
                body : JSON.stringify({name , email, password}),
                headers : {
                    'Content-Type' : 'application/json',
                }
            })
            console.log(response)
             
            response = await response.json();

            // store data in localstorage
            localStorage.setItem('user', JSON.stringify(response))
            console.warn(response);
            if(response){
                navigate('/')
            }

        }catch(error){
            console.log(error);
        }
       
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitted details', name, email, password);
        submitUseSignup();
    }

    const clearData = ()=>{
        setName('');
        setEmail("");
        setPassword("");
    };


    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })

  return (
    <div className='signup-box'>

        <h2 >Sign up </h2>
        <form onSubmit={handleSubmit}>

            <div className='formData-div' >
                <label htmlFor="name">Name</label>
                <input type="text"
                id='name' 
                value={name}
                onChange={(event) => setName(event.target.value)}
                name = 'name'
                placeholder='Enter Name'
                required
                />
            </div>


            <div className='formData-div' >
                <label htmlFor="email">Email</label>
                <input type='email' 
                id='email'
                value={email}
                onChange={(event)=>{setEmail(event.target.value)}}
                required
                placeholder='Enter Email'
                />
            </div>


            <div className='formData-div' >
                <label htmlFor="password">Password</label>
                <input type='password' 
                id='password'
                value={password}
                onChange={(event)=> {setPassword(event.target.value)}}
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
                    style={{textAlign:'center'}}
                     >
                        Already have account ? <Link
                    to='/login'
                     > Login

                     </Link></p>
            






        </form>



    </div>
  )
}

export default SignUp
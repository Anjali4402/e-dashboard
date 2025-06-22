import React, { useState } from 'react'

const SignUp = () => {

    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitted details', name, email, password)
    }

    const clearData = ()=>{
        setName('');
        setEmail("");
        setPassword("");
    }

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






        </form>



    </div>
  )
}

export default SignUp
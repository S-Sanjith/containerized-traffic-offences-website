// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import {} from './reducers/user'
// import './login.css'
// import { loginUser } from './action/user'
// import LockIcon from '@mui/icons-material/Lock';

// function LoginPage() {
//   const dispatch= useDispatch()
//   const [username, setUsername]= useState([])
//   const [password, setPassword]= useState([])
//   const submithandler=(e)=>{
//     e.preventDefault()
//     dispatch(loginUser(username,password))
//   }
//   return (
//        <div className='login'>
//        <form action="" method="get" className='loginform'>
//        <LockIcon fontSize='large' />
//        <span className='title--login'> ACCESS RESTRICTED PLEASE LOGIN</span>
//        <input  type="text" autoComplete='off' name="username" id="username" placeholder='username'  onChange={(e)=>setUsername(e.target.value)} /> 
//        <input type="password" name="password" id="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
//        <button type="submit" onClick={submithandler}>submit</button>
//        </form>        
//      </div>
   

//   )
// }

// export default LoginPage

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from './action/user';
import LockIcon from '@mui/icons-material/Lock';
import './login.css';

function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <div className='login'>
      <form action="" method="get" className='loginform'>
        <LockIcon fontSize='large' />
        <span className='title--login'> ACCESS RESTRICTED PLEASE LOGIN</span>
        <input
          type="text"
          autoComplete='off'
          name="username"
          id="username"
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLogin}>Login</button>
        <div className="signup-option">
          <span>
            <Link to="/signup" className="signup-link">
              Click here to create an account
            </Link>
          </span>
        </div>
        
      </form>
    </div>
  );
}

export default LoginPage;

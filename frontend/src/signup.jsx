import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from './action/user'; // Assuming you have a signUpUser action
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useHistory for navigation
import LockIcon from '@mui/icons-material/Lock';
import './signup.css';

function SignupPage() {
  const dispatch = useDispatch();
//   const history = useHistory();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Assuming signUpUser is an asynchronous action
    await dispatch(signUpUser(username, password));
    // history.push('/login'); // Redirect to login page after signup
    navigate('/');
  };

  return (
    <div className='signup'>
      <form className='signupform'>
        <LockIcon fontSize='large' />
        <span className='title--signup'>Create an Account</span>
        <input
          type="text"
          autoComplete='off'
          name="username"
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSignUp}>Sign Up</button>
        <div className="login-option">
          <span>Already have an account?{' '}
            <Link to="/" className="login-link">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;

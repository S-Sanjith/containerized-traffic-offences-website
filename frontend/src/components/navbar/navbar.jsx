// import React from 'react'
// import { useState } from 'react'
// import { Link , useNavigate } from 'react-router-dom'

// import HomeIcon from '@mui/icons-material/Home';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import {} from '../../reducers/user'
// import '../../global.css'

// import { Button } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { logoutUser } from '../../action/user';
// function Navbar() {
//   const [tab,setTab]= useState(window.location.pathname)
//   const dispatch= useDispatch()
//   const navigate = useNavigate();
//   const handlelogout=()=>{
//     if (window.confirm('are you sure you want to logout?')===true)
//     navigate('/');
//     dispatch(logoutUser())
    
//   }
//   return (
//     <div className='navbar'> 
//       <Link to={'/'} onClick={()=>{setTab('/')}} >
//         {tab==='/'?<HomeIcon fontSize='large' style={{color: 'black'}} />: <HomeOutlinedIcon fontSize='large' />}
       
//             </Link>

//             <Link to={'/all'} onClick={()=>{setTab('/all')}} >
//              <span className='nav-titles'>View offences </span>
       
//             </Link>

//             <Link to={'/add'} onClick={()=>{setTab('/add')}} >
//         {tab==='/add'?<AddBoxIcon fontSize='large' style={{color: 'black'}} />: <AddBoxOutlinedIcon fontSize='large' />}
       
//             </Link>
//             <Button onClick={handlelogout} style={{color: 'black'}} >logout</Button>

//     </div>
//   )
// }

// export default Navbar

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../action/user';
import '../../global.css';

function Navbar() {
  const [tab, setTab] = useState(window.location.pathname);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenDialog(true);
  };

  const confirmLogout = () => {
    setOpenDialog(false);
    navigate('/');
    dispatch(logoutUser());
  };

  const cancelLogout = () => {
    setOpenDialog(false);
  };

  return (
    <div className='navbar'>
      <Link to={'/'} onClick={() => setTab('/')}>
        {tab === '/' ? (
          <HomeIcon fontSize='large' style={{ color: 'black' }} />
        ) : (
          <HomeOutlinedIcon fontSize='large' />
        )}
      </Link>

      <Link to={'/all'} onClick={() => setTab('/all')}>
        <span className='nav-titles'>View offences </span>
      </Link>

      <Link to={'/add'} onClick={() => setTab('/add')}>
        {tab === '/add' ? (
          <AddBoxIcon fontSize='large' style={{ color: 'black' }} />
        ) : (
          <AddBoxOutlinedIcon fontSize='large' />
        )}
      </Link>

      <Button onClick={handleLogout} style={{ color: 'black' }}>
        Logout
      </Button>

      <Dialog open={openDialog} onClose={cancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout}>Cancel</Button>
          <Button onClick={confirmLogout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Navbar;

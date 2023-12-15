import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, List, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../../global.css';

function ViewAll() {
  const [searchid, setSearchid] = useState('');
  const [offData, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/offences/all',
      // url: 'http://localhost:5000/offences/all',
    }).then((response) => {
      const res = response.data;
      setData(res.data);
    });
  }, []);

  const searchHandler = () => {
    axios({
      method: 'GET',
      url: searchid === '' ? '/api/offences/all' : `/api/offences/search/${searchid}`,
      // url: searchid === '' ? 'http://localhost:5000/offences/all' : `http://localhost:5000/offences/search/${searchid}`,
    }).then((response) => {
      const res = response.data;
      if (!res) alert('not found!');
      setData(res.data);
    });
  };

  const removeRow = (repno) => {
    setSelectedRow(repno);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    axios({
      method: 'POST',
      url: `/api/offences/del/${selectedRow}`,
      // url: `http://localhost:5000/offences/del/${selectedRow}`,
    }).then((response) => {
      console.log(response);
      axios({
        method: 'GET',
        url: '/api/offences/all',
        // url: 'http://localhost:5000/offences/all',
      }).then((response) => {
        const res = response.data;
        setData(res.data);
      });
    });

    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setSelectedRow(null);
    setOpenDialog(false);
  };

  return (
    <>
      <div className="searchbar">
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            value={searchid}
            onChange={(e) => setSearchid(e.target.value)}
          />
          <IconButton onClick={searchHandler}>
            <SearchIcon />
          </IconButton>
        </div>
        <List />
      </div>
      <div className="cnt">
        <table border="1" className="offence--tables">
          <tr className="heading">
            <td>Report Number</td>
            <td>Dl number</td>
            <td>Registration Number</td>
            <td>Name</td>
            <td>Offence Type</td>
            <td>Time</td>
            <td>Location</td>
            <td>Fine</td>
            <td>Paid</td>
            <td>Delete</td>
          </tr>

          {offData.map((item) => (
            <tr key={item[0]}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
              <td>{item[5]}</td>
              <td>{item[6]}</td>
              <td>{item[7]}</td>
              <td>{item[8]}</td>
              <td><button onClick={() => removeRow(item[0])}>delete</button></td>
            </tr>
          ))}
        </table>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this row?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ViewAll;

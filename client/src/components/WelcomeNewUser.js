import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import meeple from './meeples.png'
import LibraryList from './LibraryList'
import { useState } from "react";
import Modal from '@mui/material/Modal';
import UserEdit from './UserEdit'



function WelcomeNewUser({bgData, setBGData, libraryForm, setLibraryForm, user, handleChangeUser, handleEditUser}) {
console.log(user)
    const [open, setOpen] = React.useState(false);
    // const [modalData, setModalData] = useState([])
    // const [editUser, setEditUser] = useState(null)
    // console.log(user)
    function handleOpen() {
      setOpen(!open)
    }
    return (

        <>
      <Card sx={{ maxWidth: 1500 }}>
        <CardMedia
          component="img"
          alt="meeple"
          height="300"
          image={meeple}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Welcome {user.name}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
              This is an online library of all boardgames that Flatiron School has available in our communal Board Game Library. Please add any boardgames you would like to share and leave in the library!<br></br>
              Please update when you borrow a game, and bring back all the pieces!!!!<br></br><br></br>
            Username: {user.username}<br></br>
            Favorite Games: {user.favorite}
          </Typography>
        </CardContent>
        <CardActions onClick={handleOpen}>
          <Button size="small" >Edit User</Button>
        </CardActions>
        <Modal
          
          // sx={{ maxWidth: 1000, 
          //   // overflow: 'scroll' 
          // }}
            open={open}
            fullScreen
            // onClose={handleClose}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        ><UserEdit user={user} handleEditUser={handleEditUser} handleOpen={handleOpen}/></Modal>
      </Card>
      <LibraryList bgData={bgData} setBGData={setBGData} libraryForm={libraryForm} setLibraryForm={setLibraryForm}/>
      </>
    );
  }

  export default WelcomeNewUser;
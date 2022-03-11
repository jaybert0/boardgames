import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";





function LibraryForm({ handleAddBG, libraryForm, setLibraryForm, user }) {
  console.log(user.id)
  let navigate = useNavigate();

  const initialState = {
    name: "",
    picture_url: "",
    num_players: "",
    description: "",
    genre: "",
    est_time: "",
    user_id: user.id,
    borrow: false,
  };
  // setLibraryForm(initialState);
  function handleSetLibraryForm(att, input) {
    setLibraryForm({ ...libraryForm, user_id: user.id, [att]: input });
  }
  console.log(libraryForm);
  function submitHandler(e) {
    e.preventDefault();
    fetch("/boardgames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(libraryForm),
    })
      .then((r) => r.json())
      .then((data) => console.log(data))
      .then(  
        handleAddBG(libraryForm),
      setLibraryForm(initialState),
    window.location.reload(),
        navigate("/")
      )
      // .then((newBG) => {
      //   // handleAddBG(newBG);
      //   setLibraryForm(initialState);
      // });
      handleAddBG(libraryForm);
      setLibraryForm(initialState);
    window.location.reload();
  }
  // function submitHandler(e) {
  //   e.preventDefault();
  //   fetch("/boardgames", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(libraryForm),
  //   })
  //     .then((r) => r.json())
  //     .then((data) => console.log(data))
  //     .then((newBG) => {
  //       handleAddBG(newBG);
  //       setLibraryForm(initialState);
  //       // window.location.reload()
  //       navigate("/")
  //       console.log(newBG)
  //     });
  //   // handleAddBG(libraryForm);
  //   // console.log(libraryForm);
    

  // }

  return (
    <Container component="main" maxWidth="m">
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div>

          <TextField
          fullWidth
            required
            id="outlined-required"
            label="Game Name"
            onChange={(e) => handleSetLibraryForm("name", e.target.value)}
            value={libraryForm.name}
          />
          <br></br>
          <TextField
          fullWidth
            id="outlined"
            label="Game Picture URL"
            onChange={(e) =>
              handleSetLibraryForm("picture_url", e.target.value)
            }
            value={libraryForm.picture_url}
          />
          <br></br>
          <TextField
            required
            id="outlined-required"
            label="Number of Players"
            onChange={(e) =>
              handleSetLibraryForm("num_players", e.target.value)
            }
            value={libraryForm.num_players}
          />
          <br></br>
          <TextField
            required
            id="outlined-required"
            label="Estimated Time to Play"
            onChange={(e) =>
              handleSetLibraryForm("est_time", e.target.value)
            }
            value={libraryForm.est_time}
          />
          <br></br>
          <TextField
          fullWidth
            required
            id="outlined-required"
            label="Genre"
            onChange={(e) =>
              handleSetLibraryForm("genre", e.target.value)
            }
            value={libraryForm.genre}
          />
          <br></br>
          <TextField
          fullWidth
            id="outlined"
            label="Description"
            onChange={(e) =>
              handleSetLibraryForm("description", e.target.value)
            }
            value={libraryForm.description}
          />
          <br></br>
          <FormControl required sx = {{m: 1, width: "50ch"}}>
            <InputLabel id="borrowable-label">Borrowable?</InputLabel>
            <Select
              labelId="borrowable=label"
              id="borrowable-select"
              value={libraryForm.borrow}
              label="Borrowable?"
              onChange={(e) => handleSetLibraryForm("borrow", e.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <br></br>
          <Button sx={{m: 1}} type="submit" variant="contained" id="submit">
            Submit New Game
          </Button>

      </div>
    </Box>
    </Container>
  );
}

export default LibraryForm;

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';


function LibraryEditForm({ handleAddBG, user, libraryForm, setLibraryForm }) {
    console.log(user.id);
    console.log(libraryForm)
    let navigate = useNavigate();

  const initialState = {
    name: libraryForm.name,
    picture_url: libraryForm.picture_url,
    num_players: libraryForm.num_players,
    description: libraryForm.summary,
    genre: libraryForm.genre,
    est_time: libraryForm.est_time,
    user_id: user.id,
    borrow: libraryForm.borrow,
  };
  function handleSetLibraryForm(att, input) {
    setLibraryForm({ ...libraryForm, [att]: input });
  }
  function submitHandler(e) {
    e.preventDefault();
    fetch(`/boardgames/${libraryForm.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(libraryForm),
    })
      .then((r) => r.json())
      .then((data) => console.log(data))
      .then(navigate("/"));
      setLibraryForm(initialState);
      handleAddBG(libraryForm);
      window.location.reload()
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div>

          <TextField
            required
            id="outlined-required"
            label="Game Name"
            onChange={(e) => handleSetLibraryForm("name", e.target.value)}

            defaultValue={libraryForm.name}
          />
          <br></br>
          <TextField
            id="outlined"
            label="Game Picture URL"
            onChange={(e) =>
              handleSetLibraryForm("picture_url", e.target.value)
            }

            defaultValue={libraryForm.picture_url}
          />
          <br></br>
          <TextField
            required
            id="outlined-required"
            label="Number of Players"
            onChange={(e) =>
              handleSetLibraryForm("num_players", e.target.value)
            }

            defaultValue={libraryForm.num_players}
          />
          <br></br>
          <TextField
            required
            id="outlined-required"
            label="Estimated Time to Play"
            onChange={(e) =>
              handleSetLibraryForm("est_time", e.target.value)
            }
            defaultValue={libraryForm.est_time}
          />
          <br></br>
          <TextField
            required
            id="outlined-required"
            label="Genre"
            onChange={(e) =>
              handleSetLibraryForm("genre", e.target.value)
            }

            defaultValue={libraryForm.genre}

          />
          <br></br>
          <TextField
            id="outlined"
            label="Description"
            onChange={(e) =>
              handleSetLibraryForm("description", e.target.value)
            }

            defaultValue={libraryForm.summary}
          />
          <br></br>
          <FormControl required fullWidth>
            <InputLabel id="borrowable-label">Borrowable?</InputLabel>
            <Select
              labelId="borrowable=label"
              id="borrowable-select"

              label="Borrowable?"
              onChange={(e) => handleSetLibraryForm("borrow", e.target.value)}
              defaultValue={libraryForm.borrow}

            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <br></br>
          <Button type="submit" variant="contained" id="submit">
            Edit Game
          </Button>

      </div>
    </Box>
  );
}

export default LibraryEditForm;

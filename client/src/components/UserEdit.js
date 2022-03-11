import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router';

function UserEdit({ user, handleEditUser }) {
  console.log(user);
  let navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const initialState = {
    email: "",
    password: "",
    favorite: "",
  };
  const [userEdit, setUserEdit] = useState(initialState);

  function handleEditUserForm(att, input) {
    setUserEdit({ ...user, [att]: input });
  }
  console.log(userEdit);
  function submitHandler(e) {
    e.preventDefault();
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEdit),
    })
      .then((r) => r.json())
    //   .then((data) => console.log(data))
      .then((userEdit) => {
        handleEditUser(userEdit)
        navigate("/")
      })
  }
  return (
    <Box
      component="form"
      sx={style}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div>
        <TextField
          required
          style={{ width: "200px", margin: "5px" }}
          type="password"
          name="password"
          label="Password"
          onChange={(e) => handleEditUserForm("password", e.target.value)}
          defaultValue={user.password}
          //   value={user.password}
        />
        <br></br>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          //   value={user.email}
          defaultValue={user.email}
          name="email"
          label="Email"
          onChange={(e) => handleEditUserForm("email", e.target.value)}
        />
        <br></br>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          // type="text"
          name="favorite"
          label="Favorite Games"
          onChange={(e) => handleEditUserForm("favorite", e.target.value)}
          //   value={user.favorite}
          defaultValue={user.favorite}
        />
        <br></br>
        <Button type="submit" variant="contained" id="submit">
          Edit User
        </Button>
      </div>
    </Box>
  );
}

export default UserEdit;

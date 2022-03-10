import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from 'react-router';


const theme = createTheme();

function SignUp({onLogin, setUser, setIsAuthenticated}) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favorite, setFavorite] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  let navigate = useNavigate();
  function setAuth(val) {setIsAuthenticated(val)}
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   setIsLoading(true);
  //   const user = {
  //     name: name,
  //     username: username,
  //     email: email,
  //     password: password,
  //     favorite: favorite,
  //   };
  //   fetch(`/users`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(user),
  //   })
  //   .then((r) => {
  //     setIsLoading(false);
  //     if (r.ok) {
  //       r.json().then((user) => onLogin(user));
  //     } else {
  //       r.json().then((err) => setErrors(err.errors));
  //     }
  //   });
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      username: username,
      email: email,
      password: password,
      favorite: favorite,
    };
    fetch(`/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json().then(
            navigate("/login")
          ))
      .then((json) => {
        console.log(json);
        if (json.errors) setErrors(Object.entries(json.errors));


      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            If you do not have an account, Sign Up below:
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={name}
                  autoComplete="given-name"
                  onChange={(e) => setName(e.target.value)}
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={username}
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField

                  value={favorite}
                  onChange={(e) => setFavorite(e.target.value)}
                  fullWidth
                  id="favorite"
                  label="Favorite Game(s)"
                  name="favorite"
                  
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;

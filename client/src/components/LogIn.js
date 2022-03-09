import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import SignUp from './SignUp'


const theme = createTheme();


function Login({setIsAuthenticated, setUser}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState([])
    let navigate = useNavigate();

    function onSubmit(e){
        e.preventDefault()
        const user = {
          username: username,
          password, 
      }
       
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => {  
          if(res.ok){
          res.json()
          .then(user=>{
            setUser(user)
            setIsAuthenticated(true)
            navigate("/")
          })
          
        } else {
          res.json()
          .then(json => setErrors(json.error))
        }
      })
    }


    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  value={username} 
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} >
              Log-in
            </Button>
          </Box>
        </Box>
      </Container>
            <SignUp />
    </ThemeProvider>
        
        
        
      //   <> 
      //   <form onSubmit={onSubmit}>
      //   <label>
      //     Username
   
      //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      //   </label>
      //   <label>
      //    Password
    
      //   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      //   </label>
       
      //   <input type="submit" value="Login!" />
      // </form>
      // {/* {errors?errors.map(e => <div>{e}</div>):null} */}
      //   </>
    )
}

export default Login;
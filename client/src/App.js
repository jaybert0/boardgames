import "./App.css";
import { useState, useEffect } from "react";
import Login from './components/LogIn'
import Navigation from './components/Navigation'
import React from "react";
import {
  Routes,
  Route,
  // Link
} from "react-router-dom";
// import Home from './components/Home'
import LibraryList from './components/LibraryList'
import LibraryForm from './components/LibraryForm'
import LibraryEditForm from './components/LibraryEditForm'
import SignUp from "./components/SignUp";
import WelcomeNewUser from './components/WelcomeNewUser'


function App() {
  const initialState = {
    id: "",
    name: "",
    picture_url: "",
    num_players: "",
    description: "",
    genre: "",
    est_time: "",
    user_id: "",
    borrow: false,
  }
  
  // const [userData, setUserData] = useState([]);
  const [bgData, setBGData] = useState([]);
  // Authorization
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [libraryForm, setLibraryForm] = useState(initialState)
  
  console.log(user)
  console.log(bgData)
  
  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          setUser(user);
          setIsAuthenticated(true);
        });
      }
    });
  },[])
  
    useEffect(() => {
    fetch("/boardgames")
      .then((r) => r.json())
      // .then((data)=>console.log(data))
      .then((data) => setBGData(data));
  }, []);

  function handleAddBG(addedBG) {
    setBGData((bgData) => [...bgData, addedBG])
  }

    // if (!user) return <Login error={'please login'} />;

  // useEffect(() => {
  //   fetch("/boardgames")
  //     .then((r) => r.json())
  //     // .then((data)=>console.log(data))
  //     .then((data) => setBGData(data));
  // }, []);
  // console.log("User:");
  // useEffect(() => {
  //   fetch("/users")
  //     .then((r) => r.json())
  //     // .then((data)=>console.log(data))
  //     .then((data) => setUserData(data));
  // }, []);
  // console.log("Boardgame Data:");
  // console.log(bgData);
  // console.log("User:");
  // console.log(userData);
  // console.log(user)
  return (
    <>
    <Navigation user={user} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>
    { (!isAuthenticated)? <Login error={'please login'} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />:

    <Routes>
    <Route path="/login" element={ <Login  error={'please login'} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}></Route>
    <Route path="/library" element={ <LibraryList user={user} bgData={bgData} setBGData={setBGData} libraryForm={libraryForm} setLibraryForm={setLibraryForm}/>}></Route>
    <Route path="/newBG" element={ <LibraryForm user={user} handleAddBG={handleAddBG} libraryForm={libraryForm} setLibraryForm={setLibraryForm}/>}></Route>
    <Route path="/editBG" element={ <LibraryEditForm user={user} handleAddBG={handleAddBG} libraryForm={libraryForm} setLibraryForm={setLibraryForm} />}></Route>
    <Route path="/sign_up" element={<SignUp setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>}></Route>
    <Route path="/" element={<WelcomeNewUser setUser={setUser} user={user} bgData={bgData} setBGData={setBGData} libraryForm={libraryForm} setLibraryForm={setLibraryForm}/>}></Route>

    </Routes>
}
    </>
  );
}

export default App;

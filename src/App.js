import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Login from './components/login';
import Register from './components/registration';
import Dashboard from './components/dashboard';
import Resetpassword from './components/resetpassword';
import Profile from './components/profile';
import React,{ useState } from 'react';

function App() {
  const [show,SetShow]=useState(true)

  return (    
  <Router>
    <div className="App">
    {
 show?
     <nav className="navbar navbar-expand-lg navbar-light fixed-top">

                <div className="container">
                    <Link className="navbar-brand" to={"/login"}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZB0vwzWlrV26NS85EDpAsG7oua8jZN1m72pmN9Q0sMA&s' height={80} width={110} /></Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                                <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/profile"}>Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/resetpassword"}>Change password</Link>
                            </li>
                        </ul>
                    </div>
                </div>
     </nav> :null
 }

      <div className="outer">
        <div className="inner">
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register"  element={<Register/>}  />
            <Route path="/dashboard"  element={<Dashboard/>} />
            <Route path="/profile"  element={<Profile/>} />
            <Route path="/resetpassword"  element={<Resetpassword/>} />
          </Routes>
        </div>
      </div>
    </div></Router>
  );
}

export default App;

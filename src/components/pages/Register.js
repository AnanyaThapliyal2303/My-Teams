import { db, auth } from "../../firebase";
import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import "../css/Register.css"
import {Link} from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

    
  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      alert("Registration Successful!")
      .catch((error) => alert(error.message));
  };
    return (
        
        <div id="register_page">
              <Link to="/login"><Button>Login</Button></Link> 
            <form className="register_form">
           
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit"  onClick={handleRegister}>Register</Button>
          </form>
        </div>
    )
}

export default Register
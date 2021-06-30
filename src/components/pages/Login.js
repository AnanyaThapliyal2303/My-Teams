import { db, auth } from "../../firebase";
import React, { useState, useHistory } from "react";
import { Button, Input } from "@material-ui/core";
import "../css/Login.css"
import {Link} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
      
        e.preventDefault();
        if (email === "" || password === "") {
          alert("All fields are required");
          return;
        }
        try{
       auth.signInWithEmailAndPassword(email, password);
       {/*history.push("/home") */}
        } catch(error) {
         alert(error.message);
        }
    
  
      };
    return (
        <div id="login_page">
           <Link to="/register"><Button>Register</Button></Link> 
            <form className="login_form">
          

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
            <Button type="submit" onClick={handleLogin}>Login</Button>
          </form>
        </div>
    )
}

export default Login
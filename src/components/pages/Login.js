import { Button } from '@material-ui/core';
import React from 'react';
import {auth,provider} from './firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import '../css/Login.css'
import entry from '../img/entry.jpg';

function Login() {
    const [{},dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    }
    return (
        <div className="login" style={{height:"100vh"}}>
            <div className="entry-image-div">
                <img src={entry} id="entry-image" style={{width: "100vw"}}></img>
            </div>
            <div className="login_container">
            <Button type="submit" class="login-with-google-btn" onClick={signIn}>
                Sign in with Google
            </Button>
           </div>
        </div>
    );
}

export default Login
import '../styles/Login.css';
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase.js";


const Login = () => {

    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // check if user is logged in and auto-populate
    useEffect(() => {
        if(auth) {
            auth.onAuthStateChanged(function(user) {
                if(user) {
                    console.log('user logged in');
                    setUsername(user.email)
                }
                else {
                    console.log('user is not logged in');
                }
            })
        }
    }, [])


    const handleChangePass = (event) => {
        const value = event.target.value;
        setPassword(value);
      };
    
    const handleChangeUser = (event) => {
        const value = event.target.value;
        setUsername(value);
    };

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => setUser(userCredential.user))
        .then(() => console.log("SUCCESS"))
        .then(() => navigate('/home'))
        .catch((e) => {
            if(e.code == "auth/invalid-email") {
                console.log("EMAIL WRONG");
                setErrorMessage("Email Invalid")
            }
            if(e.code == 'auth/missing-password') {
                console.log("ENTER A VALID PASSWORD");
                setErrorMessage("Enter a Password")
            }
            if(e.code =='auth/invalid-credential') {
                console.log("USER NOT FOUND");
                setErrorMessage("User not Found.")
            }
            else {
                console.log(e);
            }
        });
    }
    return (
        <>
            <div className='login-body'>
                <div className='login-main'>
                    <div className='login-main-header'>
                        <h1> Login </h1>
                    </div>
                    <div className='login-boxes'>
                        <input value={email} placeholder='email' onChange={handleChangeUser}>
                        </input>
                        <input value={password} type='password' placeholder='password' onChange={handleChangePass}>
                        </input>
                    </div>
                    <div className='login-option'>
                        <button className='login-button' onClick={login}> LOGIN </button>
                    </div>
                    <span className='error-message'> { errorMessage } </span>
                </div>
            </div>
        </>
    )
}

export default Login;
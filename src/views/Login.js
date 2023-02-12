import React from 'react'
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet'
import { Link, Navigate, useHistory, useLocation } from "react-router-dom";
import { app, database, storage } from '../components/firebaseConfig'
import './login.css'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const Login = (props) => {
  let user={};
  const adminUid="N4Ja1j4O6xhNEtiNoBHeAkiVZRi2"
  const auth = getAuth();
  const [data, setdata] = useState({});
  const [user1, setuser1] = useState({});
  let hist = useHistory();
  let isprov=false;
  const [opacity, setOpacity] = useState(0);
  const [translateX, setTranslateX] = useState(500);
  const [translateY, setTranslateY] = useState(200);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setTranslateX(0);
      setTranslateY(0);
    }, 1000);
  }, []);

  const handleSignup = () => {
    hist.push('/signup');
  }

  const handleDrop=()=>{
    if(isprov==true){
      isprov=false
    }
    else{
      isprov=true
    }
  }

  const handleLogin = async() => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        user = userCredential.user;
        console.log(typeof user.uid);
        nextpageDecide();
        // isprov && hist.push('/provider');
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const nextpageDecide=()=>{
    let selectelement=document.querySelector('#choose')
    setuser1(user)
    // console.log(user1.uid);
    if(user.uid==adminUid){
      hist.push('/adminp')
    }
    else if (selectelement.value==='provider'){
      hist.push("/provider")
    }
    else
    {hist.push("/customer")}
  }

  const navtoHome=()=>{
    hist.push("/")
  }

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata({ ...data, ...newInput });
  }
  return (
    <div className="login-container">
      <Helmet>
        <title>ZeroWaste Kitchen</title>
        <meta property="og:title" content="ZeroWaste Kitchen" />
      </Helmet>
      <div className="login-navbar navbar-container">
        <div className="max-width">
          <div className="login-logo">
            <img
              alt="image"
              src="/playground_assets/group%202.svg"
              className="login-image"
            />
            <span className="brandName">
              <span className="login-text01">ZeroWaste</span>
              <span>Kitchen</span>
            </span>
          </div>
          <div className="login-links">
            <button className="mx-3 button button-primary" onClick={navtoHome}>Home</button>
            <button className="button button-primary" onClick={handleSignup}>Get started</button>
          </div>
          <div className="login-burger-menu navbar-burger-menu">
            <svg viewBox="0 0 1024 1024" className="login-icon">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="login-hero hero-container section-container">
        <div className="login-max-width1 max-width">
          <div className="login-container1">
            <img
              alt="image"
              src="/playground_assets/gallery-7-500w.jpg"
              className="login-image1"
            />
          </div>
          <div className="login-container2" style={{ opacity, transition: 'opacity 0.3s ease-in-out' }}>
            <span className="login-text06">WELCOME !</span>
            <div className="login-container3" style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'0.2s'}}>
              <span className="login-text07">Login as - </span>
              <select className="login-select" id='choose' onChange={handleDrop}>
              <option value="customer" defaultValue='customer' >
                  Customer
                </option>
                <option value="provider">Provider</option>
              </select>
            </div>
            <input
              type="email"
              name='email'
              placeholder="Enter Email ID"
              className="login-textinput input"
              onChange={(event) => handleInput(event)}
              style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'0.4s'}}
              
            />
            <input
              type="password"
              name='password'
              placeholder="Enter Password"
              className="login-textinput1 input"
              onChange={(event) => handleInput(event)}
              style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'0.6s'}}
            />
            <button className="my-3 button button-transparent" onClick={handleLogin}  style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'0.8s'}}>
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

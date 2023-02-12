import React from 'react'
import { useState,useEffect } from "react";
import { Helmet } from 'react-helmet'
import { Link, Navigate, useHistory , useLocation } from "react-router-dom";
import { app, database, storage } from '../components/firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut,updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";

import './Signup.css'

const Signup = (props) => {
  const collectionRef = collection(database, 'user')
  const auth = getAuth();
  const [data, setdata] = useState({});
  let hist=useHistory();
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
 const handleLogin=()=>{
    hist.push ('/login');
  }

  const navtoHome=()=>{
    hist.push("/")
  }

  const handleSignup= async()=>{
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user,{
        displayName: data.name
      })
      console.log(user);
      nextpageDecide(user);
     
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata({ ...data, ...newInput });
  }

  const handleDrop=()=>{
    if(isprov==true){
      isprov=false
    }
    else{
      isprov=true
    }
  }

  const nextpageDecide=(user)=>{
    let selectelement=document.querySelector('#choose')
    if (selectelement.value==='provider'){
      addDoc(collectionRef, {
        uid: user.uid,
        name: data.name,
        email: user.email,
        isprovider:true,
        isverified:false
      })
        .then(() => {
          hist.push("/provider")
        })
        .catch((err) => {
          console.log(err.message);
        })
      
    }
    else
    {
      addDoc(collectionRef, {
        uid: user.uid,
        name: data.name,
        email: user.email,
        isprovider:false
      })
        .then(() => {
          alert("data added");
          hist.push("/customer")
        })
        .catch((err) => {
          console.log(err.message);
        })
      
    }
  }

  return (
    <div className="signup-container" style={{"height":"100vh"}}>
      <Helmet>
        <title>ZeroWaste Kitchen</title>
        <meta property="og:title" content="ZeroWaste Kitchen" />
      </Helmet>
      <div className="signup-navbar navbar-container">
        <div className="max-width">
          <div className="signup-logo">
            <img
              alt="image"
              src="/playground_assets/group%202.svg"
              className="signup-image"
            />
            <span className="brandName">
              <span className="signup-text01">the</span>
              <span>food</span>
            </span>
          </div>
          <div className="signup-links">
            <span className="signup-text03 navbarLink" onClick={navtoHome}>Home</span>
            <span className="signup-text04 navbarLink">Features</span>
            <span className="signup-text05 navbarLink">Pricing</span>
            <button className="button button-primary" onClick={handleLogin}>Log In</button>
          </div>
          <div className="signup-burger-menu navbar-burger-menu">
            <svg viewBox="0 0 1024 1024" className="signup-icon">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="signup-hero hero-container section-container">
        <div className="signup-max-width1 max-width">
          <div className="signup-container1">
            <img
              alt="image"
              src="/playground_assets/gallery-7-500w.jpg"
              className="signup-image1"
            />
          </div>
          <div className="signup-container2" style={{ opacity, transition: 'opacity 0.3s ease-in-out' }}>
            <span className="signup-text06">WELCOME !</span>
            <div className="signup-container3" style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'0.2s'}}>
              <span className="signup-text07">Sign Up as -</span>
              <select className="signup-select" id='choose' onChange={handleDrop}>
                <option value="customer" defaultValue='customer'>
                  Customer
                </option>
                <option value="provider">Provider</option>
              </select>
            </div>
            <input
              type="name"
              name='name'
              placeholder="Enter Your Name"
              className="signup-textinput input"
              onChange={(event) => handleInput(event)}
              style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'0.4s'}}
            />
            <input
              type="email"
              name='email'
              placeholder="Enter Email ID"
              className="signup-textinput1 input"
              onChange={(event) => handleInput(event)}
              style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'0.6s'}}
            />
            <input
              type="password"
              name='password'
              placeholder="Enter Password"
              className="signup-textinput1 input"
              onChange={(event) => handleInput(event)}
              style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'0.8s'}}
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              className="signup-textinput2 input"
              style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'1s'}}
            />
            <button className="my-2 button button-transparent" onClick={handleSignup} style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'1.2s'}}>
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

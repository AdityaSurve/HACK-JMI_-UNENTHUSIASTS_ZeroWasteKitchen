import zIndex from '@mui/material/styles/zIndex';
import React from 'react'
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet'
import { Link, Navigate, useHistory , useLocation } from "react-router-dom";

import './home.css'
const Home = (props) => {
  let hist=useHistory();
  const [opacity, setOpacity] = useState(0);
  const [translateX, setTranslateX] = useState(500);
  const [translateY, setTranslateY] = useState(-600);
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
  const handleSignup=()=>{
    hist.push ('/signup');
  }

  return (
    <div className="home1-container">
      <Helmet>
        <title>ZeroWaste Kitchen</title>
        <meta property="og:title" content="ZeroWaste Kitchen" />
      </Helmet>
      <div className="home1-navbar navbar-container">
        <div className="max-width">
          <div className="home1-logo">
            <img
              alt="image"
              src="/playground_assets/group%202.svg"
              className="home1-image"
            />
            <span className="brandName">
              <span className="home1-text1">ZeroWaste </span>
              <span>Kitchen</span>
            </span>
          </div>
          <div className="home1-links">
            <button className="button-secondary button"  onClick={handleLogin}>Log In</button>
            <button className="button button-primary" onClick={handleSignup}>Get started</button>
          </div>
        </div>
      </div>
      <div className="home1-hero hero-container section-container" style={{"height":"95vh"}}>
        <div className="home1-max-width1 max-width">
          <div className="home1-content">
            <span className="home1-subtitle beforeHeading">By the Unenthusiasts</span>
            <h1 className="home1-title" style={{ opacity, transition: 'opacity 0.3s ease-in-out' }}>
              <span>Making every bite count</span>
              <br></br>
              <span>Reducing food waste</span>
            </h1>
            <span className="home1-description" style={{ opacity, transition: 'opacity 0.3s ease-in-out',transitionDelay:'0.5s' }}>
              To make a positive impact on our communities and the environment. Start making a difference today!
            </span>
            <div className="home1-container1 mx-5">
              <button className="button button-gradient mx-5" onClick={handleSignup}>Get started</button>
              <button className="button button-transparent" onClick={handleLogin}>Log in</button>
            </div>
          </div>
          <div className="home1-image1 ">
            <img
              alt="image"
              src="/playground_assets/union-400h.png"
              className="home1-graphic-top"
              style={{ transform: `translateX(${translateX}px)`, transition: 'transform 1s ease-in-out', zIndex:1}}
            />
            <img
              alt="image"
              src="/playground_assets/group%2018-300w.png"
              className="home1-image2"
              style={{ transform: `translateX(${translateX}px)`, transition: 'transform 1s ease-in-out', zIndex:1,transitionDelay:'0.3s'}}
            />
            <img
              src="/playground_assets/gallery-7-600h.jpg"
              alt="image"
              className="home1-image3"
              style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out'}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

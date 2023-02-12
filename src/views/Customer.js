import React from 'react'
import { useState, useEffect } from "react";
import { Link, Navigate, useHistory, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet'
import {  getAuth,signOut } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";
import { app, database, storage } from '../components/firebaseConfig'
import Card from '../components/card2'
import './Customer.css'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

const Customer = (props) => {
  let nameQuery=[];
  const [data, setdata] = useState({});
  let hist = useHistory();
  const auth = getAuth();
  const foodRef = collection(database, 'food')
  const [food, setfood] = useState([])
  const user = auth.currentUser;
  const [tobeadd, settobeadd] = useState([])
  const handleLogout = () => {
    signOut(auth);
    hist.push("/");
  }
  const [opacity, setOpacity] = useState(0);
  const [translateX, setTranslateX] = useState(500);
  const [translateY, setTranslateY] = useState(-700);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setTranslateX(0);
      setTranslateY(0);
    }, 1000);
  }, []);

  const gotoCart = () => {
    hist.push("/cart");
  }


  const addCart= async(nameoffood)=>{
    nameQuery=query(foodRef,where("desc","==",nameoffood))
    onSnapshot(nameQuery,(data)=>{
      settobeadd(data.docs)
    })
    console.log(tobeadd[0]);
    await updateDoc(tobeadd[0].ref,{
      cname:user.displayName,
      cid:user.uid
    })
      .then(() => {
        console.log("added to cart");
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  const handleSearch=()=>{
    let selectelement=document.querySelector('#choose');
    console.log(selectelement.value);
    if(selectelement.value==='food'){
      handleFoodQuery();
    }
    else if(selectelement.value==='provider'){
      handleProviderQuery();
    }
    else{
      handleLocationQuery();
    }
  }

  const handleFoodQuery=()=>{
    nameQuery=query(foodRef,where("desc","==",data.food))
    onSnapshot(nameQuery,(data)=>{
      setfood(data.docs)
    })
  }

  const handleProviderQuery=()=>{
    nameQuery=query(foodRef,where("uname","==",data.provider))
    onSnapshot(nameQuery,(data)=>{
      setfood(data.docs)
    })
  }

  const handleLocationQuery=()=>{
    nameQuery=query(foodRef,where("loc","==",data.location))
    onSnapshot(nameQuery,(data)=>{
      setfood(data.docs)
    })
  }


  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setdata({ ...data, ...newInput });
  }

  return (
    <div className="customer-container">
      <Helmet>
        <title>ZeroWaste Kitchen</title>
        <meta property="og:title" content="ZeroWaste Kitchen" />
      </Helmet>
      <div className="customer-navbar navbar-container">
        <div className="max-width">
          <div className="customer-logo">
            <img
              alt="image"
              src="/playground_assets/group%202.svg"
              className="customer-image"
            />
            <span className="brandName">
              <span className="customer-text1">The</span>
              <span>food</span>
            </span>
          </div>
          <div className="customer-links">
            <span className="customer-text3 navbarLink">{user.email}</span>
            <svg viewBox="0 0 1024 1024" className="customer-icon" onClick={gotoCart}>
              <path d="M726 768q34 0 59 26t25 60-25 59-59 25-60-25-26-59 26-60 60-26zM42 86h140l40 84h632q18 0 30 13t12 31q0 2-6 20l-152 276q-24 44-74 44h-318l-38 70-2 6q0 10 10 10h494v86h-512q-34 0-59-26t-25-60q0-20 10-40l58-106-154-324h-86v-84zM298 768q34 0 60 26t26 60-26 59-60 25-59-25-25-59 25-60 59-26z"></path>
            </svg>
            <button className="button-secondary button" onClick={handleLogout}>Log Out</button>
          </div>
          <div className="customer-burger-menu navbar-burger-menu">
            <svg viewBox="0 0 1024 1024" className="customer-icon2">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="hero-container section-container">
        <div className="customer-max-width1 max-width">
          <div className="customer-content">
            <h1 className="customer-title" style={{ opacity, transition: 'opacity 0.3s ease-in-out' }}>WELCOME {user.displayName}</h1>
            <span className="customer-description"style={{ opacity, transition: 'opacity 0.3s ease-in-out',transitionDelay:'0.3s'}}>
            Welcome to our food haven! Browse through our extensive selection of high-quality ingredients and find the perfect addition to your kitchen. Happy shopping!
            </span>
          </div>
          <div className="customer-image1">
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDExfHxmb29kfGVufDB8fHx8MTY3NjE3Njk2NQ&amp;ixlib=rb-4.0.3&amp;w=900"
              className="customer-image2"
              style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.5s ease-in-out',transitionDelay:'0.4s'}}
            
            />
          </div>
        </div>
      </div>
      <div className="customer-section section-container">
        <div className="customer-max-width2 max-width">
          <div className="customer-content1">
            <h1 className="customer-text4">ORDER FOOD</h1>
            <select className="login-select" id='choose' >
              <option value="food" defaultValue='food' >Food</option>
              <option value="provider">Provider</option>
              <option value="location">Location</option>
              </select>
            <div className="customer-container01">
              <div className="customer-container02">
                <span>Enter location:</span>
              </div>
              <div className="customer-container03">
                <textarea className="customer-textarea textarea"  onChange={(event) => handleInput(event)} name='location'></textarea>
              </div>
            </div>
            <div className="customer-container04">
              <div className="customer-container05">
                <span>Enter provider:</span>
              </div>
              <div className="customer-container06">
                <textarea className="customer-textarea1 textarea"  onChange={(event) => handleInput(event)} name='provider'></textarea>
              </div>
            </div>
            <div className="customer-container07">
              <div className="customer-container08">
                <span>Enter Food Item</span>
              </div>
              <div className="customer-container09">
                <textarea className="customer-textarea2 textarea"  onChange={(event) => handleInput(event)} name='food'></textarea>
              </div>
            </div>
            <div className="customer-container10">
              <button className="button-secondary button" onClick={handleSearch} style={{margin:'2vw'}}>
                Search
              </button>
            </div>
          </div>
          <div className="customer-container11">
            {/* <Card rootClassName="card-root-class-name3"></Card> */}
            <div className='container'>
            <ScrollMenu>
            {
            food.map((note) => {
                let noted=note.data();
                return <Card rootClassName="card-root-class-name" note={noted} addCart={addCart}/>;
                
              })}
            </ScrollMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customer

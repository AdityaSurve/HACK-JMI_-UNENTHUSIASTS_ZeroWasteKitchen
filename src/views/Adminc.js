import React from 'react'
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, Navigate, useHistory, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where} from "firebase/firestore";
import { app, database, storage } from '../components/firebaseConfig'
import Card from '../components/card'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
const collectionRef = collection(database, 'user')
import './Adminc.css'

const Adminc = (props) => {
  const [provdetails, setprovdetails] = useState({
    email:"prov email",
    name:"prov name",
    uid:"prov id"
  })
  let hist = useHistory();
  const auth = getAuth();
  const user = auth.currentUser;
  const [data, setdata] = useState({});
  let nameQuery=[];
  const [prov, setprov] = useState([])

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setdata({ ...data, ...newInput });
  }

  const handleLogout = () => {
    signOut(auth);
    hist.push("/");
  }

  const handleProv=()=>{
    hist.push("/adminp")
  }

  const handleGetprovdetails=()=>{
    console.log(data.nameofprov==user.displayName);
    nameQuery=query(collectionRef,where("name","==",data.nameofprov))
    getData();
  }
  
  const getData = () => {
    onSnapshot(nameQuery,(data)=>{
      // console.log(data.docs.map((item) => {
      //        return { ...item.data()};
      // }));
      setprov(data.docs)
      prov.map((note)=>{
        // noted=note.data();
        setprovdetails(note.data())
      })
    })
  }

  return (
    <div className="home-container">
      <Helmet>
        <title>ZeroWaste Kitchen</title>
        <meta property="og:title" content="ZeroWaste Kitchen" />
      </Helmet>
      <div className="navbar-container">
        <div className="max-width">
          <div className="home-logo">
            <img
              alt="image"
              src="/playground_assets/group%202.svg"
              className="home-image"
            />
            <span className="brandName">
              <span className="home-text01">ZeroWaste</span>
              <span>Kitchen</span>
            </span>
          </div>
          <div className="home-links">
            <span className="home-text03">{user.email}</span>
            <button className="button-secondary button" onClick={handleProv}>Provider details</button>
            <button className="button-secondary button" onClick={handleLogout}>Log Out</button>
          </div>
          <div className="home-burger-menu navbar-burger-menu">
            <svg viewBox="0 0 1024 1024" className="home-icon">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="hero-container section-container">
        <h1 className="home-title">View Customer Details</h1>
        <div className="home-max-width1 max-width">
          <div className="home-container1">
            <div className="home-content">
              <div className="home-container2" style={{"height":"310px"}}>
                <span className="home-text04" style={{"color":"white","padding-top":"18vh"}}>ENTER CUSTOMER NAME</span>
                <textarea className="home-textarea textarea" name='nameofprov' onChange={(event) => handleInput(event)} ></textarea>
              </div>
              <div style={{"padding-left":"10vw","padding-bottom":"20vh"}}>
              <button className="home-button1 button button-gradient mx-5" onClick={handleGetprovdetails} >
                Get details
              </button>
              </div>
            </div>
          </div>
          <div className="home-feature-card">
            <h2 className="home-text05" style={{"color":"white"}}>{provdetails.name}</h2>
            <span className="home-text12">
              <span>{provdetails.uid}</span>
              <br></br>
            </span>
            <span className="home-text12">
              <span>{provdetails.email}</span>
              <br></br>
            </span>
            <span className="home-text13">VIEW MORE</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminc

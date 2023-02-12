import React from 'react'
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Helmet } from 'react-helmet'
import { Link, Navigate, useHistory, useLocation } from "react-router-dom";
import './Adminp.css'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where} from "firebase/firestore";
import { app, database, storage } from '../components/firebaseConfig'
import Card from '../components/card'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

const Adminp = (props) => {
  const [prov, setprov] = useState([])
  const [unprov, setunprov] = useState([])
  const [food, setfood] = useState([])
  let hist = useHistory();
  const auth = getAuth();
  const user = auth.currentUser;
  const collectionRef = collection(database, 'user')
  const collection1Ref = collection(database, 'food')
  const collection2Ref = collection(database, 'user')
  const [data, setdata] = useState({});
  let nameQuery=[];
  let noted={};
  let count=0;
  const [provdetails, setprovdetails] = useState({
    email:"prov email",
    name:"prov name",
    uid:"prov id"
  })
  const [unprovdetails, setunprovdetails] = useState([{
    email:"UNprov email",
    name:"UNprov name",
    uid:"UNprov id",
    isverified:true
  }])

  const getFood = () => {
    onSnapshot(collection1Ref, (foodlist) => {
      // console.log(foodlist.docs.map((item) => {
      //   return { ...item.data()};
      // }));
      console.log(foodlist.docs);
      setfood(foodlist.docs)
    })
  }

  const handleLogout = () => {
    signOut(auth);
    hist.push("/");
  }

  const handleCust=()=>{
    hist.push("/adminc")
  }

  const handleGetprovdetails=()=>{
    console.log(data.nameofprov==user.displayName);
    nameQuery=query(collectionRef,where("name","==",data.nameofprov))
    getData();
  }
  

  const fetchunverifiedProviders=()=>{
    onSnapshot(collection2Ref,(data)=>{
      // console.log(data.docs.map((item) => {
      //        return { ...item.data()};
      // }));
      setunprov(data.docs)
      unprov.map((note)=>{
        // noted=note.data();s
        if(note.data().isprovider){
        unprovdetails.push(note.data())}
      })
    })
    console.log(unprovdetails);
    setunprovdetails(unprovdetails);
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
      console.log(noted.name);
    })
    getFood();
  }
  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setdata({ ...data, ...newInput });
  }

  const handleVerify=()=>{
      unprovdetails[unprovdetails.length-1].isverified=true;
      count++;
      unprovdetails.pop();
  }

  const handleDismiss=()=>{
    unprovdetails.pop();
  }

  return (
    <div className="adminp-container">
      <Helmet>
        <title>ZeroWaste Kitchen</title>
        <meta property="og:title" content="ZeroWaste Kitchen" />
      </Helmet>
      <div className="navbar-container">
        <div className="max-width">
          <div className="adminp-logo">
            <img
              alt="image"
              src="/playground_assets/group%202.svg"
              className="adminp-image"
            />
            <span className="brandName">
              <span className="adminp-text01">ZeroWaste</span>
              <span>Kitchen</span>
            </span>
          </div>
          <div className="adminp-links">
            <span className="adminp-text03">{user.email}</span>
            <button className="button-secondary button" onClick={handleCust}>Customer details</button>
            <button className="button-secondary button" onClick={handleLogout}>Log Out</button>
            
          </div>
          <div className="adminp-burger-menu navbar-burger-menu">
            <svg viewBox="0 0 1024 1024" className="adminp-icon">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="hero-container section-container" style={{"height":"150vh"}}>
        <h1 className="adminp-title" style={{"padding-left":"35vw"}}>View Provider Details</h1>
        <div className="adminp-max-width1 max-width">
          <div className="adminp-container1">
            <div className="adminp-content">
              <div className="adminp-container2" >
                <span className="adminp-text04 my-5" style={{"color":"white"}}>ENTER PROVIDER NAME</span>
                <textarea className="adminp-textarea textarea" style={{"height":"20vh"}} name='nameofprov' onChange={(event) => handleInput(event)} />
              </div>
              <button className="adminp-button1 button button-gradient my-5" onClick={handleGetprovdetails}>
                Get details
              </button>
            </div>
          </div>
          <div className="adminp-feature-card">
            <h2 className="adminp-text05" style={{"color":"white"}}>
              {
                // noted.name?noted.name:"Provider Name"
                provdetails.name
              }
              </h2>
            <span className="adminp-text07 my-2">{provdetails.id}</span>
            <span className="adminp-text07">{provdetails.name}</span>
            <span className="adminp-text08">{provdetails.email}</span>
            <span className="adminp-text08">VIEW MoORE</span>
          </div>
        </div>
        <h1 className="adminp-text14" style={{"color":"white","padding-top":"20vh"}}>LIST OF FOOD ITEMS</h1>
          <div className='col-md-12'>

            {/* <Card rootClassName="card-root-class-name"></Card>
            <Card rootClassName="card-root-class-name2" dish1="Dish 2"></Card>
            <Card rootClassName="card-root-class-name1" dish1="Dish 3"></Card> */}
            
              
            <ScrollMenu style={{"width":"100vw"}}>
            {
            food.map((note) => {
                let noted=note.data();
                if(noted.uid===provdetails.uid){
                return <Card rootClassName="card-root-class-name" note={noted}/>;
                }
              })}
            </ScrollMenu>

          </div>
      </div>
      <div className="adminp-hero1 hero-container section-container">
        <h1 className="adminp-title" style={{"color":"#105749"}}>Verify Provider Details</h1>
        <div className="adminp-max-width2 max-width">
          <div className="adminp-container3">
            <div className="adminp-content1">
              <div className="adminp-container4"  style={{"padding-right":"20vw"}}>
                <span className="adminp-text10 ">
                  <span >VIEW PROVIDER REQUESTS</span>
                  <br></br>
                </span>
                <select>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
                <span className="adminp-text13">
                  <span>OR SEARCH BY PROVIDER NAME</span>
                  <br></br>
                </span>
                <textarea className="adminp-textarea1 textarea"></textarea>
              </div>
              <div>
              <button className="adminp-button2 button button-gradient" onClick={fetchunverifiedProviders}>
                Get Provider
              </button>
              </div>
            </div>
          </div>
          <div className="adminp-container5"  style={{"padding-left":"10vw"}}>
            <div className="adminp-feature-card">
              <h2 className="adminp-text16">{unprovdetails[unprovdetails.length-1].name}</h2>
              <span className="adminp-text20">{unprovdetails[unprovdetails.length-1].email}</span>
              <span className="adminp-text20">{unprovdetails[unprovdetails.length-1].uid}</span>
              <span className="adminp-text20">VIEW MORE</span>
            </div>
            <div className="adminp-container6">
              <button className="adminp-button3 button button-gradient" onClick={handleDismiss}>
                DISMISS ❌
              </button>
              <button className="adminp-button4 button button-gradient" onClick={handleVerify}>
                VERIFY ✅
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminp

import React from 'react'
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet'
import { Link, Navigate, useHistory, useLocation } from "react-router-dom";
import Card from '../components/card'
import './Provider.css'
import { getAuth, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";
import { app, database, storage } from '../components/firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { async } from '@firebase/util';


const Provider = (props) => {
  const collectionRef = collection(database, 'food')
  const foodRef = collection(database, 'food')
  const [data, setdata] = useState({});
  const [food, setfood] = useState([])
  const [tobedel, settobedel] = useState([])
  const [tobeupd, settobeupd] = useState([])
  const auth = getAuth();
  const user = auth.currentUser;
  let hist = useHistory();
  let nameQuery=[];
  const handleLogout = () => {
    signOut(auth);
    hist.push("/");
  }

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata({ ...data, ...newInput });
  }

  useEffect(() => {
    // for realtime updates
    getFood();
  }, [])

  const getFood = () => {
    onSnapshot(collectionRef, (foodlist) => {
      // console.log(foodlist.docs.map((item) => {
      //   return { ...item.data()};
      // }));
      setfood(foodlist.docs);
    })
    console.log(food);
  }

  const handleAddfood = () => {
    addDoc(collectionRef, {
      desc: data.desc,
      expiry: data.expiry,
      age: data.age,
      quantity: data.quantity,
      loc:data.loc,
      uid: user.uid,
      uname:user.displayName,
      cost:data.cost
    })
      .then((res) => {
        alert("data added");
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  const deleteFood = async(nameoffood) => {
    // const doctoupdate = doc(database, 'food', foodid)
    // deleteDoc(doctoupdate)
    //   .then(() => {
    //     console.log("deleted");
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   })
    nameQuery=query(foodRef,where("desc","==",nameoffood))
    onSnapshot(nameQuery,(data)=>{
      settobedel(data.docs)
    })
    console.log(tobedel[0]);
    await deleteDoc(tobedel[0].ref)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  const editFood= async(nameoffood)=>{
    nameQuery=query(foodRef,where("desc","==",nameoffood))
    onSnapshot(nameQuery,(data)=>{
      settobeupd(data.docs)
    })
    console.log(tobeupd[0]);
    await updateDoc(tobeupd[0].ref,{
      desc: data.desc,
      expiry: data.expiry,
      age: data.age,
      quantity: data.quantity,
      loc:data.loc,
      cost:data.cost
    })
      .then(() => {
        console.log("updated");
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  return (
    <div className="provider-container">
      <Helmet>
        <title>ZeroWaste Kitchen</title>
        <meta property="og:title" content="ZeroWaste Kitchen" />
      </Helmet>
      <div className="navbar-container">
        <div className="max-width">
          <div className="provider-logo">
            <img
              alt="image"
              src="/playground_assets/group%202.svg"
              className="provider-image"
            />
            <span className="brandName">
              <span className="provider-text01">ZeroWaste</span>
              <span>Kitchen</span>
            </span>
          </div>
          <div className="provider-links">
            <span className="provider-text03">{user.email ? user.email : ""}</span>
            <button className="provider-button button-secondary button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
          <div className="provider-burger-menu navbar-burger-menu">
            <svg viewBox="0 0 1024 1024" className="provider-icon">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="provider-hero hero-container section-container">
        <div className="provider-max-width1 max-width">
          <img
            alt="image"
            src="/playground_assets/gallery-11-500h.jpg"
            className="provider-image1"
          />
          <div className="provider-container01">
            <div className="provider-content">
              <h1 className="provider-title">Welcome {user.displayName}</h1>
            </div>
            <span className="provider-text04">
              <span>
                The greatest gift you can give someone is a plate of food and a
                smile.
              </span>
              <br></br>
              <span>
                Food is the ingredient that binds us together.Eating together
                is the most basic and profound aspect of being human
              </span>
              <br></br>
            </span>
          </div>
        </div>
      </div>
      <div className="section-container">
        <div className="provider-max-width2 max-width">
          <div className="provider-image2">
            <img
              alt="image"
              src="/playground_assets/gallery-12-600h.jpg"
              className="provider-image3"
            />
            <button className="provider-button1 button-secondary button bg-transparent " onClick={handleAddfood} style={{"margin-left":"20vw"}}>
                ADD
              </button>
          </div>
          <div className="provider-content1">
            <h1 className="provider-text09" style={{"color":"#105749"}}>ADD NEW FOOD ITEMS HERE</h1>
            <div className="provider-container02">
              <div className="provider-container03">
                <div className="provider-container04 my-4">
                  <span>Food Type and Description</span>
                </div>
                <div className="provider-container05 my-4">
                  <span>Food Expiry Date</span>
                </div>
                <div className="provider-container06 my-4">
                  <span>Age of Food</span>
                </div>
                <div className="provider-container07 my-4" style={{"padding-top":"1vh"}}>
                  <span>Quantity</span>
                </div>
                <div className="provider-container07 my-4" style={{"padding-top":"1vh"}}>
                  <span>Location</span>
                </div>
                <div className="provider-container07 my-4" style={{"padding-top":"1vh"}}>
                  <span>Cost</span>
                </div>
              </div>
              <div className="my-2 provider-container08">
                <div className="provider-container09">
                  <textarea className="provider-textarea textarea" onChange={(event) => handleInput(event)} name="desc" style={{"color":"black"}}></textarea>
                </div>
                <div className="my-2 provider-container10">
                  <textarea className="provider-textarea1 textarea" onChange={(event) => handleInput(event)} name="expiry" style={{"color":"black"}}></textarea>
                </div>
                <div className="my-2 provider-container11">
                  <textarea className="provider-textarea2 textarea" onChange={(event) => handleInput(event)} name='age' style={{"color":"black"}}></textarea>
                </div>
                <div className="my-2 provider-container12">
                  <textarea className="provider-textarea3 textarea" onChange={(event) => handleInput(event)} name='quantity' style={{"color":"black"}}></textarea>
                </div>
                <div className="my-2 provider-container11">
                  <textarea className="provider-textarea3 textarea" onChange={(event) => handleInput(event)} name='loc' style={{"color":"black"}}></textarea>
                </div>
                <div className="my-2 provider-container12">
                  <textarea className="provider-textarea3 textarea" onChange={(event) => handleInput(event)} name='cost' style={{"color":"black"}}></textarea>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
      <div className="section-container">
        <div className="provider-max-width3 max-width">
          <h1 className="provider-text14">LIST OF FOOD ITEMS</h1>
          <div className='col-md-12'>

            {/* <Card rootClassName="card-root-class-name"></Card>
            <Card rootClassName="card-root-class-name2" dish1="Dish 2"></Card>
            <Card rootClassName="card-root-class-name1" dish1="Dish 3"></Card> */}
            
              
            <ScrollMenu >
            {
            food.map((note) => {
                let noted=note.data();
                if(noted.uid===user.uid){

                return <Card rootClassName="card-root-class-name" note={noted} deleteFood={deleteFood} editFood={editFood}/>;
                }
              })}
            </ScrollMenu>

          </div>
        </div>
      </div>
      <footer className="provider-footer">
        <div className="provider-links-container">
          <div className="provider-container14">
            <div className="footer-column">
              <span className="provider-text15">Team</span>
              <span className="provider-text16">Member 1</span>
              <span className="provider-text17">Member 2</span>
              <span className="provider-text18">Member 3</span>
              <span>Member 4</span>
            </div>
            <div className="footer-column">
              <span className="provider-text20">Contact Us</span>
              <span className="provider-text21">abcd</span>
              <span className="provider-text22">xyz</span>
              <span className="provider-text23">1234</span>
              <span>5678</span>
            </div>
            <div className="footer-column">
              <span className="provider-text25">Social Media</span>
              <span className="provider-text26">Instagram</span>
              <span className="provider-text27">Facebook</span>
              <span className="provider-text28">Twitter</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Provider

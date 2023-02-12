import React from 'react'
import { useState, useEffect } from "react";
import { Link, Navigate, useHistory, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";
import { app, database, storage } from '../components/firebaseConfig'
import {  getAuth,signOut } from "firebase/auth";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import './cart.css'
import Card from '../components/card'

const Cart = (props) => {
  let cost=0;
  const collectionRef = collection(database, 'food')
  let hist = useHistory();
  const auth = getAuth();
  const user = auth.currentUser;
  const [food, setfood] = useState([])

  const handleLogout = () => {
    signOut(auth);
    hist.push("/");
  }
  const handleCust = () => {
    hist.push("/customer");
  }

  useEffect(() => {
    getFood();
  }, [])
  
  const getFood = () => {
    onSnapshot(collectionRef, (foodlist) => {
      setfood(foodlist.docs);
    })
  }

  return (
    <div className="cart-container">
      <Helmet>
        <title>customerCart</title>
        <meta property="og:title" content="customerCart" />
      </Helmet>
      <div className="cart-navbar navbar-container">
        <div className="max-width">
          <div className="cart-logo">
            <img
              alt="image"
              src="/playground_assets/group%202.svg"
              className="cart-image"
            />
            <span className="brandName">
              <span className="cart-text01">The</span>
              <span> food</span>
            </span>
          </div>
          <div className="cart-links">
            <span className="cart-text03 navbarLink">{user.email}</span>
            <button className="button-secondary button" onClick={handleCust}>Customer dashboard</button>
            <button className="button-secondary button" onClick={handleLogout}>Log Out</button>
          </div>
          <div className="cart-burger-menu navbar-burger-menu">
            <svg viewBox="0 0 1024 1024" className="cart-icon">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="hero-container section-container">
        <div className="cart-max-width1 max-width">
          <h1 className="cart-title">SHOPPING CART  🛒</h1>
          <div className="cart-info">
            {/* <div className="cart-container1">
              <span className="cart-text04">Dish Name</span>
              <span className="cart-text05">Provider</span>
              <span className="cart-text06">Dish Type</span>
              <span className="cart-text07">Dish Expiry</span>
              <span className="cart-text08">Dish Age</span>
              <span className="cart-text09">Cost</span>
            </div>
            <div className="cart-container2">
              <span className="cart-text10">Dish Name</span>
              <span className="cart-text11">Provider</span>
              <span className="cart-text12">Dish Type</span>
              <span className="cart-text13">Dish Expiry</span>
              <span className="cart-text14">Dish Age</span>
              <span className="cart-text15">Cost</span>
            </div> */}
            <div className='col-md-12'>
            <ScrollMenu >
            {
            food.map((note) => {
                let noted=note.data();
                if(noted.cid===user.uid){
                  cost=cost+ parseInt(noted.cost);
                return <Card rootClassName="card-root-class-name" note={noted}/>;
                }
              })}
            </ScrollMenu>
            </div>
          </div>
          <div className="cart-container3">
            <h2 className="cart-text16">TOTAL PAYABLE AMOUNT :  </h2>
            <h2 className="cart-text17">{cost}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

import React from 'react'

import PropTypes from 'prop-types'
import '../views/Customer.css'
import './card.css'

const Card = (props) => {
  const { deleteFood,editFood }=props
  return (
    <div className={`card-card ${props.rootClassName} mx-3` } style={{"width":"20vw"}} >
      <button className="button-secondary button" onClick={()=>{editFood(props.note.desc)}}>Edit Item</button>
      <button className="button-secondary button" onClick={()=>{deleteFood(props.note.desc)}}>Delete Item</button>
      <div className="card-info " style={{"height":"30vh"}}>
        <span className="card-text">{props.note.desc}</span>
        <span className="card-text1">Age: {props.note.age}</span>
        <span className="card-text2">Expiry Date :{props.note.expiry}</span>
        <span className="card-text3">Quantity: {props.note.quantity}</span>
        <span className="card-text3">Location: {props.note.loc}</span>
        <span className="card-text3">Cost: {props.note.cost}</span>
      </div>
    </div>
  )
}

Card.defaultProps = {
  dishdescription: 'Dish Description',
  rootClassName: '',
  dish1: 'Dish 1',
  dishexpiry: 'Dish Expiry',
  dishageofFood: 'Dish Age of Food',
}

Card.propTypes = {
  dishdescription: PropTypes.string,
  rootClassName: PropTypes.string,
  dish1: PropTypes.string,
  dishexpiry: PropTypes.string,
  dishageofFood: PropTypes.string,
}

export default Card

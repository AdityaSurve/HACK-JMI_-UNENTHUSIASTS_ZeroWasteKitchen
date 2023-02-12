import React from 'react'
import PropTypes from 'prop-types'
import './card2.css'
import '../views/Customer.css'

const Card2 = (props) => {
  const {addCart}=props;
  return (
    <>
    <div className={`card-card ${props.rootClassName} mx-3` } style={{"width":"20vw"}}>
    <button className="button-secondary button my-2" onClick={()=>{addCart(props.note.desc)}}>Add to Cart</button>
      <div className="card-info">
        <span className="card-text">{props.note.desc}</span>
        <span className="card-text1">Age: {props.note.age}</span>
        <span className="card-text2">Expiry Date :{props.note.expiry}</span>
        <span className="card-text3">Provider: {props.note.uname}</span>
        <span className="card-text3">Quantity: {props.note.quantity}</span>
        
      </div>
    </div>
    </>
  )
}

Card2.defaultProps = {
  dishexpiry: 'dishexpiry',
  rootClassName: '',
  dishage: 'dishage',
  dishdescription: 'description',
  dishname: 'Dish Name',
}

Card2.propTypes = {
  dishexpiry: PropTypes.string,
  rootClassName: PropTypes.string,
  dishage: PropTypes.string,
  dishdescription: PropTypes.string,
  dishname: PropTypes.string,
}

export default Card2

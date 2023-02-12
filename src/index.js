import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './style.css'
import Adminc from './views/Adminc'
import Adminp from './views/Adminp'
import Customer from './views/Customer'
import Home from './views/home'
import Login from './views/Login'
import Provider from './views/Provider'
import Signup from './views/Signup'
import Cart from './views/cart'

const App = () => {
  return (
    <Router>
      <div>
        <Route component={Home} exact path="/" />
        <Route component={Login} exact path="/login" />
        <Route component={Signup} exact path="/signup" />
        <Route component={Provider} exact path="/provider" />
        <Route component={Adminp} exact path="/adminp" />
        <Route component={Adminc} exact path="/adminc" />
        <Route component={Customer} exact path="/customer" />
        <Route component={Cart} exact path="/cart" />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

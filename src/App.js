import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Shop from './Shop';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import AddProduct from './AddProduct';
import Home from './Home';
import Preview from './Preview';
import Cart from './Cart';
import style from '../src/styles/style.css'

function App() {

  const [productsList, setProductsList] = useState([]);
  const [cart, setCart] = useState([]);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/addProduct' component=
          {() =>
            <AddProduct productsList={productsList} setProductsList={setProductsList} />
          } />

        <Route path='/shop' style={style} component=
          {() =>
            <Shop productsList={productsList} setProductsList={setProductsList} />
          }/>

        <Route exact path='/preview' component={ 
          () => <Preview cart={cart} setCart={setCart}/>
          } />

        <Route path='/Cart' component={
          ()=>
          <Cart cart={cart} setCart={setCart}/>} />

      </Switch>
    </Router>
  );
}

export default App;

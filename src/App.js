import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

function App() {

  const [productsList, setProductsList] = useState([]);
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    getProducts();
  },[])

  const getProducts = async () => {
    try {
      const response = await axios.get('https://localhost:5001/products');
      const products = response.data;
      setProductsList(products);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Router>
      <Navbar cart={cart} />
      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/addProduct' component=
          {() =>
            <AddProduct productsList={productsList} setProductsList={setProductsList} />
          } />

        <Route path='/shop' style={style} component=
          {() =>
            <Shop productsList={productsList} />
          } />

        <Route exact path='/preview' component={
          () => <Preview cart={cart} setCart={setCart} />
        } />

        <Route path='/Cart' component={
          () =>
            <Cart cart={cart} setCart={setCart} />} />

      </Switch>
    </Router>
  );
}

export default App;

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
import Cart from './Cart';
import style from '../src/styles/style.css'
import axios from 'axios';
import Login from './Login';
import ProductPreview from './ProductPreview';

function App() {

  const [correctCredentials, setCorrectCredentials] = useState(true);
  const [user, setUser] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const login = async (e, credentials) => {
    e.preventDefault();
      await axios.post('https://localhost:5001/users/login', credentials, { withCredentials: true })
        .then(response => {
          if (response.status === 200) {
            setUser(response.data);
            return true;
          }
        })
      .catch(error => {
        setCorrectCredentials(false);
      });
  }

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
      <Navbar user={user} setUser={setUser} />
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
        
        <Route exact path='/productpreview' component={
          () => <ProductPreview cart={cart} setCart={setCart} />
        } />

        <Route path='/Cart' component={
          () =>
            <Cart cart={cart} setCart={setCart} />} />

        <Route path='/login' component={
          () =>
            <Login user={user} setUser={setUser} login={login} correctCredentials={correctCredentials}/>} />

      </Switch>
    </Router>
  );
}

export default App;

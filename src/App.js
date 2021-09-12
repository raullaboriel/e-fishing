import React, { useState, useEffect } from 'react';
import Navbar from './components/NavBar/Navbar';
import Shop from './components/Shop/Shop';
import AddProduct from './components/Product/AddProduct';
import Cart from './components/Cart/Cart';
import style from '../src/styles/style.css'
import axios from 'axios';
import Login from './components/User/Login';
import ProductPreview from './components/Product/ProductPreview'
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import SignUp from './components/User/SignUp';
import ls from 'local-storage'

function App() {

  const [correctCredentials, setCorrectCredentials] = useState(true);
  const [user, setUser] = useState(undefined);
  const [productsList, setProductsList] = useState(ls.get("efishing-cart") ? ls.get("efishing-cart") : []);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const checkIfSigned = async () => {
      await axios.post('https://localhost:5001/users/user', null, { withCredentials: true })
        .then(response => setUser(response.data))
        .catch(e => setUser(null));
    }
    checkIfSigned();
  }, []);

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
  if(user === undefined){
    return (<div></div>);
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} cart={cart} />
      <Switch>

        <Route path='/' exact style={style} component=
          {() =>
            <Shop productsList={productsList} />
          } />

        <Route path='/addProduct' component=
          {() =>
            <AddProduct productsList={productsList} setProductsList={setProductsList} />
          } />


        <Route exact path='/products/:name/:id' component={
          () => <ProductPreview cart={cart} setCart={setCart} />
        } />

        <Route path='/Cart' component={
          () =>
            <Cart cart={cart} setCart={setCart} />} />


        <Route path='/login' component={
          () =>
            <Login user={user} setUser={setUser} login={login} correctCredentials={correctCredentials} />} />

        <Route path='/signup' component={
          () =>
            <SignUp />} />

      </Switch>
    </Router>
  );
}

export default App;
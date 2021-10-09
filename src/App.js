import React, { useState, useEffect } from 'react';
import Navbar from './components/NavBar/Navbar';
import Shop from './components/Shop/Shop';
import AddProduct from './components/Product/AddProduct';
import Cart from './components/Cart/Cart';
import style from '../src/styles/style.css'
import axios from 'axios';
import Login from './components/User/Login';
import ProductPreview from './components/Product/ProductPreview'
import SignUp from './components/User/SignUp';
import ls from 'local-storage'
import { Redirect } from 'react-router';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import Main from './components/Account/Main';
import ForgotPassword from './components/User/ForgotPassword';

function App() {
  const [correctCredentials, setCorrectCredentials] = useState(true);
  const [user, setUser] = useState(undefined);
  const [productsList, setProductsList] = useState([]);
  const [cart, setCart] = useState(ls.get("efishing-cart") ? ls.get("efishing-cart") : []);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Todo');

  useEffect(() => {
    isUserSigned();
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    if (user && user !== 'LOADING_USER') {
      getCart();
    }
  }, [user])

  useEffect(() => {
    ls.set("efishing-cart", cart);
  }, [cart])

  const isUserSigned = async () => {
    await axios.post('https://localhost:5001/users', null, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setUser(null)
        }
      });
  }

  const getCart = async () => {
    await axios.post('https://localhost:5001/CartProducts/Cart', null, { withCredentials: true })
      .then(response => {
        setCart(response.data);
      })
  }

  //If there is a user logged:
  const modifyCloudCartProductAmount = async (ProductId, amount) => {
    if (user != null) {
      try {
        const cartProduct = {
          id: 0, //Any int: Id will automaticaly be given in backend
          id_user: 0, //Any int: Because id_user will be given in backend
          id_product: ProductId,
          amount: amount,
        }
        await axios.put('https://localhost:5001/CartProducts', cartProduct, { withCredentials: true });
      } catch (e) {
        console.log(e);
      }
    }
  }

  const addToCloudCartProduct = async (ProductId, amount) => {
    if (user != null) {
      try {
        const cartProduct = {
          id: 0, //Any because Id will automaticaly be given in backend as primary key
          id_user: 0, //Any Because id_user will be given in backend
          id_product: ProductId,
          amount: amount,
        }
        await axios.post('https://localhost:5001/CartProducts', cartProduct, { withCredentials: true });
      } catch (e) {
        console.log(e);
      }
    }
  }

  const RemoveFromCloudCartProduct = async (ProductId) => {
    if (user != null) {
      try {
        await axios.delete(`https://localhost:5001/CartProducts/${ProductId}`, { withCredentials: true });
      } catch (e) {
        console.log(e);
      }
    }
  }

  const login = async (e, credentials) => {
    e.preventDefault();

    setUser('LOADING_USER')
    await axios.post('https://localhost:5001/users/login', credentials, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
          setCorrectCredentials(true);
          getCart();
        }
      })
      .catch(error => {
        setUser(null);
        setCorrectCredentials(false);
        setTimeout(() => {
          setCorrectCredentials(true);
        }, 8000);
      });
  }

  const handleActiveCategoryChange = async (category) => {
    setActiveCategory(category);
    if (category === 'Todo') {
      getProducts();
    } else {
      try {
        const response = await axios.get(`https://localhost:5001/products/by?category=${category}`);
        const products = response.data;
        setProductsList(products);
      } catch (ex) {
        console.log(ex);
      }
    }
    return (<Redirect to={`/${category}`}></Redirect>);
  }

  const logout = async (e) => {
    e.preventDefault();
    await axios.post('https://localhost:5001/users/logout', null, { withCredentials: true })
      .then(() => {
        setUser(null)
        setCart([]);
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
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('https://localhost:5001/products/categories');
      const categories = response.data.categories;
      setCategories(categories);
    } catch (e) {
      console.log(e);
    }
  }

  const addToCart = (product, amount) => {
    product.price = parseFloat(product.price);

    let currentCart = cart;
    const index = currentCart.findIndex(e => e.id === product.id);

    if (index !== -1) {
      currentCart[index].amount = parseInt(currentCart[index].amount) + parseInt(amount);
      modifyCloudCartProductAmount(currentCart[index].id, currentCart[index].amount);
    } else {
      product.amount = parseInt(amount);
      currentCart.push(product);
      addToCloudCartProduct(product.id, amount);
    }
    setCart([...currentCart]);
  }

  const cartProductsAmount = () => {
    let amount = 0;
    cart.forEach(product => { amount += parseInt(product.amount) });
    return amount;
  }

  const removeFromCart = (id) => {
    const tmpCart = cart.filter(product => product.id !== id);
    setCart(tmpCart);
    RemoveFromCloudCartProduct(id);
  }

  const AddOneToCart = (id) => {
    const index = cart.findIndex(element => element.id === id);
    setCart(
      cart.map(element => element.id === id ? { ...element, amount: element.amount + 1 } : element)
    )
    modifyCloudCartProductAmount(id, cart[index].amount + 1);
  }

  const RemoveOneFromCart = (id) => {
    let tmpCart = cart;
    const index = tmpCart.findIndex(e => e.id === id);

    if (tmpCart[index].amount === 1) {
      return;
    } else {
      tmpCart[index].amount -= 1;
      setCart([...tmpCart]);
      modifyCloudCartProductAmount(id, cart[index].amount);
    }
  }

  if (user === undefined) {
    return (
      <div className="loader-inner bg-transparent">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} cartProductsAmount={cartProductsAmount} cart={cart} logout={logout} />
      <Switch>

        <Route path={['/', '/categories/:category/']} exact style={style}>
          <Shop addToCart={addToCart} productsList={productsList} categories={categories} handleActiveCategoryChange={handleActiveCategoryChange} activeCategory={activeCategory} />
        </Route>

        <Route path='/addProduct' >
          <AddProduct categories={categories} setCategories={setCategories} productsList={productsList} setProductsList={setProductsList} user={user} />
        </Route>

        <Route path='/cart'>
          <Cart cart={cart} cartProductsAmount={cartProductsAmount} removeFromCart={removeFromCart} setCart={setCart} AddOneToCart={AddOneToCart} RemoveOneToCart={RemoveOneFromCart} />
        </Route>

        <Route path='/login'>
          <Login user={user} login={login} correctCredentials={correctCredentials} />
        </Route>

        <Route path='/signup' >
          <SignUp />
        </Route>

        <Route path='/products/:name/:id' >
          <ProductPreview addToCart={addToCart} />
        </Route>

        <Route path='/account'>
          <Main user={user} isUserSigned={isUserSigned} />
        </Route>

        <Route path='/forgotPassword'>
          <ForgotPassword user={user} isUserSigned={isUserSigned} />
        </Route>
      </Switch>
      <br />
      <br />
      <br />
    </Router>
  );
}

export default App;
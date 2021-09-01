import React, { useState, useEffect } from 'react'
import senuelo from '../src/senuelo.jpg'
import { useLocation } from "react-router-dom";
import axios from 'axios';


const Preview = (props) => {
    const location = useLocation();
    const [showAlert, setShowAlert] = useState(false);
    const [product, setProduct] = useState({
        id: 0,
        name: '',
        brand: '',
        price: '',
        model: '',
        description: '',
        category: '',
        size: '',
        weight: '',
        stock: ''
    });
    

    useEffect(() => {
        onShowAlert();
    })

    useEffect(() => {
        const getProduct = async () => {
            const queryParams = new URLSearchParams(location.search);
            const id = queryParams.get('id');
            const response = await axios.get(`https://localhost:5001/products/${id}`);
            const product = response.data;
            setProduct(product);
        }
        getProduct();
    }, [location]);


    const onShowAlert = () => {
        if (showAlert) {
            window.setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
    }

    const alert = () => {
        return (
            <div className="alert alert-success" role="alert">
                Se agregó al carrito.
            </div>
        )
    }

    const addToCart = () => {
        let currentProduct = product;
        currentProduct['price'] = parseFloat(currentProduct.price);
        setProduct(currentProduct);

        let currentCart = props.cart;
        const index = currentCart.findIndex(e => e.id === product.id);

        if (index !== -1) {
            currentCart[index].amount = parseInt(currentCart[index].amount + 1);
            props.setCart(currentCart);
        } else {
            currentProduct['amount'] = 1;
            setProduct(currentProduct);
            currentCart.push(product);
            props.setCart(currentCart);
        }
        setShowAlert(true);
    }

    if(product.name === ''){
        return(<div></div>)
    }

    return (
        <div className="container mt-3">
            {showAlert && alert()}
            <section className="d-flex flex-row mt-5">
                <div className="col-8 border-right">
                    <div className="card-img-top" style={{ width: '100%', height: '100%' }} focusable="false">
                        <img src={senuelo} alt='not found' style={{ width: '100%', height: '100%', padding: '10px' }}></img>
                    </div>
                </div>

                <div className="col-4">
                    <h4>{product.name}</h4>
                    <h5 className="">US${product.price}</h5>
                    <p className="p-0 border col-md-3 col-sm-3 text-center">{product.size}</p>
                    <div className="">
                        <button className="btn btn-success btn-md" onClick={() => addToCart()}>Agregar al carrito</button>
                    </div>
                </div>
            </section>
            <div className="mt-4">
                <h3>Descripcion</h3>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

export default Preview

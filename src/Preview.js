import React, { useState, useEffect } from 'react'
import senuelo from '../src/senuelo.jpg'
import { useLocation } from "react-router-dom";

const Preview = (props) => {
    const [showAlert, setShowAlert] = useState (false);
    const location = useLocation();

    useEffect(() => {
        if(showAlert){
            window.setTimeout(()=>{
                setShowAlert(false)
            }, 5000)
        }
    }, [showAlert])

    const onShowAlert = () =>{
        setShowAlert(true);
    }

    const alert = () => {
        return(
            <div className="alert alert-success" role="alert">
                Se agregó al carrito.
            </div>
        )
    }

    const addToCart = () => {
        location.state.price = parseFloat(location.state.price);
        let currentCart = props.cart;

        const index = currentCart.findIndex(product => product.model === location.state.model);

        if(index !== -1){
            currentCart[index].amount = currentCart[index].amount + 1;
            props.setCart(currentCart);
        }else{
            location.state['amount'] = 1;
            currentCart.push(location.state);
            props.setCart(currentCart);
        }

        onShowAlert();
    }

    
    return (
        <div className="container mt-3">
            {showAlert && alert()}
            <section className="d-flex flex-row mt-5">
                <div className="col-8 border-right">
                    <div className="card-img-top" style={{width: '100%', height: '100%'}} focusable="false">
                        <img src={senuelo} alt='not found' style={{width: '100%', height: '100%', padding: '10px'}}></img>
                    </div>
                </div>
                    
                <div className="col-4">
                    <h3>{location.state.name}</h3>
                    <h4 className="">L. {location.state.price}</h4>
                    <div className="">
                        <button className="btn btn-success btn-md" onClick={() => addToCart()}>Agregar al carrito</button>
                    </div>
                </div>
            </section>
            <div className="mt-4">
                <h3>Descripcion</h3>
                <p>{location.state.description}</p>
            </div>
        </div>
    )
}

export default Preview

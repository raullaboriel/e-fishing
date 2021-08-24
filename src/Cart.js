import React from 'react'
import CartProduct from './components/CartProduct'

const Cart = (props) => {
    
    const removeFromCart = (model) => {
        let currentCart = [...props.cart];
        const index = currentCart.findIndex(product => product.model === model);
        currentCart.splice(index, 1);
        props.setCart(currentCart);
    }

    const mostrarSubTotal = () => {
        let subtotal = 0;
        if(props.cart.length !== 0){
            props.cart.map(product => (subtotal += parseFloat(product.price)*product.amount))
            return (
                <div>
                    <div className="text-right">
                        <h5 className="mt-4">Subtotal: US${subtotal.toFixed(2)}</h5>
                    </div>
                </div>
            );
        }
    }
    return (
        <div className='container mt-5'>
            <h1>Carrito de compras</h1>
            <div className="mt-3">
                {props.cart.map((product, index) => <CartProduct product={product} key={index} removeFromCart={removeFromCart}/>)}
            </div>
            <div className="d-flex flex-row justify-content-between">
                <button className="btn btn-warning form-control col-md-3 align-self-center"><small><b>Proceder al pago</b></small></button>
                {mostrarSubTotal()}
            </div>
        </div>
    )
}

export default Cart

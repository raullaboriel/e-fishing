import React from 'react'
import CartProduct from './CartProduct'

const Cart = (props) => {

    const removeFromCart = (id) => {
        const tmpCart = props.cart.filter(product => product.id !== id);
        props.setCart(tmpCart);
    }

    const mostrarSubTotal = () => {
        let subtotal = 0;
        if (props.cart.length !== 0) {
            [...props.cart].map(product => (subtotal += parseFloat(product.price) * product.amount))
            return (
                <div className="d-flex flex-row justify-content-between mt-4">
                    <div className="col-md-3 col-sm-6 align-self-center">
                        <h5 className="">Subtotal: ${subtotal.toFixed(2)}</h5>
                    </div>
                    <div className='col-md-3 col-sm-6 justify-content-end p-0'>
                        <button className="btn btn-warning form-control"><small><b>Proceder al pago</b></small></button>
                    </div>
                </div>
            );
        }
    }

    const emptyCartMessage = () => {
        if (props.cart.length === 0) {
            return (
                <div className="d-flex justify-content-center mt-5">
                    <h3 className="text-secondary">El carrito esta vacio</h3>
                </div>
            )
        }
    }
    return (
        <div className='container mt-5'>
            <h1>Carrito</h1>
            <div className="mt-3">
                {props.cart.map((product, index) =>
                    <CartProduct
                        AddOneToCart={props.AddOneToCart}
                        product={product} key={index}
                        removeFromCart={removeFromCart}
                        cart={props.cart}
                        setCart={props.setCart}
                        RemoveOneToCart={props.RemoveOneToCart}
                    />)}
            </div>
            <div >
                {mostrarSubTotal()}
                {emptyCartMessage()}
            </div>
        </div>
    )
}

export default Cart
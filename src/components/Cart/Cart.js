import React from 'react'
import CartProduct from './CartProduct'
import { Link } from 'react-router-dom'
const Cart = (props) => {

    const subtotal = () => {
        let subtotal = 0;
        [...props.cart].map(product => (subtotal += parseFloat(product.price) * product.amount))
        return (
            subtotal.toFixed(2)
        );
    }

    const emptyCartMessage = () => {
        if (props.cart.length === 0) {
            return (
                <div className="d-flex justify-content-center mt-5">
                    <h3 className="text-secondary">El carrito está vacio</h3>
                </div>
            )
        }
    }

    return (
        <div className='container mt-4'>
            <div className='d-flex justify-content-between pl-3'>
                <h1>Carrito</h1>
                <div className='d-flex justify-content-end'>
                    <Link to='/' className='btn font-weight-bold btn-link mb-2'>
                        Seguir comprando
                        <i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                <div className='d-flex flex-xl-row flex-column'>
                    {
                        props.cart.length !== 0 &&
                        <div className='d-flex flex-row justify-content-between bg-white sticky-top ml-3 mr-3 pb-2 pt-2 hidden-lg'>
                            <span className='lead align-self-center'>
                                    Subtotal ({props.cartProductsAmount()} {props.cartProductsAmount() === 1 ? 'producto' : 'productos'}): <b>${subtotal()}</b>
                                </span>
                            <div className='col-6'>
                                <button className="btn-sm btn-warning mt-1 mb-2 shadow-sm form-control">
                                    Proceder al pago
                                </button>
                            </div>
                        </div>
                    }
                    <div className='col-xl-9 col'>
                        {props.cart.map((product, index) =>
                            <CartProduct
                                AddOneToCart={props.AddOneToCart}
                                product={product} key={index}
                                removeFromCart={props.removeFromCart}
                                cart={props.cart}
                                setCart={props.setCart}
                                RemoveOneFromCart={props.RemoveOneToCart}
                            />)}
                    </div>
                    {
                        props.cart.length !== 0 &&
                        <div className='col-3 hidden-md'>
                            <div>
                                <span className='lead'>
                                    Subtotal ({props.cartProductsAmount()} {props.cartProductsAmount() === 1 ? 'producto' : 'productos'}): <b>${subtotal()}</b>
                                </span>
                                <button className="btn-sm btn-warning mt-1 form-control shadow-sm">
                                    Proceder al pago
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div >
                {emptyCartMessage()}
            </div>
        </div>
    )
}

export default Cart
import React from 'react'
import senuelo from '../../src/senuelo2.jpeg'

const CartProduct = (props) => {
    const product = props.product;


    return (
        <div className='d-flex bg-light rounded mb-2 justify-content-between'>
            <div className="row">
                <div className="flex-column">
                <img alt='Imagen del producto' className="align-self-start rounded" width={110} height={110} src={senuelo} />
                </div>
                <div className="p-2 flex-column">
                    <h4 className="m-0">{product.name}</h4>
                    <p className="m-0"><b>US${product.price}</b></p>
                    <p className="m-0">Cantidad: {product.amount}</p>
                </div>
            </div>
            <div className="d-flex align-items-start">
                <div className="p-2">
                    <i className="fa fa-times" onClick={() => props.removeFromCart(props.product.model)} aria-hidden="true"></i>
                </div>
            </div>

        </div>
    )
}

export default CartProduct

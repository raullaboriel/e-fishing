import React, { useState, useEffect } from 'react'
import senuelo from '../../src/senuelo2.jpeg'

const CartProduct = (props) => {

    useEffect(() => {
        setAmount(props.product.amount);
    }, [props.product.amount])

    let product = props.product;
    const index = props.cart.findIndex(item => item.id === product.id);
    const [getAmount, setAmount] = useState(product.amount);

    const a = () => {
        let currentCart = [...props.cart];
        currentCart[index].amount = getAmount;
        props.setCart(currentCart);
    }

    const handleAmountChange = (e, a) => {
        e.preventDefault();
        setAmount(e.target.value);
    }

    return (
        <div className='d-flex bg-light rounded mb-2 justify-content-between' style={{height: 130}}>
            <div className="row">
                <div className="col-4 rounded cart-product" >
                    <img alt='Imagen del producto' className="align-self-start cart-product-img img-fluid rounded"   src={senuelo} />
                </div>
                <div className="p-2 col-8">
                    <h4 className="m-0">{product.name}</h4>
                    <p className="m-0"><b>US${product.price}</b></p>
                    <div className="d-flex flex-row">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Cantidad</span>
                            </div>
                            <input type="number" name="amount" onChange={(e) => handleAmountChange(e, a)} value={getAmount} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-start">
                <div className="p-2">
                    <i className="fa fa-times" onClick={() => props.removeFromCart(props.product.id)} aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}

export default CartProduct

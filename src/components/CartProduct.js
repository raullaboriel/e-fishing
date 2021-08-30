import React, { useState, useEffect } from 'react'
import senuelo from '../../src/senuelo2.jpeg'

const CartProduct = (props) => {

    useEffect(() => {
        setAmount(parseInt(props.product.amount));
    }, [props.product.amount])

    let product = props.product;
    const index = props.cart.findIndex(item => item.id === product.id);
    const [getAmount, setAmount] = useState(parseInt(product.amount));
    const [showUpdate, setShowUpdate] = useState(false);

    const updateAmount = () => {
        let currentCart = [...props.cart];
        currentCart[index].amount = parseInt(getAmount);
        props.setCart(currentCart);
        setShowUpdate(false);

        if (getAmount <= 0) {
            props.removeFromCart(props.product.id);
        }
    }

    const updateButton = () => {
        return (
            <button onClick={() => updateAmount()} className="btn form-control col-2 bg-transparent">
                <i className="fa fa-refresh p-1" aria-hidden="true"></i>
            </button>
        );
    }

    const handleAmountChange = (e) => {
        e.preventDefault();
        setAmount(e.target.value);
        setShowUpdate(true);
    }

    return (
        <div className='d-flex bg-light rounded mb-2 justify-content-between' style={{ height: 130 }}>
            <div className="row">
                <div className="col-4 rounded cart-product" >
                    <img alt='Imagen del producto' className="align-self-start cart-product-img img-fluid rounded" src={senuelo} />
                </div>
                <div className="p-2 col-8">
                    <h5 className="m-0 row">{product.name}</h5>
                    <p className="m-0 row"><b>US${product.price}</b></p>
                    <div className="row">
                        <div className="input-group mb-3 col-md-8 col-7 pr-0 ">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Cant:</span>
                            </div>
                            <input type="number" name="amount" min={0} onChange={e => handleAmountChange(e)} value={getAmount}
                                className="form-control col-sm-5 col-md-8">
                            </input>
                        </div>
                        <div className="" style={{ width: 50 }}>
                            {showUpdate ? updateButton() : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-start">
                <div className="p-2">
                    <button className="btn bg-transparent" onClick={() => props.removeFromCart(props.product.id)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct

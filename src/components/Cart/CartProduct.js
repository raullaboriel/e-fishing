import React, { useState, useEffect } from 'react'
import axios from 'axios';

const CartProduct = (props) => {
    let product = props.product;
    const [image, setImage] = useState(null);
    const index = props.cart.findIndex(item => item.id === product.id);
    const [getAmount, setAmount] = useState(parseInt(product.amount));
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        setAmount(parseInt(props.product.amount));
    }, [props.product.amount])

    useEffect(() => {
        const chargeImage = async (id) => {
            try {
                const response = await axios.get(`https://localhost:5001/images/${id}`);
                setImage(response.data);
            } catch (e) {
                console.log(e);
            }
        }
        chargeImage(props.product.id);
    }, [props.product.id]);


    const updateAmount = (e) => {
        e.preventDefault();
        let currentCart = props.cart;
        currentCart[index].amount = parseInt(getAmount);
        props.setCart([...currentCart]);
        setShowUpdate(false);

        if (getAmount <= 0) {
            props.removeFromCart(props.product.id);
        }
    }

    const handleAmountChange = (e) => {
        e.preventDefault();
        setAmount(e.target.value);
        setShowUpdate(true);
    }

    if (image === null) {
        return (<div></div>);
    }

    return (
        <div className="card card-body mb-3 p-0 pb-lg-0 pb-2">
            <div className="d-flex flex-md-row flex-column">
                <div className="col-lg-6 pl-0 pr-1 col-md-7 col-12">
                    <div className="d-flex flex-md-row flex-column p-lg-0 pl-1">
                        <div className="col-md-5 row">
                            <div className="card-img-top" style={{ maxWidth: '100%', height: '150px' }}>
                                <img alt='Imagen del producto' className="align-self-start cart-product-img p-2 img-fluid rounded" src={image.uris[0]} />
                            </div>
                        </div>
                        <div className="col-md-7 row-sm align-self-center">
                            <div>
                                <span className="h6">{product.name}</span>
                            </div>
                            <div>
                                <span className="h6">${product.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 row pl-md-0 pl-3">
                    <div className="col-md-6 col-6 align-self-md-center">
                        <div className="input-group input-spinner">
                            {showUpdate ? <button className="btn btn-light" onClick={e => updateAmount(e)} type="button" id="button-minus"><i className="fa fa-check"></i></button> : null}
                            <input type="number" name="amount" min={0} onChange={e => handleAmountChange(e)} value={getAmount} className="form-control text-center"></input>
                        </div>
                    </div>
                    <div className="d-flex col-md-6 col-6 align-self-md-center justify-content-md-center">
                        <a onClick={() => props.removeFromCart(props.product.id)} href="#." className="btn btn-light btn-round">Quitar</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartProduct
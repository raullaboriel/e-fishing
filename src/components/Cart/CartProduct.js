import React, { useState, useEffect } from 'react'
import axios from 'axios';

const CartProduct = (props) => {
    const [image, setImage] = useState(null);
    const [getAmount, setAmount] = useState(parseInt(props.product.amount));

    useEffect(() => {
        setAmount(parseInt(props.product.amount));
    }, [props.product.amount]);

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

    if (image === null) {
        return (<div></div>);
    }

    return (
        <div className="card card-body mb-3 p-0 pb-lg-0 pb-2">
            <div className="d-flex flex-md-row flex-column">
                <div className="col-lg-6 pl-0 pr-1 col-md-7 col-12">
                    <div className="d-flex flex-md-row flex-column p-lg-0 pl-1">
                        <div className="col-md-6 row">
                            <div className="card-img-top text-center" style={{ maxWidth: '100%', height: '150px' }}>
                                <img alt='Imagen del producto' className="align-self-start cart-product-img p-2 img-fluid rounded" src={image.uris[0]} />
                            </div>
                        </div>
                        <div className="col-md-6 row-sm align-self-center">
                            <div>
                                <span className="h6">{props.product.name}</span>
                            </div>
                            <div>
                                <span className="h6">${props.product.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 row pl-md-0 pl-3 justify-content-between">
                    <div className="ml-lg-3 col-lg-5 col-md-6 col-6 align-self-md-center">
                        <div className="input-group input-spinner">
                            <div className="input-group-prepend bg-white">
                                <button title='Quitar uno' onClick={() => props.RemoveOneFromCart(props.product.id)} name="minus" className="btn btn-white border" type="button" id="button-plus">
                                    <i className="fa fa-minus text-secondary"></i>
                                </button>
                            </div>
                            <input disabled type="text" value={getAmount} className="form-control text-center bg-white" name="amount" style={{ fontWeight: 'bold', color: '#111827', fontFamily: 'Roboto, sans-serif' }} min={1}></input>
                            <div className="input-group-append">
                                <button  title='Agregar uno más' onClick={() => props.AddOneToCart(props.product.id)} name="plus" className="btn btn-white border" type="button" id="button-minus">
                                    <i className="fa fa-plus text-secondary"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-6 align-self-md-center">
                        <div>
                            <a title='Quitar del carrito' onClick={() => props.removeFromCart(props.product.id)} href="#." className="btn btn-light btn-round"><i className="fa fa-times" aria-hidden="true"></i> </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartProduct

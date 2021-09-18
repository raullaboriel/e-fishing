import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = (props) => {
    const [image, setImage] = useState(null);

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
    }, [props.product.id])

    if (image === null) {
        return (<div></div>);
    }

    return (
        <div className="col mb-5">
            <div className="card h-100 w-100 rounded-0 border-0">
                <div className="text-center p-lg-2" style={{ width: 'auto', height: '210px' }} focusable="false">
                    <Link to={`/products/${props.product.name.replaceAll(' ', '-')}/${props.product.id}`}>
                        <img className="img-product  " src={image.uris[0]} alt="..."></img>
                    </Link>
                </div>
                <div className="card-body p-4">
                    <div>
                        <Link style={{ color: 'black' }} to={`/products/${props.product.name.replaceAll(' ', '-')}/${props.product.id}`}>
                            <h5 className="fw-bolder">{props.product.name}</h5>
                        </Link>
                        <span>${props.product.price}</span>
                    </div>
                </div>
                <div className="card-footer mt-auto p-4 pt-0 border-top-0 bg-transparent">
                    <div className="d-flex flex-row mt-auto justify-content-between">
                        <span style={{ fontSize: '15px' }} className="text-secondary">{props.product.brand}</span>
                        <div>
                            <button onClick={() => props.addToCart(props.product, 1)} className="btn btn-warning rounded-0">
                                <i className="fa fa-plus text-secondary"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        /*         <div className="col-lg-4 mb-4 pl-0 pr-0 rounded col-6">
                    <div className="card mb-1 h-100 w-100 border-0">
                        <div className="card-img-top text-center " style={{ width: '100%', height: '210px' }} focusable="false">
                            <Link to={`/products/${props.product.name.replaceAll(' ', '-')}/${props.product.id}`}>
                                <img src={image.uris[0]} alt='not found' className="img-fluid img-product" astyle={{ width: '100%', height: '100%', padding: '10px' }}></img>
                            </Link>
                            <title>
                                {props.product.name}
                            </title>
                        </div>
                        <div className="card-body">
                            <div>
                                <span><b><Link id='name-link' to={`/products/${props.product.name.replaceAll(' ', '-')}/${props.product.id}`}>{props.product.name}</Link></b></span>
                                <p>US${props.product.price}</p>
                            </div>
                            <div className="d-flex flex-row mt-auto justify-content-between">
                                <span style={{ fontSize: '15px' }} className="text-secondary">{props.product.brand}</span>
                                <div>
                                    <button onClick={() => props.AddOneToCar(3)} className="btn rounded-0 btn-warning"><i className="fa fa-plus text-secondary"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */

    )
}

export default Product
import React from 'react';
import senuelo from '../../src/senuelo.jpg'
import { useHistory } from "react-router-dom";

const Product = (props) => {
    let history = useHistory();

    const openPreview = (e) => {
        e.preventDefault();
        history.push('/preview', props.product);
    }

    return (
        <div className="col-md-4 mb-4" onClick={e => openPreview(e)}>
            <div className="card mb-1 shadow-sm">
                <div className="card-img-top" style={{width: '100%', height: '220px'}} focusable="false">
                    <img src={senuelo} alt='not found' style={{width: '100%', height: '100%', padding: '10px'}}></img>
                    <title>{props.product.name}</title>
                </div>
                <div className="card-body">
                    <div>
                        <span><b>{props.product.name}</b></span>
                        <p>L. {props.product.price}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                        </div>
                        <small className="text-muted">{props.product.brand}</small>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Product

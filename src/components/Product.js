import React from 'react';
import senuelo from '../../src/senuelo.jpg'
import { Link } from 'react-router-dom';
const Product = (props) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card mb-1 shadow-sm">
                <div className="card-img-top" style={{width: '100%', height: '220px'}} focusable="false">
                    <Link to={`/productpreview?id=${props.product.id}`}><img src={senuelo} alt='not found' style={{width: '100%', height: '100%', padding: '10px'}}></img></Link>
                    <title>{props.product.name}</title>
                </div>
                <div className="card-body">
                    <div>
                        <span><b><Link id='name-link' to={`/productpreview?id=${props.product.id}`}>{props.product.name}</Link></b></span>
                        <p>US${props.product.price}</p>
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Product = (props) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const chargeImage = async (id) => {
            try{
                const response = await axios.get(`https://localhost:5001/images/${id}`);
                setImage(response.data);
            }catch(e){
                console.log(e);
            }
        }
        chargeImage(props.product.id);
    }, [props.product.id])

    if(image === null){
        return (<div></div>);
    }
    
    return (
        <div className="col-md-4 mb-4 pl-0 pr-0">
            <div className="card mb-1 h-100 w-100 shadow-sm border-0 shadow-none">
                <div className="card-img-top" style={{width: '100%', height: '220px'}} focusable="false">
                    <Link to={`/productpreview?id=${props.product.id}`}><img src={image.uris[0].uri} alt='not found' className="img-fluid" style={{width: '100%', height: '100%', padding: '10px'}}></img></Link>
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

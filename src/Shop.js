import React from 'react'
import Product from './components/Product/Product'

const Shop = (props) => {
    return (
        <div className="container mt-5 d-flex flex-column">
            <h1 className="mb-3">Productos</h1>
            <div className="row">
                {props.productsList.map((element, index) => <Product key={index} product={element}/>)}
            </div>
        </div>
    )
}

export default Shop

import React from 'react'
import SubNavbar from '../NavBar/SubNavbar'
import Product from '../Product/Product'

const Shop = (props) => {
    const showByCategory = (element, category, index) => {
        if (element.category === category) {
            return <Product key={index} product={element} />
        } else {
            return null;
        }
    }

    return (
        <div>
            <SubNavbar/>
            <div className="container mt-5 d-flex flex-column">
                <h1 className="mb-3">Productos</h1>
                <div className="card-group">
                    {props.productsList.map((element, index) => <Product key={index} product={element} />)}
                </div>
                <div>
                    <p id="Reels">Carretes</p>
                    <hr />
                    <div className="row">
                        {props.productsList.map((element, index) => showByCategory(element, 'Reels', index))}
                    </div>
                    <p id="Lures">Señuelos</p>
                    <hr />
                    <div className="row">
                        {props.productsList.map((element, index) => showByCategory(element, 'Lures', index))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop

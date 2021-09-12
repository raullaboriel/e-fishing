import React from 'react'
import SubNavbar from '../NavBar/SubNavbar'
import Product from '../Product/Product'

const Shop = (props) => {
    /*
    const showByCategory = (element, category, index) => {
        if (element.category === category) {
            return <Product key={index} product={element} />
        } else {
            return null;
        }
    }
    */

    return (
        <div>
            <SubNavbar />
            <div className="container mt-5 d-flex flex-column">
                <div className="card-group">
                    {props.productsList.map((element, index) => <Product key={index} product={element} />)}
                </div>
                {/* <div>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <div><p id="Reels" className="h3 p-2">Carretes</p></div>
                        <div>
                            <Link className="h5 p-2" style={{color: 'black'}} to="">Ver mas
                            <i className="pl-2 fa fa-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                    <hr />
                    <div className="card-group">
                        {props.productsList.map((element, index) => showByCategory(element, 'Reels', index))}
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <div><p id="Lures" className="h3 p-2">Señuelos</p></div>
                        <div>
                            <Link className="h5 p-2" style={{color: 'black'}} to="">Ver mas
                            <i className="pl-2 fa fa-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                    <hr />
                    <div className="card-group">
                        {props.productsList.map((element, index) => showByCategory(element, 'Lures', index))}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Shop

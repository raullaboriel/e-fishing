import React from 'react'
import SubNavbar from '../NavBar/SubNavbar'
import Product from '../Product/Product'
import { Link } from 'react-router-dom'

const Shop = (props) => {
    const category = (category) => {
        return (
            <Link style={{ color: 'black' }} to={`/categories/${category}`} onClick={() => props.handleActiveCategoryChange(category)}>
                <div className="row mb-1">
                    <div className="col-1">
                        {category === props.activeCategory && <i className="fa fa-check text-success" aria-hidden="true"></i>}
                    </div>
                    <div className="col-1">
                        <span className="text-dark" style={{ fontSize: '15px' }}>{category.toUpperCase()}</span>
                    </div>
                </div>
            </Link>
        );
    }

    if (props.categories === []) {
        return (<div></div>);
    }

    return (
        <div>
            <div className="hidden-lg">
                <SubNavbar categories={props.categories} activeCategory={props.activeCategory} handleActiveCategoryChange={props.handleActiveCategoryChange} />
            </div>
            <div className="container-fluid px-lg-5 mt-lg-5 mt-3">
                <div className="row">
                    <div className="col-2 col-categories hidden-md">
                        <h4 className="">Categorias</h4>
                        <div className="col">
                            <Link style={{ color: 'black' }} to='/' onClick={() => props.handleActiveCategoryChange('Todo')}>
                                <div className="row mb-1">
                                    <div className="col-1">
                                        {'Todo' === props.activeCategory && <i className="fa fa-check text-success" aria-hidden="true"></i>}
                                    </div>
                                    <div className="col-1">
                                        <span className="text-dark" style={{ fontSize: '15px' }}>{'Todo'.toUpperCase()}</span>

                                    </div>
                                </div>
                            </Link>
                            {props.categories.map((element, index) => <div key={index}>{category(element)}</div>)}
                        </div>
                    </div>
                    <div className='col'>
                        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-9">
                            {props.productsList.map((element, index) => <Product key={index} addToCart={props.addToCart} product={element} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
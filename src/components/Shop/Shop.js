import React from 'react'
import SubNavbar from '../NavBar/SubNavbar'
import Product from '../Product/Product'
import { Link } from 'react-router-dom'

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

    const category = (category) => {
        return (
            <Link style={{ color: 'black' }} to={`/categories/${category}`} onClick={() => props.handleActiveCategoryChange(category)}>
                <div className="row mb-1  ml-1 ">
                    <div className="mr-3">
                        <input readOnly checked={props.activeCategory === category} type="radio"></input>
                    </div>
                    <span className="text-dark" style={{fontSize: '15px'}}>{category.toUpperCase()}</span>
                </div>
            </Link>
        );
    }

    if (props.categories === []) {
        return <div></div>
    }

    return (
        <div>
            <div className="hidden-lg">
                <SubNavbar categories={props.categories} handleActiveCategoryChange={props.handleActiveCategoryChange} />
            </div>
            <div className="d-flex flex-row container mt-5">
                <div className="col-md-2 col-categories hidden-sm">
                    <h4 className="">Categorias</h4>
                    <div className="col">
                        <Link style={{ color: 'black' }} to='/' onClick={() => props.handleActiveCategoryChange('Todo')}>
                            <div className="row ml-1 mb-1">
                                <div className="mr-3">
                                    <input readOnly checked={props.activeCategory === 'Todo'} type="radio" ></input>
                                </div>
                                <span className="text-dark" style={{fontSize: '15px'}}>TODO</span>
                            </div>
                        </Link>
                        {props.categories.map((element, index) => <div key={index}>{category(element)}</div>)}
                    </div>
                </div>
                <div className="col-md-10 card-group">
                    {props.productsList.map((element, index) => <Product key={index} product={element} />)}
                </div>
            </div>
        </div>
    )
}

export default Shop

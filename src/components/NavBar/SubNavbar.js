import React from 'react'
import { Link } from 'react-router-dom'

const SubNavbar = (props) => {
    if (props.categories === []) {
        return <div></div>
    }

    return (
        <div className="nav-scroller bg-white border-bottom">
            <nav className="nav nav-underline">
                <Link style={{ color: 'black' }} to='/' onClick={() => props.handleActiveCategoryChange('Todo')} className="nav-link">TODO</Link>
                {props.categories.map((element, index) =>
                    <Link style={{ color: 'black' }} to={`/categories/${element}`} onClick={() => props.handleActiveCategoryChange(element)} key={index} className="nav-link">{element.toUpperCase()}</Link>
                )}
            </nav>
        </div>
    )
}

export default SubNavbar

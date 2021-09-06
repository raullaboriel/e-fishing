import React from 'react'
import {
    Link
} from 'react-router-dom'

const Navbar = (props) => {

    const showCartAmount = () => {
        let amount = 0;
        props.cart.forEach(product => { amount += parseInt(product.amount) });
        return amount;
    }


    const showLogin = () => {
        if (!props.user) {
            return (<Link className="nav-link" to="/login">Iniciar sesion</Link>);
        }
        return (<Link className="nav-link" to="/login">{props.user.name}</Link>)
    }

    const isAdmin = () => {
        if (props.user) {
            if (props.user.admin) {
                return <Link className="nav-link" to="/addProduct">Agregar producto</Link>
            }
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav mb-lg-0 ms-lg-4">
                    <li><Link className="nav-link" to='/'>Inicio</Link></li>
                    <li><Link className="nav-link" to="/shop">Comprar</Link></li>
                    <li>{isAdmin()}</li>
                </ul>
                <ul className="ml-auto navbar-nav">
                    <li>
                        {showLogin()}
                    </li>
                    <li>
                        <Link to='/cart'>
                            <form className="d-flex ml-lg-3">
                                <button className="btn btn-outline-dark" type="submit">
                                    <i className="bi-cart-fill mr-1"></i>
                                    Carrito
                                    <span className="badge bg-dark text-white ml-1 rounded-pill">{showCartAmount()}</span>
                                </button>
                            </form>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

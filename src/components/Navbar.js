import React from 'react'
import {
    Link
} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link" to='/'>Inicio</Link>
                    <Link className="nav-link" to="/shop">Comprar</Link>
                    <Link className="nav-link" to="/addProduct">Agregar producto</Link>
                </div>
                <div className="navbar-nav ml-auto">
                    <Link className="nav-link" to="/Cart">Carrito</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

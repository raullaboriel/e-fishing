import React from 'react'
import {
    Link
} from 'react-router-dom'

const Navbar = (props) => {

    const showLogin = () => {
        if(!props.user){
            return (<Link className="nav-link" to="/login">Login</Link>);
        }
        return null
    }

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
                    {showLogin()}
                </div>
                <Link id="ex3" to='/Cart' style={{color: 'black'}}>
                    <span className="p1 fa-stack fa-1x has-badge" >
                        <i className="p2 fa fa-circle fa-stack-2x"></i>
                        <i className="p3 fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
                    </span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar

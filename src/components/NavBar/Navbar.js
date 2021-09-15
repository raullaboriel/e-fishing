import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    const showCartAmount = () => {
        let amount = 0;
        props.cart.forEach(product => { amount += parseInt(product.amount) });
        return amount;
    }

    const showLogin = () => {
        if (!props.user) {
            return (
                <ul className="navbar-nav">
                    <li>
                        <Link className="nav-link" to="/login">Iniciar sesion</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to='/signup'>Registrate</Link>
                    </li>
                </ul>
            );
        }
        return (<Link className="nav-link" to="/">{props.user.name}</Link>)
    }

    const isAdmin = () => {
        if (props.user) {
            if (props.user.admin) {
                return <Link className="nav-link" to="/addProduct">Agregar producto</Link>
            }
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="hidden-lg" to='/cart'>
                <form className="d-flex ml-lg-3">
                    <button className="btn btn-primary" type="submit">
                        <i className="bi-cart-fill mr-1"></i>
                        Carrito
                        <span style={{ fontFamily: 'sans-serif', fontSize: '15px' }} className="badge bg-white text-primary font-weight-bold ml-1 rounded-pill">{showCartAmount()}</span>
                    </button>
                </form>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav mb-lg-0 ms-lg-4">
                    <li><Link className="nav-link" to='/'>Inicio</Link></li>
                    <li>{isAdmin()}</li>
                </ul>
                <ul className="ml-auto navbar-nav">
                    {showLogin()}
                    {props.user !== null ? <li><Link className='nav-link' to='/' onClick={(e) => props.logout(e)}>Cerrar sesión</Link></li> : null}
                    <li className='hidden-sm'>
                        <Link to='/cart'>
                            <form className="d-flex ml-lg-3">
                                <button className="btn btn-primary" type="submit">
                                    <i className="bi-cart-fill mr-1"></i>
                                    Carrito
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '15px' }} className="badge bg-white text-primary font-weight-bold ml-1 rounded-pill">{showCartAmount()}</span>
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

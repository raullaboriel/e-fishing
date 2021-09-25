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
                        <Link className="nav-link" to="/login">Iniciar sesion<i className="ml-2 fa fa-user" aria-hidden="true"></i></Link>
                    </li>
                </ul>
            );
        }
        return (
            <div className="btn-group">
                <Link to='' className="btn btn-transparent">{props.user.name}</Link>
                <Link to='' type="button" className="btn btn-transparent dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                </Link>
                <div className="dropdown-menu">
                    <Link to='' className="dropdown-item" >Mi cuenta</Link>
                    <div className="dropdown-divider"></div>
                    <Link to='' onClick={(e) => props.logout(e)} className="dropdown-item" >Cerrar sesión<i className="ml-2 fa fa-sign-out" aria-hidden="true"></i></Link>
                </div>
            </div>)
    }

    const isAdmin = () => {
        if (props.user) {
            if (props.user.admin) {
                return <Link className="nav-link" to="/addProduct">Agregar producto</Link>
            }
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <li id="ex3" className='hidden-lg nav-link'>
                <Link to='/cart'>
                    <span className="p1 fa-stack fa-1x has-badge" data-count={showCartAmount()}>
                        <i className="text-dark p3 fa fa-shopping-cart fa-stack-2x fa-inverse" data-count="5"></i>
                    </span>
                </Link>
            </li>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav mb-lg-0 ms-lg-4">
                    <li><Link className="nav-link" to='/'>Inicio</Link></li>
                    <li>{isAdmin()}</li>
                </ul>
                <ul className="ml-auto navbar-nav">
                    {showLogin()}
                    {/*                     <li className='hidden-sm'>
                        <Link to='/cart'>
                            <form className="d-flex ml-lg-3">
                                <button className="btn btn-primary" type="submit">
                                    <i className="bi-cart-fill mr-1"></i>
                                    Carrito
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '15px' }} className="badge bg-white text-primary font-weight-bold ml-1 rounded-pill">{showCartAmount()}</span>
                                </button>
                            </form>
                        </Link>
                    </li> */}
                </ul>
                <li id="ex3" className='hidden-sm nav-link'>
                    <Link to='/cart'>
                        <span className="p1 fa-stack fa-1x has-badge" data-count={showCartAmount()}>
                            <i className="text-dark p3 fa fa-shopping-cart fa-stack-2x fa-inverse" data-count="5"></i>
                        </span>
                    </Link>
                </li>
            </div>
        </nav>
    )
}

export default Navbar

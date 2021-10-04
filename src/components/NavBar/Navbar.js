import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.png'

const Navbar = (props) => {
    const showCartAmount = () => {
        let amount = 0;
        props.cart.forEach(product => { amount += parseInt(product.amount) });
        return amount;
    }

    const showLogin = () => {
        if (!props.user) {
            return (
                <ul className="navbar-nav mr-4">
                    <li>
                        <Link className="nav-link" to="/login">Iniciar sesion<i className="ml-3 fa fa-user" aria-hidden="true" aria-label='Login'></i></Link>
                    </li>
                </ul>
            );
        }else if(props.user.name !== undefined){
            return (
                <li className="nav-link mr-4 d-flex align-items-center">
                    <div className="btn-group">
                        <Link to='/account' className='text-dark mr-2' aria-label='name'>{props.user.name}</Link>
                        <Link to='' className="text-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label='Account dropdown'>
                            <span className="sr-only">Toggle Dropdown</span>
                        </Link>
                        <div className="dropdown-menu">
                            <Link to='/account' className="dropdown-item" aria-label='My account'>Mi cuenta</Link>
                            <Link to='' className="dropdown-item" aria-label='My orders'>Mis pedidos</Link>
                            <div className="dropdown-divider"></div>
                            <Link to='' onClick={(e) => props.logout(e)} className="dropdown-item" aria-label='Logout'>Cerrar sesión<i className="ml-2 fa fa-sign-out" aria-hidden="true"></i></Link>
                        </div>
                    </div>
                </li>
            )
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="ml-auto navbar-nav">
                <li id="ex3" className='hidden-lg nav-link'>
                    <Link to='/cart' aria-label='Go to cart'>
                        <span className="p1 fa-stack fa-1x has-badge" data-count={showCartAmount()}>
                            <i className="text-dark p3 fa fa-shopping-cart fa-stack-2x fa-inverse" data-count="5"></i>
                        </span>
                    </Link>
                </li>
            </ul>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <Link className="nav-link p-0" to='/' aria-label='Home' style={{color: 'grey'}}>
                    <ul className="navbar-nav mb-lg-0 ms-lg-4">
                        <li>
                            <img src={logo} className='hidden-sm' alt='' style={{ maxHeight: '60px', maxWidth: 'auto' }} />
                        </li>
                        <li className='d-flex align-items-center font-weight-bold'>
                            eFishing
                        </li>
                    </ul>
                </Link>
                <ul className="ml-auto mr-3 navbar-nav">
                    {showLogin()}
                    <li id="ex3" className='hidden-sm nav-link d-flex align-items-center'>
                        <Link to='/cart' aria-label='Shopping cart'>
                            <span className="p1 fa-stack fa-1x has-badge" data-count={showCartAmount()}>
                                <i className="text-dark p3 fa fa-shopping-cart fa-stack-2x fa-inverse" data-count="5"></i>
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

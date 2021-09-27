import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
const Login = (props) => {

    const [data, setData] = useState({ email: '', password: '' })

    const handleInputChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const showInvalidCrendentials = () => {
        if (!props.correctCredentials) {
            return (<small className="form-text text-danger">Correo o contraseña incorrectos.</small>)
        }
    }

    if (props.user) {
        return (<Redirect to="/"></Redirect>);
    }

    return (
        <div className="container mt-5">
            <h1>Iniciar sesión</h1>
            <div id="login-form" className="text-center m-3">
                <form onSubmit={e => { props.login(e, data) }}
                    className="form-signin border rounded">
                    <input type="email" onChange={e => handleInputChange(e)} id="inputEmail" name="email" className="form-control mb-1" placeholder="Correo electrónico" required="" autoFocus=""></input>
                    <input type="password" onChange={e => handleInputChange(e)} id="inputPassword" name="password" className="form-control mb-2" placeholder="Contraseña" required=""></input>
                    {showInvalidCrendentials()}
                    <button className="btn btn-lg btn-primary rounded-0 btn-block mt-2" type="submit">Iniciar sesión</button>
                    <hr />
                    <Link to='signUp'>
                        <button className="btn btn-md btn-outline-success rounded-0 btn-block mt-2" type="submit">Crear una cuenta</button>
                    </Link>
                </form>
            </div>
        </div>

    )
}

export default Login

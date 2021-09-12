import React, { useState } from 'react'
import { Redirect } from 'react-router'
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
        <div id="login-form" className="text-center m-3">
            <form onSubmit={e => {props.login(e, data)}}
                className="form-signin shadow-sm rounded mt-md-4">
                <h1 className="h3 mb-3 font-weight-normal">Iniciar sesión</h1>
                <label htmlFor="inputEmail" className="sr-only">Correo electrónico</label>
                <input type="email" onChange={e => handleInputChange(e)} id="inputEmail" name="email" className="form-control" placeholder="Correo electrónico" required="" autoFocus=""></input>
                <label htmlFor="inputPassword" className="sr-only">Contraseña</label>
                <input type="password" onChange={e => handleInputChange(e)} id="inputPassword" name="password" className="form-control mb-2" placeholder="Contraseña" required=""></input>
                {showInvalidCrendentials()}
                <button className="btn btn-lg btn-success btn-block mt-2" type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}

export default Login

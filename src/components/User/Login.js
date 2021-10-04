import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
const Login = (props) => {

    const [data, setData] = useState({ email: '', password: '', remenberMe: false })

    const handleInputChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const showInvalidCrendentials = () => {
        if (!props.correctCredentials) {
            return (<small className="form-text text-danger">El correo o contraseña son incorrectos.</small>)
        }
    }

    if (props.user !== null && props.user !== 'LOADING_USER' ) {
        return (<Redirect to="/"></Redirect>);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                            <h3 className="text-center font-weight-light my-4">
                                Iniciar sesión
                            </h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={e => props.login(e, data)}>
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">
                                        Email
                                    </label>
                                    <input required className="form-control py-4" onChange={e => handleInputChange(e)} id="inputEmailAddress" name="email" placeholder="Ingresa el correo" type="email" />
                                </div>
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputPassword">
                                        Contraseña
                                    </label>
                                    <input required onChange={e => handleInputChange(e)} name='password' className="form-control py-4" id="inputPassword" placeholder="Ingresa la contraseña" type="password" />
                                    {showInvalidCrendentials()}
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input onChange={() => setData({...data, remenberMe: !data.remenberMe})} checked={data.remenberMe} name='remenberMe' className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                        <label className="custom-control-label" htmlFor="rememberPasswordCheck">
                                            Recuerdame
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <Link className="small" to="">
                                        ¿Olvidaste la contraseña?
                                    </Link>
                                    {
                                        props.user === 'LOADING_USER' ?
                                            <button disabled type='submit' className="btn btn-primary">
                                                Iniciar sesión
                                                <span className="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </button>
                                            :
                                            <button type='submit' className="btn btn-primary">
                                                Iniciar sesión
                                            </button>
                                    }
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <div className="small">
                                <Link to='signUp'>
                                    ¿No tienes cuenta? Crea una aquí
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

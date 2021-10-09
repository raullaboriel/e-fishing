import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [data, setData] = useState({email: ''});

    const handleInputChange = (e) => {
        setData({
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                            <h3 className="text-center font-weight-light my-4">
                                Ayuda con la contraseña
                            </h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputFirstName">
                                                Correo
                                            </label>
                                            <input required onChange={e => handleInputChange(e)} value={data.email} className="form-control py-4" name="email" placeholder="Ingresa el correo" type="email" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-0">
                                    <button type='submit' className="btn btn-primary btn-block">
                                        Continuar
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <div className="small">
                                <Link to='/login' href="#.">
                                    Regresar al inicio de sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

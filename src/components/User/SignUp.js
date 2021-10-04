
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SignUp = (props) => {

    const [data, setData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isValidPass, setIsValidPass] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [showCorrectlySigned, setShowCorrectlySigned] = useState(false);

    const validateEmail = async () => {
        axios.post('https://localhost:5001/users/validate', { email: data.email.trim() })
            .then(response => {
                if (response.data) { //if response.data !== null
                    setIsValidEmail(false);
                } else {
                    setIsValidEmail(true);
                }
            })
    }

    useEffect(() => {
        if (
            (data.password !== '' || data.confirmPassword !== '') && (data.password !== data.confirmPassword)) {
            setIsValidPass(false);
        } else {
            setIsValidPass(true);
        }
    }, [data])

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const singUp = async (e) => {
        e.preventDefault();
        if (isValidPass && isValidEmail && data.password.length >= 8) {
            const user = {
                id: 0,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                admin: false
            };
            await axios.post('https://localhost:5001/users/register', user)
                .then(response => {
                    setIsValidEmail(true);
                    setShowCorrectlySigned(true);
                })
                .catch(ex => {
                    setIsValidEmail(false);
                    console.log(ex);
                })
        }
    }

    if (showCorrectlySigned) {
        return (
            <div className="container mt-5">
                <h1>
                    Te has registrado correctamente.
                </h1>
                <Link to='/login'>Ir a iniciar sesión</Link>
            </div>
        );
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                            <h3 className="text-center font-weight-light my-4">
                                Crear cuenta</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={e => singUp(e)} className="ng-untouched ng-pristine ng-valid">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputFirstName">
                                                Nombre
                                            </label>
                                            <input required onChange={e => handleInputChange(e)} className="form-control py-4" name="name" placeholder="Ingresa el nombre" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputLastName">
                                                Apellido
                                            </label>
                                            <input required onChange={e => handleInputChange(e)} className="form-control py-4" name="lastname" placeholder="Ingresa el apellido" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">
                                        Email
                                    </label>
                                    <input required onChange={e => handleInputChange(e)} onBlur={() => validateEmail()} aria-describedby="emailHelp" className="form-control py-4" name="email" placeholder="Ingresa el correo" type="email" />
                                    {!isValidEmail &&
                                        <small className="form-text text-danger">El correo no está disponible.</small>
                                    }
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputPassword">
                                                Contraseña
                                            </label>
                                            <input required onChange={e => handleInputChange(e)} className="form-control py-4" name="password" placeholder="Ingresa la contraseña" type="password" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputConfirmPassword">
                                                Confirmar contraseña
                                            </label>
                                            <input required onChange={e => handleInputChange(e)} className="form-control py-4" name="confirmPassword" placeholder="Confirma la contraseña" type="password" />
                                        </div>
                                    </div>
                                    {
                                        !isValidPass &&
                                        <div className="p-1">
                                            <small className="form-text text-danger">
                                                Las contraseñas no inciden
                                            </small>
                                        </div>
                                    }
                                    {
                                        (((data.password.length >= 1 && data.password.length < 8) || (data.confirmPassword.length >= 1 && data.confirmPassword.length < 8)) && isValidPass) &&
                                        <div className="p-1">
                                            <small className="form-text text-danger">
                                                La contraseña es muy corta
                                            </small>
                                        </div>
                                    }
                                </div>
                                <div className="form-group mt-4 mb-0">
                                    <button type='submit' className="btn btn-primary btn-block">
                                        Crear cuenta
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <div className="small">
                                <Link to='/login' href="#.">
                                    ¿Ya tienes cuenta? Inicia sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignUp;

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

    useEffect(() => {
        if ((data.password !== '' || data.confirmPassword !== '') && data.password !== data.confirmPassword) {
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
        <div className="d-flex mt-5 justify-content-center">
            <form onSubmit={e => singUp(e)} className="col-sm-12 col-md-7 col-lg-7 shadow-sm p-lg-5 p-3 m-lg-0 m-1" style={{ backgroundColor: 'whitesmoke' }}>
                <h1 className="pr-lg-3 pl-lg-3">Registrarse</h1>
                <div className="d-flex flex-row pr-lg-3 pl-lg-3">
                    <div className="flex-fill mr-2">
                        <input required onChange={e => handleInputChange(e)} type="text" className="form-control" name="name" placeholder="Nombre"></input>
                    </div>
                    <div className="flex-fill">
                        <input required onChange={e => handleInputChange(e)} type="text" className="form-control" name="lastname" placeholder="Apellido"></input>
                    </div>
                </div>
                <div className="mt-1 pr-lg-3 pl-lg-3">
                    <input required onChange={e => handleInputChange(e)} type="email" className="form-control" name="email" placeholder="Correo electrónico"></input>
                    {!isValidEmail && <small id="c" className="form-text text-danger">Correo electrónico no disponible</small>}
                </div>
                <div className="d-flex flex-row mt-1 pr-lg-3 pl-lg-3">
                    <div className="flex-fill mr-2">
                        <input required onChange={e => handleInputChange(e)} type="password" className="form-control" name="password" placeholder="Contraseña"></input>
                    </div>
                    <div className="flex-fill">
                        <input required onChange={e => handleInputChange(e)} type="password" className="form-control" name="confirmPassword" placeholder="Confirmar contraseña"></input>
                    </div>
                </div>
                
                {
                    !isValidPass &&
                    <div className=" pr-lg-3 pl-lg-3">
                        <small id="e" className="form-text text-danger">Las contraseñas no inciden</small>
                    </div>
                }
                {
                    (((data.password.length >= 1 && data.password.length < 8) || (data.confirmPassword.length >= 1 && data.confirmPassword.length < 8)) && isValidPass) &&
                    <div className=" pr-lg-3 pl-lg-3">
                        <small id="e" className="form-text text-danger">La contraseña es muy corta</small> 
                    </div>
                }
                <div className="mt-2 pr-lg-3 pl-lg-3">
                    <button type="submit" className="btn btn-lg btn-primary btn-block ">Crear cuenta</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
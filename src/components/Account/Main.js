import React, { useState } from 'react'
import Modal from 'react-modal'
import { Redirect } from 'react-router';
import EmailModal from './EmailModal';

Modal.setAppElement('#root')

const Main = (props) => {
    const [isOpen, setIsOpen] = useState({
        name: false,
        email: false,
        password: false
    });

    if(!props.user){
        return(
            <Redirect to='/'/>
        );
    }

    return (
        <div className="container mt-5">
            <EmailModal isOpen={isOpen.email} setIsOpen={setIsOpen}/>
            <h1 className="mb-4">
                Cuenta
            </h1>
            <section className="">
                <div className="mt-5">
                    <div className="d-flex justify-content-center">
                        <table className="table-bordered w-75 rounded">
                            <tbody>
                                <tr>
                                    <td className="border-right-0">
                                        <div className="d-inline-flex flex-column m-3">
                                            <span className="font-weight-bold">Nombre: </span>
                                            <span>{props.user.name} {props.user.lastname}</span>
                                        </div>
                                    </td>
                                    <td className="border-left-0 text-right">
                                        <div className="m-3">
                                            <button className="btn btn-light border ">
                                                Editar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-right-0">
                                        <div className="d-inline-flex flex-column m-3">
                                            <span className="font-weight-bold">E-mail: </span>
                                            <span>{props.user.email}</span>
                                        </div>
                                    </td>
                                    <td className="border-left-0 text-right">
                                        <div className="m-3">
                                            <button onClick={() => setIsOpen({...isOpen, email: true})} className="btn btn-light border">
                                                Editar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-right-0">
                                        <div className="d-inline-flex flex-column m-3">
                                            <span className="font-weight-bold">Contraseña: </span>
                                            <span>********</span>
                                        </div>
                                    </td>
                                    <td className="border-left-0 text-right">
                                        <div className="m-3">
                                            <button className="btn btn-light border">
                                                Editar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Main;
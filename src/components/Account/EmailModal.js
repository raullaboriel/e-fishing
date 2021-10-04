import React from 'react'
import Modal from 'react-modal'
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const EmailModal = (props) => {

    const [data, setData] = React.useState({
        email: props.user.email,
        password: ''
    });

    const [isValidPassword, setIsValidPassword] = React.useState(true);
    const [isValidEmail, setIsValidEmail] = React.useState(true);


    const handleInputChange = (e) => {
        if (e.target.name === 'email') {
            setIsValidEmail(true);
        }
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const clearData = () => {
        setData({
            email: props.user.email,
            password: ''
        })
    }

    const saveChanges = async (e) => {
        e.preventDefault();

        await axios.put('https://localhost:5001/users/email', data, { withCredentials: true })
            .then(response => {
                clearData();
                props.onUserSaveChanges();
                setIsValidPassword(true);
                props.setIsOpen({ ...props.isOpen, email: false });
            })
            .catch(() => setIsValidPassword(false));
    }

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

    return (
        <Modal
            isOpen={props.isOpen} style={customStyles}
            onAfterClose={() => clearData()}
        >
            <div className="modal-header">
                <h5 className='text-secondary mb-0'>Editar e-mail</h5>
                <button onClick={() => props.setIsOpen({ ...props.isOpen, email: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form onSubmit={e => saveChanges(e)}>
                <div className="modal-body">
                    <span className="font-weight-bold">E-mail: </span>
                    <input required onChange={e => handleInputChange(e)} value={data.email} onBlur={() => validateEmail()} type="email" className="form-control" name="email" />
                    {!isValidEmail && (data.email !== props.user.email) ? <small className="form-text text-danger">Lo sentimos, ese correo ya está en uso.</small> : null}
                    <span className="font-weight-bold">Contraseña: </span>
                    <input required disabled={data.email === props.user.email} onChange={e => handleInputChange(e)} value={data.password} type="password" className="form-control" name="password" />
                    {!isValidPassword && <small className="form-text text-danger">La contraseña es incorrecta.</small>}
                </div>
                <div className="modal-footer">
                    <button onClick={() => props.setIsOpen({ ...props.isOpen, email: false })} className="btn btn-primary">
                        Cancelar
                    </button>
                    <button disabled={data.email === props.user.email || !isValidEmail} type="submit" className="btn btn-light">
                        Guardar cambios
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default EmailModal

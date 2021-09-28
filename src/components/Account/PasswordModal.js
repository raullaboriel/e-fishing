import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'

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

const PasswordModal = (props) => {

    const [data, setData] = React.useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });


    const saveChanges = async (e) => {
        e.preventDefault();

        await axios.put('https://localhost:5001/users/EditEmail', data, { withCredentials: true })
            .then(response => {
                clearData();
                props.setIsOpen({...props.isOpen, name: false});
            });
    }

    const [isValidPass, setIsValidPass] = React.useState(true);
    React.useEffect(() => {
        if ((data.newPassword !== '' || data.confirmPassword !== '') && data.newPassword !== data.confirmPassword) {
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

    const clearData = () => {
        setData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }


    return (
        <Modal
            isOpen={props.isOpen} style={customStyles}
            onAfterClose={() => clearData()}
        >
            <div className="modal-header">
                <h5 className='text-secondary mb-0'>Editar contraseña</h5>
                <button onClick={() => props.setIsOpen({ ...props.isOpen, password: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form onSubmit={e => saveChanges(e)}>
                <div className="modal-body">
                    <div className='mb-1'>
                        <span className='font-weight-bold'>Contraseña actual: </span>
                        <input onChange={e => handleInputChange(e)} value={data.currentPassword} name='currentPassword' type="password" className="form-control" />
                    </div>
                    <div className='mb-1'>
                        <span className='font-weight-bold'>Nueva contraseña: </span>
                        <input onChange={e => handleInputChange(e)} value={data.newPassword} name='newPassword' type="password" className="form-control" />
                    </div>
                    <div className='mb-1'>
                        <span className='font-weight-bold'>Confirmar contraseña: </span>
                        <input onChange={e => handleInputChange(e)} value={data.confirmPassword} name="confirmPassword" type="password" className="form-control" />
                    </div>
                    <div>
                        {
                            !isValidPass &&
                            <div className=" ">
                                <small id="e" className="form-text text-danger">Las contraseñas no inciden</small>
                            </div>
                        }
                        {
                            (((data.newPassword.length >= 1 && data.newPassword.length < 8) || (data.confirmPassword.length >= 1 && data.confirmPassword.length < 8)) && isValidPass) &&
                            <div className=" ">
                                <small id="e" className="form-text text-danger">La contraseña es muy corta</small>
                            </div>
                        }
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={() => props.setIsOpen({ ...props.isOpen, password: false })} className="btn btn-primary">
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-light">
                        Guardar cambios
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default PasswordModal

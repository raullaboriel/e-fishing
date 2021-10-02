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

const NameModal = (props) => {
    const [data, setData] = React.useState({
        name: props.user.name,
        lastname: props.user.lastname
    })

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const clearData = () => {
        setData({
            name: props.user.name,
            lastname: props.user.lastname
        })
    }


    const saveChanges = async (e) => {
        e.preventDefault();

        await axios.put('https://localhost:5001/users/name', data, { withCredentials: true })
            .then(response => {
                clearData();
                props.onUserSaveChanges();
                props.setIsOpen({ ...props.isOpen, name: false });
            });
    }

    return (
        <Modal
            isOpen={props.isOpen} style={customStyles}
            onAfterClose={() => clearData()}
        >
            <div className="modal-header">
                <h5 className='text-secondary mb-0'>Editar nombre</h5>
                <button onClick={() => props.setIsOpen({ ...props.isOpen, name: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form onSubmit={e => saveChanges(e)}>
                <div className='modal-body'>
                    <div className='mb-1'>
                        <span className='font-weight-bold'>Nombre: </span>
                        <input required onChange={e => handleInputChange(e)} value={data.name} className='form-control' type='text' name='name' />
                    </div>
                    <div>
                        <span className='font-weight-bold'>Apellido: </span>
                        <input required onChange={e => handleInputChange(e)} value={data.lastname} className='form-control' type='text' name='lastname' />
                    </div>
                </div>
                <div className='modal-footer'>
                    <button onClick={() => props.setIsOpen({ ...props.isOpen, name: false })} className="btn btn-primary">
                        Cancelar
                    </button>
                    <button disabled={data.name === props.user.name && data.lastname === props.user.lastname} type="submit" className="btn btn-light">
                        Guardar cambios
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default NameModal

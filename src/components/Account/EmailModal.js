import React from 'react'
import Modal from 'react-modal'

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
    return (
        <Modal isOpen={props.isOpen} style={customStyles}>
            <div className="modal-header">
                <h5>Editar E-mail</h5>
                <button onClick={() => props.setIsOpen({...props.isOpen, email: false})} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <span>Nuevo correo</span>
                <input className="form-control"/>
                <span>Contraseña</span>
                <input className="form-control"/>
            </div>
        </Modal>
    )
}

export default EmailModal

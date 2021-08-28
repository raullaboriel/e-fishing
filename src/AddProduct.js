import React, { useEffect, useState } from 'react'

const AddProduct = (props) => {
    const [showAlert, setShowAlert] = useState (false);

    useEffect(() => {
        if(showAlert){
            window.setTimeout(()=>{
            setShowAlert(false)
            }, 5000)
        }
    }, [showAlert])

    const onShowAlert = () =>{
        setShowAlert(true);
    }

    const [data, setData] = useState({
        id: '',
        name: '',
        brand: '',
        price: '',
        model: '',
        description: '',
        images: [],
        category: '',
        size: '',
        weight: ''
    });

    const handleDataChange = e => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const alert = () => {
        return(
            <div className="alert alert-success" role="alert">
                Producto agregado correctamente.
            </div>
        )
    }

    const addProduct = (e) => {
        e.preventDefault();
        let currentList = props.productsList;
        
        setData({
            ...data,
            id: Math.floor(Math.random() * (1000000 - 1) + 1)
        })

        currentList.push(data);
        props.setProductsList(currentList);
        setData({
            id: '',
            name: '',
            brand: '',
            price: '',
            model: '',
            description: '',
            images: [],
            category: '',
            size: '',
            weight: ''
        })
        onShowAlert();
    }

    return (
        <div className="container mt-5">
            <h1>Agregar producto</h1>
            {
            showAlert && alert()
            }
            <div className="mt-3">
                <form onSubmit={e => addProduct(e)} className='d-flex flex-column'>
                    <div className='d-flex flex-md-row flex-column mb-md-3'>
                        <div className='flex-fill mr-md-2'>
                            <small><b><span>Nombre</span></b></small>
                            <input required onChange={e => handleDataChange(e)} value={data.name} name='name' className='form-control mb-md-0 mb-2' type='text' placeholder='Escriba un nombre' />
                        </div>
                        <div className='flex-fill'>
                            <small><b><span>Marca</span></b></small>
                            <input required onChange={e => handleDataChange(e)} value={data.brand} name='brand' className='form-control mb-md-0 mb-2' type='text' placeholder='Escriba la marca' />
                        </div>
                    </div>

                    <div className='d-flex flex-md-row flex-column mb-md-3'>
                        <div className='flex-fill mr-md-2'>
                            <small><b><span>Precio</span></b></small>
                            <input required onChange={e => handleDataChange(e)} value={data.price} step='.01' name='price' className='form-control mb-md-0 mb-2' type='number' placeholder='Escriba el precio' />
                        </div>
                        <div className='flex-fill'>
                            <small><b><span>Modelo</span></b></small>
                            <input required onChange={e => handleDataChange(e)} value={data.model} name='model' className='form-control mb-md-0 mb-2' type='text' placeholder='Escriba el modelo' />
                        </div>
                    </div>

                    <div className='d-flex flex-column mb-md-2'>
                        <small><b><span>Descripcion</span></b></small>
                        <textarea required onChange={e => handleDataChange(e)} value={data.description} name='description' className='form-control mb-md-0 mb-2' placeholder='Escriba una descripcion' />
                    </div>

                    <div>
                    <small><b><span>Selecciona una imagen</span></b></small>
                    <div className='d-flex flex-md-row flex-column mb-md-3'>
                            <input type="file" className='flex-fill mb-md-0 mb-3' multiple={false} onChange={e => handleDataChange(e)} name='image' accept='.jpeg, .png, .jpg, .imv' alt='Pick image' />
                            <button type='submit' className='btn form-control btn-success mt-md-0 flex-fill col-md-8 col-12'>Agregar producto</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct

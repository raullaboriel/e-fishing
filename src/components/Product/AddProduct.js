import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AddProduct = (props) => {

    const [showAlert, setShowAlert] = useState(false);
    const [images, setImages] = useState(null);
    const [data, setData] = useState({
        name: '',
        brand: '',
        price: '',
        category: '',
        model: '',
        description: '',
        size: '',
        weight: '',
        stock: '',
    });
    

    useEffect(() => {
        onShowAlert();
    })

    const onShowAlert = () => {
        if (showAlert) {
            window.setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
    }

    const alert = () => {
        return (
            <div className="alert alert-success" role="alert">
                Producto agregado correctamente.
            </div>
        )
    }

    const handleDataChange = e => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const addProduct = async (e) => {
        try {
            e.preventDefault();
            let product = data;
            product.price = parseFloat(product.price);
            product.weight = parseFloat(product.weight);
            product.size = parseFloat(product.size);
            product.stock = parseInt(product.stock);
            
            setData(product);

            const response = await axios.post('https://localhost:5001/products', data, { withCredentials: true });
            if (response.status === 200) {
                setShowAlert(true);
                setData({
                    name: '',
                    brand: '',
                    price: '',
                    model: '',
                    description: '',
                    category: '',
                    size: '',
                    weight: '',
                    stock: ''
                })
            }
            for (let index = 0; index < images.length; index++) {
                uploadImage(response.data, images[index]);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const uploadImage = async (id, image) => {
        let data = new FormData();
        data.append('file', image);
        await axios.post(`https://localhost:5001/images/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }).catch(e => {console.log(e)});
    }

    const getFiles = (e) => {
        e.preventDefault();
        setImages(e.target.files);
    }

    return (
        <div className="container mt-5">
            <h1>Agregar producto</h1>
            {showAlert && alert()}
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

                    <div className='d-flex flex-md-row flex-column mb-md-3'>
                        <div className='flex-fill mr-md-2'>
                            <small><b><span>Categoria</span></b></small>
                            <input required onChange={e => handleDataChange(e)} value={data.category} name='category' className='form-control mb-md-0 mb-2' type='text' placeholder='Escriba la categoria' />
                        </div>
                        <div className='flex-fill'>
                            <small><b><span>Tamaño</span></b></small>
                            <input required onChange={e => handleDataChange(e)} value={data.size} name='size' className='form-control mb-md-0 mb-2' type='number' step=".001" placeholder='Escriba el tamaño' />
                        </div>
                    </div>

                    <div className='d-flex flex-md-row flex-column mb-md-3'>
                        <div className='flex-fill mr-md-2'>
                            <small><b><span>Peso</span></b></small>
                            <input required onChange={e => handleDataChange(e)} value={data.weight} step='.01' name='weight' className='form-control mb-md-0 mb-2' type='number' placeholder='Escriba el peso' />
                        </div>
                        <div className='flex-fill'>
                            <small><b><span>Existencias</span></b></small>
                            <input required onChange={e => handleDataChange(e)} value={data.stock} name='stock' className='form-control mb-md-0 mb-2' type='number' placeholder='Escriba las existencias' />
                        </div>
                    </div>

                    <div className='d-flex flex-column mb-md-2'>
                        <small><b><span>Descripcion</span></b></small>
                        <textarea required onChange={e => handleDataChange(e)} value={data.description} name='description' className='form-control mb-md-0 mb-2' placeholder='Escriba una descripcion' />
                    </div>

                    <div>
                        <small><b><span>Selecciona una imagen</span></b></small>
                        <div className='d-flex flex-md-row flex-column mb-md-3'>
                            <input type="file" className='flex-fill mb-md-0 mb-3' multiple={true} onChange={e => getFiles(e)} name='image' accept='.jpeg, .png, .jpg, .imv' alt='Pick image' />
                            <button type='submit' className='btn form-control btn-success mt-md-0 flex-fill col-md-8 col-12'>Agregar producto</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct

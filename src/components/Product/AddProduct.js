import axios from 'axios';
import React, { useState } from 'react'
import { Redirect } from 'react-router'

const AddProduct = (props) => {

    const [images, setImages] = useState(null);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [category, setCategory] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const [data, setData] = useState({
        name: '',
        brand: '',
        price: '',
        category: '',
        model: '',
        description: '',
        size: '',
        weight: '',
        stock: ''
    });

    const handleDataChange = e => {
        console.log(e.target.name, e.target.value)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
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

            await axios.post('https://localhost:5001/products', data, { withCredentials: true })
                .then(response => {
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

                    if (images != null) {
                        for (let index = 0; index < images.length; index++) {
                            uploadImage(response.data, images[index]);
                        }
                    }

                    onShowAlert();
                });
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
        }).catch(e => { console.log(e) });
    }

    const getFiles = (e) => {
        e.preventDefault();
        setImages(e.target.files);
    }

    const onAddCategory = () => {
        setShowAddCategory(false);

        if (category !== '') {
            let currentCategories = props.categories;
            currentCategories.push(category);
            props.setCategories([...currentCategories]);
            setCategory('');
        }
    }

    const onShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000)
    }


    const categorySection = () => {
        if (!showAddCategory) {
            return (
                <div className="row align-items-center">
                    <div className='col mr-md-1'>
                        <select required onChange={e => handleDataChange(e)} className="custom-select" id="inputGroupSelect01" name='category'>
                            <option value={''}>Selecciona una categoria</option>
                            {props.categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
                        </select>
                    </div>
                    <div className="col">
                        <button type="button" onClick={() => setShowAddCategory(true)} className="btn btn-link row align-items-center">
                            <i className="text-primary mr-2 fa fa-plus" aria-hidden="true"></i>
                            <span>Agregar categoria</span>
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <div className="flex-fill ">
                <div className="d-flex flex-row">
                    <div className="input-group">
                        <input onChange={(e) => handleCategoryChange(e)} value={category} type="text" className="form-control" placeholder="Escriba la categoria" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                        <div className="input-group-append">
                            <button onClick={() => onAddCategory()} className="btn btn-outline-success" type="submit" id="button-addon2">
                                Agregar categoria
                            </button>
                        </div>
                    </div>
                    <button onClick={() => setShowAddCategory(false)} type="button" className="btn btn-link">Seleccinar</button>
                </div>
            </div>
        )
    }

    if (props.user === null || props.user.admin === false) {
        return (<Redirect to='/'></Redirect>);
    }

    return (
        <div className="container mt-5">
            <h1>Agregar producto</h1>

            {showAlert &&
                <div className="alert alert-success" role="alert">
                    <i className="fa fa-check" aria-hidden="true"></i> Producto agregado correctamente.
                </div>
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

                    <div className='d-flex flex-lg-row flex-md-row flex-column mb-md-3'>
                        <div className="flex-fill col pl-0 pr-0 mr-md-2">
                            <small><b><span>Categoria</span></b></small>
                            {categorySection()}
                        </div>
                        <div className='col flex-fill p-0'>
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

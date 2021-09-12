import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';

const ProductPreview = (props) => {
    const { id } = useParams();
    const [amount, setAmount] = useState(1);
    const [showMore, setShowMore] = useState(false);

    const handleAmountChange = (e) => {
        e.preventDefault();
        setAmount(e.target.value);
    }

    const [product, setProduct] = useState({
        id: 0,
        name: '',
        brand: '',
        price: '',
        model: '',
        description: '',
        category: '',
        size: '',
        weight: '',
        stock: '',
        image: []
    });

    const carouselImage = (imageUri, index) => {
        if (index === 0) {
            return (
                <div key={index} className="carousel-item active">
                    <img alt='' className="d-block image-fluid w-100 img-big-wrap" src={imageUri} data-holder-rendered="true"></img>
                </div>
            )
        } else {
            return (
                <div key={index} className="carousel-item">
                    <img alt='' className="d-block image-fluid w-100 img-big-wrap" src={imageUri} data-holder-rendered="true"></img>
                </div>
            )
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`https://localhost:5001/products/${id}`);
                const image = await axios.get(`https://localhost:5001/images/${id}`);
                const product = response.data;
                product['image'] = image.data;
                product['amount'] = 0;
                setProduct(product);
            } catch (e) {
                console.log(e);
            }
        }
        if (product.description.length > 550) {
            setShowMore(true);
        }
        getProduct();
    }, [id, product.description.length]);

    if (product.name === '' || !product.image.uris) {
        return (<div></div>)
    }

    const onShowMore = (e) => {
        e.preventDefault();
        setShowMore(!showMore)
    }

    return (
        <section>
            <div className="px-4 px-lg-5 py-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <div id="carouselExampleCaptions" className="carousel slide" data-interval="false">
                            <div className="carousel-inner p-5">
                                {product.image.uris.map((uri, index) => carouselImage(uri, index))}
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                <span className="fa fa-chevron-left" style={{ color: 'black', fontWeight: 'bold' }} aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" style={{ color: 'black' }} href="#carouselExampleCaptions" role="button" data-slide="next">
                                <span className="fa fa-chevron-right" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 className="display-5 fw-bolder font-weight-bold h1">{product.name}</h1>
                        <div className="d-flex flex-row mb-3">
                            <div className="mb-1 bg-light font-weight-bold col-lg-3 mr-lg-2 mr-2 col-5 text-center rounded">{product.weight} g</div>
                            <div className="mb-1 bg-light font-weight-bold col-lg-3 mr-lg-2 mr-2 col-5 text-center rounded">{product.size} cm</div>
                        </div>
                        <div className="fs-5 mb-3">
                            {/*<span className="text-decoration-line-through">$45.00</span>*/}
                            <span className="font-weight-bold h5">${product.price}</span>
                        </div>

                        <div className="d-flex mb-3">
                            <input className="form-control text-center me-3 mr-1" onChange={e => handleAmountChange(e)} disabled={product.stock <= 0} id="inputQuantity" type="num" value={amount} style={{ maxWidth: "3rem" }}></input>
                            <button className="btn btn-primary flex-shrink-0" onClick={() => props.addToCart(product, amount)} disabled={product.stock <= 0} type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Agregar al carrito
                            </button>
                        </div>

                        {showMore ?
                            <div style={{ height: '245px', overflow: 'hidden' }}><p className="lead">{product.description}</p></div>
                            :
                            <div><p className="lead">{product.description}</p></div>
                        }
                        <a className="text-secondary" href="." onClick={e => onShowMore(e)} >
                            {product.description.length > 550 && { ...showMore ? <span>Ver mas...</span> : <span>Ver menos...</span> }}
                        </a>

                        {product.stock <= 0 && <div className="pt-2"><span className="text-warning h6">No disponible</span></div>}
                    </div>
                </div>
            </div>
        </section>
        /* 
        Productos sugeridos
        <section className="py-5 bg-light">
            <div className="container px-4 px-lg-5 mt-5">
                <h2 className="fw-bolder mb-4">Related products</h2>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div className="col mb-5">
                        <div className="card h-100">
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."></img>
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">Fancy Product</h5>
                                    $40.00 - $80.00
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href=".">View options</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            <div className="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "0.5rem"}}>Sale</div>
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."></img>
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">Special Item</h5>
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    <span className="text-muted text-decoration-line-through">$20.00</span>
                                    $18.00
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href=".">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            <div className="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "0.5rem"}}>Sale</div>
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."></img>
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">Sale Item</h5>
                                    <span className="text-muted text-decoration-line-through">$50.00</span>
                                    $25.00
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href=".">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."></img>
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">Popular Item</h5>
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    $40.00
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href=".">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */
    )
}

export default ProductPreview
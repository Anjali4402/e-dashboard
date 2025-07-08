import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const displayedData = [
    { id: 1, name: 'name', label: "Proudct Name", type: "text" },
    { id: 2, name: 'price', label: "Price", type: "text" },
    { id: 3, name: 'category', label: "Category", type: "text" },
    { id: 4, name: 'company', label: "Company Name", type: "text" },
]

const AddProduct = () => {

    // is we are in edit mode or not
    const [isEditMode, setIsEditMode] = useState(false)

    // assign useParms and useNavigate and useLocation
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // current pathname
    const { pathname } = location;

    // check if we have '/edit' in the url then we in the edit mode
    useEffect(() => {
        if (pathname.startsWith("/edit")) {
            // set the value of isEditMode true
            setIsEditMode(true)
        }
    }, [pathname]);


    // if we have id in params then call the api and get the product details by id
    useEffect(() => {
        if (params._id) {
            handleGetProductById(params._id)
        }
    }, [params._id])


    // get userId form localstorage 
    const userData = localStorage.getItem("user");

    // parse user id
    let userId = JSON.parse(userData);
    userId = userId._id;


    // handle add product api call.
    const handleAddProductApi = async () => {
        try {
            let response = await fetch('http://localhost:5000/add-product', ({
                method: 'POST',
                body: JSON.stringify({
                    name: productData?.name,
                    price: productData?.price,
                    category: productData?.category,
                    userId: userId,
                    company: productData?.company
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            }));

            response = await response.json();
            console.log(response)



        } catch (error) {
            console.log(error)
        }

    };


    // handle update product api call
    const handleUpdateProductApi = async () => {
        try {
            let response = await fetch(`http://localhost:5000/update-product/${params._id}`, {
                setProductData,
                method: 'PUT',
                body: JSON.stringify({
                    name: productData?.name,
                    price: productData?.price,
                    category: productData?.category,
                    userId: userId,
                    company: productData?.company
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });

            response = await response.json();
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    // handle get product by id api call
    const handleGetProductById = async (_id) => {
        try {
            let response = await fetch(`http://localhost:5000/product-details/${_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            response = await response.json();

            console.log(response);
            setProductData({
                name: response?.name,
                price: response?.price,
                category: response?.category,
                company: response?.company
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [productData, setProductData] = useState({
        name: "",
        price: '',
        category: '',
        company: ""
    })

    // store the error
    const [error, setError] = useState(false)

    // handle input change
    const hanldeInputProduct = (event) => {
        const { name, value } = event.target;

        setProductData({
            ...productData,
            [name]: value
        })
    };


    // handle submit userdata
    const handleSubmitData = async (event) => {

        event.preventDefault();

        if (!productData?.name || !productData?.price || !productData?.category || !productData?.company) {
            setError(true);
            console.error('not all feild added')
            return false;
        }

        // check are we updating the product or adding
        if (isEditMode) {
            await handleUpdateProductApi();

        } else {
            await handleAddProductApi();
        }
        clearData();
        navigate("/")
    }


    // clear the data
    const clearData = () => {
        setProductData({
            name: "",
            price: "",
            category: "",
            company: ""
        })
    }


    // render ui
    return (
        <div className='signup-box' >
            <h1>
                {
                    isEditMode ? 'Edit Product' : 'Add New Product'
                }</h1>

            <form onSubmit={handleSubmitData}>

                {
                    displayedData.map((field) => {

                        return (
                            <React.Fragment key={field.id}  >
                                <div className='formData-div' >
                                    <label htmlFor={field.name}>{field?.label}</label>
                                    <input
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        value={productData[field.name]}
                                        onChange={(event) => { hanldeInputProduct(event) }}
                                        // required
                                        placeholder={`Enter ${field.label}`}
                                    />
                                </div>

                                {
                                    error && !productData[field.name] && <span className="error-msg" >Enter {field.label}</span>
                                }


                            </React.Fragment>
                        )

                    })
                }




                <div className='button-div' >
                    <button
                        type='button'
                        onClick={clearData}
                    >
                        Reset
                    </button>

                    <button
                        type='submit'
                    >
                        Submit
                    </button>

                </div>



            </form>

        </div>
    )
};


export default AddProduct;
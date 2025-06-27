import React, { useState } from "react";


const displayedData = [
    { id: 1, name: 'name', label: "Proudct Name", type: "text" },
    { id: 2, name: 'price', label: "Price", type: "text" },
    { id: 3, name: 'category', label: "Category", type: "text" },
    { id: 4, name: 'company', label: "Company Name", type: "text" },
]

const AddProduct = () => {


    // get userId form localstorage 
    const userData = localStorage.getItem("user");


    let userId = JSON.parse(userData);
    userId = userId._id;


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
                }
            }));

            response = await response.json();



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

    const [error , setError] = useState(false)

    const hanldeInputProduct = (event) => {
        const { name, value } = event.target;

        setProductData({
            ...productData,
            [name]: value
        })
    };


    const handleSubmitData = async (event) => {

        event.preventDefault();

        if(!productData?.name || !productData?.price || !productData?.category || !productData?.company){
            setError(true);
            console.error('not all feild added')
            return false;
        }

        await handleAddProductApi();
        clearData();
    }

    const clearData = () => {
        setProductData({
            name: "",
            price: "",
            category: "",
            company: ""
        })
    }


    return (
        <div className='signup-box' >
            <h1>Add New Product</h1>

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
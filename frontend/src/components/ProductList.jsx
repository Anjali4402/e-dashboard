import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";


const ProductList = () => {


    const [products, setProducts] = useState([]);

    const [selectedProdcut, setSelectedProduct] = useState('');

    const handleFetchProudct = async () => {

        try {
            let response = await fetch("http://localhost:5000/products");

            response = await response.json();

            setProducts(response)

        } catch (error) {
            console.warn(error)
        }

    };
    

    // hanlde delete product api
    const handleDeleteProduct = async (_id) => {
        try{
            let response = await fetch(`http://localhost:5000/delete-product/${_id}` , {
                method : "DELETE",
                headers : {
                    'content-type' : "application/json"
                }
            })
            response = await response.json();
            if(response?.acknowledged){
                handleFetchProudct();
            }
        }catch(error){
            console.error(error)
        }
    }


    // handle update product api 
    const handleUpdateProduct = async(editedData) => {
        try {
            let response = await fetch (`http://localhost:5000/update-product/${selectedProdcut?._id}` , {
                method :"PUT",
                body : editedData,
                headers : {
                    'content-type' : "application/json"
                }
            } )
            response = await response.json();
            if(response?.acknowledged){
                handleFetchProudct();
            }
        }catch(error){
            console.error(error)
        }
    }


    useEffect(() => {

        handleFetchProudct();
    }, []);



    const handleClickEdit = (product) => {

        console.log(product)
        setSelectedProduct(product)

    }


    return (
        <div>

            <h1 className='heading' >Products</h1>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        {/* <th>UserId</th> */}
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products && products.length > 0 &&
                        products.map((product) => {
                            return (
                                <tr key={product._id} >
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.company}</td>
                                    <td>
                                        <RiDeleteBinLine
                                        onClick={() => {handleDeleteProduct(product?._id)} }
                                         size={20} color='red' />

                                         <MdModeEditOutline
                                         onClick={()=>{handleClickEdit(product)}}
                                         size={20}
                                         />
                                    </td>
                                </tr>
                            )

                        })
                    }

                </tbody>

                <tr>
                    <th></th>
                </tr>

            </table>



        </div>
    )
}

export default ProductList
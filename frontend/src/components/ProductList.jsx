import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";

const ProductList = () => {


    const [products, setProducts] = useState([]);

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


    useEffect(() => {

        handleFetchProudct();
    }, [])


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
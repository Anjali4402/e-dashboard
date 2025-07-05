import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Search from './Search';


const ProductList = () => {

    const navigate = useNavigate();

    // store all product data
    const [products, setProducts] = useState([]);

    // call fetch all product api
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


    // handle Search Product api
    const handleSearchProductApi = async(key)=> {
        try{
            let response = await fetch(`http://localhost:5000/search/${key}`, {
                method:'GET',
                headers : {
                    'content-type' : "application/json"
                }
            });

            response = await response.json();
            // set response data into the proudct list
            setProducts(response)

        }catch(error){
            console.error(error)
        }
    }

  

    // initally page render call fetch all product api.
    useEffect(() => {
        handleFetchProudct();
    }, []);



    // handle click on edit icon
    const handleClickEdit = (product) => {
        navigate(`edit/${product._id}`)
    };

    // handle Seach product 
    const handleSearchProduct = async(result) => {
       if(result.length >= 1){
        await handleSearchProductApi(result)
       }
       else{
        handleFetchProudct()
       }
    }


    return (
        <div>

            <h1 className='heading' >Products</h1>


            <Search handleSearch={handleSearchProduct} />
            

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
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
                                         style={{marginLeft:'20px'}}
                                         onClick={()=>{handleClickEdit(product)}}
                                         size={20}
                                         />
                                    </td>
                                </tr>
                            )

                        })
                    }

                </tbody>

               

            </table>



        </div>
    )
}

export default ProductList
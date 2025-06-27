import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

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
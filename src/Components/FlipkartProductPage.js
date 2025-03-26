// src/components/ProductPage.jsx

import React from 'react';
import useFetchProducts from '../hooks/useFetchProducts';

const FlipkartProductPage = () => {
    const { products, loading, error } = useFetchProducts('https://fakestoreapi.com/products');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Flipkart Products</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h2>{product.title}</h2>
                        <p>Price: ${product.price}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlipkartProductPage;
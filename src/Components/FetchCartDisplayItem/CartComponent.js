// CartComponent.js
import React, { useEffect, useState } from 'react';

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('https://dummyjson.com/carts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCartItems(data.carts); // Assuming the API returns an array of carts
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError(true);
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occurred while fetching cart items.</div>;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                {cartItems.map(item => (
                    <>
                        {item.products.map(product => (
                            <li key={product.id}>
                                <h2>{product.title}</h2>
                                <p>Price: ${product.price}</p>
                                <p>Quantity: {product.quantity}</p>
                            </li>
                        ))}
                    </>
                ))}
            </ul>
        </div>
    );
};

export default CartComponent;
// src/hooks/useFetchProducts.js

import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchProducts = (url) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [url]);

    return { products, loading, error };
};

export default useFetchProducts;
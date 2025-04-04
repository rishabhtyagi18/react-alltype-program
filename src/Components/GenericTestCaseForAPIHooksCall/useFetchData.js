// Custom Hook
// src/hooks/useFetchData.js
import { useEffect, useState } from 'react';
import { getData } from './api';

export const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      getData(url)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, [url]);
  
    return { data, loading, error };
  };

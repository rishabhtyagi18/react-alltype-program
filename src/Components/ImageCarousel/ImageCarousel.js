import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';

const ImageCarousel = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('https://api.thedogapi.com/v1/images/search?limit=10');
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            {/* Carousel component will go here */}
            <Carousel photos={photos} />
        </div>
    );
};

export default ImageCarousel;
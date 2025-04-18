import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel = ({ photos }) => {
    const [emblaRef] = useEmblaCarousel();

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {photos.map((photo, index) => (
                    <div className="embla__slide" key={index}>
                        <img src={photo.url} alt={`Dog ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
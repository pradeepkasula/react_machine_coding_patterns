import { useState } from 'react';
import './Carousel.css';
import CarouselItem from './CarouselItem';

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide(slide === data.length - 1 ? 0 : slide + 1);
  const prevSlide = () => setSlide(slide === 0 ? data.length - 1 : slide - 1);

  return (
    <div className='carousel'>
      <button className='arrow arrow-left' onClick={prevSlide}>
        ◀️
      </button>
      {data.map((slideItem, index) => {
        return (
          <CarouselItem
            key={slideItem.id} // Assuming each slideItem has a unique 'id'
            imgSrc={slideItem.imgSrc}
            alt={slideItem.alt}
            isActive={slide === index}
          />
        );
      })}

      <button className='arrow arrow-right' onClick={nextSlide}>
        ▶️
      </button>
      <div className='indicators'>
        {data.map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${slide !== idx ? 'indicator-inactive' : ''}`}
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

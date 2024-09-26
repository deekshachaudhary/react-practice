import { useEffect, useState } from 'react';
import './ImageCarousel.css';
import classNames from 'classnames';

// https://www.greatfrontend.com/questions/user-interface/image-carousel/react
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(prevVal => (prevVal > 0 ? prevVal - 1 : images.length - 1));
  }

  const handleNext = () => {
    setCurrentIndex(prevVal => (prevVal < images.length - 1 ? prevVal + 1 : 0));
  }

  return (
    <div className="image-carousel">
      <header>Image Carousel</header>
      <div className="image-carousel__container">
        <img
          className="image-carousel__img"
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        >
        </img>
        <button
          className="image-carousel__btn image-carousel__btn--prev"
          onClick={handlePrevious}
        >
          {'\u02c2'}
        </button>
        <button
          className="image-carousel__btn image_carousel__btn--next"
          onClick={handleNext}
        >
          {'\u02c3'}
        </button>
      </div>
      <div className="image-carousel__pages">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={classNames(
              'image-carousel__pages__button',
              { 'image-carousel__pages__button--active': i === currentIndex }
            )}
          >
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;

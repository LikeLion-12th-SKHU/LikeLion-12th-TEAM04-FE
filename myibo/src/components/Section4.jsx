// src/components/MainContent4-1.jsx
import React, { useState } from 'react';
import '../styles/Section4.css';
import slide1 from '../img/Section4-1.png';
import slide2 from '../img/Section4-2.png';
import slide3 from '../img/Section4-3.png';

const slides = [
  { id: 1, image: slide1 },
  { id: 2, image: slide2 },
  { id: 3, image: slide3 },
];

function MainContent41() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
      
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={prevSlide}>
        이전
      </button>
      <button className="carousel-button next" onClick={nextSlide}>
        다음
      </button>
    </div>
  );
}

export default MainContent41;

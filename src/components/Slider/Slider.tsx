import React, { cloneElement, useEffect, useRef } from 'react';
import { useState } from 'react';
import { sliderInfo } from '../../data';

import styles from './Slider.module.css';

const POSTER_WIDTH = 700;
const TRANSITION_DURATION = 300;
const AUTO_SLIDE_INTERVAL = 7000;

export const Slider = () => {
  const [posters, setPosters] = useState([...sliderInfo]);
  const [offset, setOffset] = useState(-POSTER_WIDTH);
  const [transitionDuration, setTransitionDuration] = useState(TRANSITION_DURATION);
  const [currentSlide, setCurrentSlide] = useState(1);

  const [isArrowDisabled, setIsArrowDisabled] = useState(false);

  useEffect(() => {
    setPosters([...sliderInfo, ...sliderInfo, ...sliderInfo]);
  }, []);

  useEffect(() => {
    if (offset === 0) {
      setTransitionDuration(0);
      setCurrentSlide(posters.length / 3);
      setOffset(-(POSTER_WIDTH * currentSlide));
      return;
    }

    if (offset === -(POSTER_WIDTH * (posters.length - 1))) {
      setTransitionDuration(0);
      setCurrentSlide(1);
      setOffset(-POSTER_WIDTH);
      return;
    }
  }, [offset, posters]);

  useEffect(() => {
    if (transitionDuration === 0) {
      setTimeout(() => {
        setTransitionDuration(TRANSITION_DURATION);
      }, 0);
    }
  }, [transitionDuration]);

  const handleLeftClick = () => {
    if (!isArrowDisabled) {
      setOffset((currentOffset) => {
        const newOffset = currentOffset + POSTER_WIDTH;
        return newOffset;
      });
      setIsArrowDisabled(true);

      // Разблокировать стрелку через 2 секунды
      setTimeout(() => {
        setIsArrowDisabled(false);
      }, 2000);
    }
  };

  const handleRightClick = () => {
    if (!isArrowDisabled) {
      setOffset((currentOffset) => {
        const newOffset = currentOffset - POSTER_WIDTH;
        return newOffset;
      });
      setIsArrowDisabled(true);

      // Разблокировать стрелку через 2 секунды
      setTimeout(() => {
        setIsArrowDisabled(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      handleRightClick();
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      clearInterval(autoSlideInterval);
    };
  }, []);

  return (
    <section className={styles.slider}>
      <div className={styles.window}>
        <div
          className={styles.allImageContainer}
          style={{
            transitionDuration: `${transitionDuration}ms`,
            transform: `translateX(${offset}px)`,
          }}>
          {posters.map((poster, posterIndex) => (
            <a href="#" className={styles.link} key={posterIndex}>
              <img className={styles.image} src={poster.image} alt="" />
            </a>
          ))}
        </div>
      </div>

      <button
        className={`${styles.arrow} ${styles.leftArrow}`}
        onClick={handleLeftClick}
        disabled={isArrowDisabled}>
        &#10094;
      </button>
      <button
        className={`${styles.arrow} ${styles.rightArrow}`}
        onClick={handleRightClick}
        disabled={isArrowDisabled}>
        &#10095;
      </button>
    </section>
  );
}


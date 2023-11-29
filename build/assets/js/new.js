import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const elements = Array.from(document.querySelectorAll('.js-school-slider'));

    elements.forEach(element => {
        const textContainer = element.querySelector('.school-slider__top .swiper');
        const textWrapper = element.querySelector('.school-slider__top .swiper-wrapper');
        const textSlides = Array.from(element.querySelectorAll('.school-slider__top .swiper-slide'));

        const mainContainer = element.querySelector('.school-slider__bottom .swiper');
        const mainWrapper = element.querySelector('.school-slider__bottom .swiper-wrapper');
        const mainSlides = Array.from(element.querySelectorAll('.school-slider__bottom .swiper-slide'));

        for (let i = 0; i < 2; i++) {
            textSlides.forEach(slide => textWrapper.appendChild(slide.cloneNode(true)));
            mainSlides.forEach(slide => mainWrapper.appendChild(slide.cloneNode(true)));
        }

        const textInstance = new Swiper(textContainer, {
            slidesPerView: 1,
            loop: true,
            speed: 600,
            longSwipesRatio: 0.7,
            autoHeight: true,

            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });

        const mainInstance = new Swiper(mainContainer, {
            slidesPerView: 1,
            loop: true,
            speed: 600,
            longSwipesRatio: 0.7,
            touchStartPreventDefault: false,
            navigation: {
                prevEl: element.querySelector('.school-slider__arrow--prev'),
                nextEl: element.querySelector('.school-slider__arrow--next')
            }
        });

        console.log('Main instance', mainInstance);

        mainInstance.controller.control = textInstance;
        // textInstance.controller.control = mainInstance;
    });
});

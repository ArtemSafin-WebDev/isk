
import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function nutritionSlider() {
    const elements = Array.from(document.querySelectorAll('.js-nutrition-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: window.matchMedia("(min-width: 641px)").matches ? 2 : 1,
            spaceBetween: 0,
            watchOverflow: true,
         
            direction: window.matchMedia("(min-width: 641px)").matches ? 'vertical' : 'horizontal',
            speed: 600,
            loop: true,
            navigation: {
                nextEl: element.querySelector('.nutrition__slider-arrow--next'),
                prevEl: element.querySelector('.nutrition__slider-arrow--prev')
            },
            breakpoint: {
                641: {
                    slidesPerView: 2,
                }
            }
        });
    })
}
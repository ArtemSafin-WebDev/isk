import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function uniformSlider() {
    const elements = Array.from(document.querySelectorAll('.js-uniform-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 0,
            watchOverflow: true,
         
            loop: true,
            speed: 600,
          
            navigation: {
                nextEl: element.querySelector('.uniform__slider-arrow--next'),
                prevEl: element.querySelector('.uniform__slider-arrow--prev')
            }
        });
    })
}
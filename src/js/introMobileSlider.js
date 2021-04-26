import { Swiper, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function introMobileSlider() {
    const elements = Array.from(document.querySelectorAll('.js-intro-mobile-slider'));

    console.log('elements', elements)

    if (!window.matchMedia('(max-width: 640px)').matches) return;

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        console.log('container', container)

        new Swiper(container, {
            watchOverflow: true,
            spaceBetween: 0,
            pagination: {
                el: element.querySelector('.intro__mobile-slider-pagination'),
                type: 'bullets',
                clickable: true
            }
        });
    });
}

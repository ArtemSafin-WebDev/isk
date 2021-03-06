import { Swiper, Navigation } from 'swiper';


Swiper.use([Navigation]);
export default function educationSlider() {
    const elements = Array.from(document.querySelectorAll('.js-education-school-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const wrapper = element.querySelector('.swiper-container');
        const slides = Array.from(element.querySelectorAll('.swiper-slide'));

        if (slides.length <= 2) {
            slides.forEach(slide => wrapper.appendChild(slide.cloneNode(true)));
        }

        new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 0,
            watchOverflow: true,
            slideToClickedSlide: true,
            loop: true,
            speed: 600,
            longSwipesRatio: 0.7,
            loopedSlides: 3,
            navigation: {
                nextEl: element.querySelector('.education-school__slider-arrow--next'),
                prevEl: element.querySelector('.education-school__slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    loop: true
                }
            }
        });
    });
}

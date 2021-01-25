import { Swiper, Navigation, EffectFade } from 'swiper';
import gsap from 'gsap';
import { MOBILE_WIDTH } from './constants';

Swiper.use([Navigation, EffectFade]);

export default function reviewsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-reviews-slider'));

    elements.forEach(element => {
        const mainContainer = element.querySelector('.reviews__main-slider .swiper-container');
        const thumbCards = Array.from(element.querySelectorAll('.reviews__thumbs-slider-card'));
        const paginationBullets = Array.from(element.querySelectorAll('.reviews__slider-pagination-bullet'));
        const slider = new Swiper(mainContainer, {
            effect: 'fade',
            watchOverflow: true,
            touchStartPreventDefault: false,
            fadeEffect: {
                crossFade: true
            },
            autoHeight: window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches ? true : false,
            speed: 700,
            loop: true,
            navigation: {
                nextEl: element.querySelector('.reviews__slider-arrow--next'),
                prevEl: element.querySelector('.reviews__slider-arrow--prev')
            },
            init: false
        });

        slider.on('init', (swiper) => {
            thumbCards.forEach(card => card.classList.remove('active'));
            thumbCards[swiper.realIndex].classList.add('active');
        });

        slider.init();

        const setAutoplay = startIndex => {
            const nextIndex = startIndex + 1 >= slider.slides.length ? 0 : startIndex + 1;

            gsap.fromTo(
                paginationBullets[startIndex],
                { '--slider-progress': 0 },
                {
                    '--slider-progress': 1,
                    duration: 5,
                    ease: 'linear',
                    onComplete: () => {
                        // slider.slideTo(nextIndex);
                        slider.slideToLoop(nextIndex);
                    }
                }
            );
        };

        setAutoplay(0);

        slider.on('slideChange', swiper => {
            thumbCards.forEach(card => card.classList.remove('active'));
            thumbCards[swiper.realIndex].classList.add('active');
            paginationBullets.forEach((bullet, bulletIndex) => {
                gsap.killTweensOf(bullet);
                if (bulletIndex < swiper.realIndex) {
                    bullet.classList.add('active');
                    gsap.to(bullet, {
                        '--slider-progress': 1,
                        duration: 0.2
                    });
                } else {
                    bullet.classList.remove('active');
                    gsap.to(bullet, {
                        '--slider-progress': 0,
                        duration: 0.2
                    });
                }
            });
            setAutoplay(swiper.realIndex);
        });

        paginationBullets.forEach((bullet, bulletIndex) => {
            bullet.addEventListener('click', event => {
                event.preventDefault();

                if (gsap.isTweening(bullet)) return;

                paginationBullets.forEach(bullet => {
                    gsap.killTweensOf(bullet);
                });

                // slider.slideTo(bulletIndex);
                slider.slideToLoop(bulletIndex);
            });
        });
    });
}

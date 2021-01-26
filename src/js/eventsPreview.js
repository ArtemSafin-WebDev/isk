import gsap from 'gsap';
import { MOBILE_WIDTH } from './constants';

import { Swiper, Navigation, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade]);

export default function eventsPreview() {
    const elements = Array.from(document.querySelectorAll('.js-events-preview'));
    if (!window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
        elements.forEach(element => {
            const cards = Array.from(element.querySelectorAll('.news-and-events__card'));
            const previews = Array.from(element.querySelectorAll('.news-and-events__preview-item'));

            const previewCircle = element.querySelector('.news-and-events__preview');

            gsap.set(previewCircle, {
                autoAlpha: 0,
                scale: 0
            })

            if (cards.length !== previews.length) {
                console.error('Not equal amound of cards and previews');
                return;
            }

            element.addEventListener('mouseenter', () => {
                gsap.to(previewCircle, {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.3
                })
            });
            element.addEventListener('mouseleave', () => {
                gsap.to(previewCircle, {
                    autoAlpha: 0,
                    scale: 0,
                    duration: 0.3
                })
            });

            cards.forEach((card, cardIndex) => {
                const cardTitle = card.querySelector('.news-and-events__card-title');

                card.addEventListener('mouseenter', () => {
                    const offsetTop = cardTitle.offsetTop;
                    previews.forEach(preview => preview.classList.remove('active'));
                    previews[cardIndex].classList.add('active');

                    const tl = gsap.timeline();

                    tl.to(previewCircle, {
                        duration: 0.3,
                        y: offsetTop + cardTitle.offsetHeight / 2,
                        yPercent: -50
                    })
                });
            });
        });
    } else {
        elements.forEach(element => {
            const container = element.querySelector('.swiper-container');

            new Swiper(container, {
                effect: 'fade',
                watchOverflow: true,
                fadeEffect: {
                    crossFade: true
                },
                autoHeight: true,
                speed: 700,
                loop: true,
                navigation: {
                    nextEl: element.querySelector('.news-and-events__arrow--next'),
                    prevEl: element.querySelector('.news-and-events__arrow--prev')
                }
            });
        });
    }
}

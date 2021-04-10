import { Swiper, Navigation, EffectFade } from 'swiper';
import gsap from 'gsap';
import detectIt from 'detect-it';
import Hammer from 'hammerjs';
Swiper.use([Navigation, EffectFade]);

export default function ourTeamSlider() {
    const elements = Array.from(document.querySelectorAll('.js-our-team-slider'));

    elements.forEach(element => {
        console.log('Element', element);
        const prevArrow = element.querySelector('.our-team-slider__arrow--prev');
        const nextArrow = element.querySelector('.our-team-slider__arrow--next');
        const cardsContainer = element.querySelector('.our-team-slider__cards');
        let locked = false;
        const cards = Array.from(element.querySelectorAll('.our-team-slider__card'));
        if (cards.length < 2) {
            console.log('Not enough cards');
            return;
        }

        cards.forEach(card => {
            card.classList.remove('active');
            card.classList.remove('btn-shown');
        })

        cards[cards.length - 1].classList.add('active');
        cards[cards.length - 1].classList.add('btn-shown');

        const setNextSlide = () => {
            if (locked) return;
            const cards = Array.from(element.querySelectorAll('.our-team-slider__card'));

            const currentCardIndex = cards.findIndex(card => card.classList.contains('active'));

            if (currentCardIndex === -1) {
                console.error('Could not find current index');
                return;
            }

            const prevCard = cards[currentCardIndex - 1];
            const currentCard = cards[currentCardIndex];

            if (!prevCard) {
                console.log('No prev card');
                return;
            }
            element.classList.add('locked');
            locked = true;

            console.log('Current card', currentCard);
            const imageContainer = currentCard.querySelector('.our-team-slider__card-image-container');
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(imageContainer, {
                        clearProps: 'all'
                    })
                    cards.forEach(card => card.classList.remove('active'));
                    cards.forEach(card => card.classList.remove('next'));
                    cards.forEach(card => card.classList.remove('prev'));
                    cards.forEach(card => card.classList.remove('btn-shown'));
                    prevCard.classList.add('next');
                    prevCard.classList.add('active');
                    prevCard.classList.add('btn-shown')

                    cardsContainer.prepend(currentCard);


                 
                    const tl = gsap.timeline({
                        onComplete: () => {
                            element.classList.remove('locked');
                            locked = false;
                            
                        }
                    });
                    tl.fromTo(
                        currentCard,
                        {
                            autoAlpha: 0
                        },
                        {
                            autoAlpha: 1,
                            duration: 0.4
                        }
                    );
                }
            });

         
            tl.to(currentCard, {
                autoAlpha: 0,
                duration: 0.5
            }).to(imageContainer, {
                xPercent: -10,
                duration: 0.5
            }, 0)

          

            currentCard.classList.remove('btn-shown');
            
        };

        const setPrevSlide = () => {
            if (locked) return;
            const cards = Array.from(element.querySelectorAll('.our-team-slider__card'));

            const currentCardIndex = cards.findIndex(card => card.classList.contains('active'));

            if (currentCardIndex === -1) {
                console.error('Could not find current index');
                return;
            }

            const prevCard = cards[0];
            const currentCard = cards[currentCardIndex];

            if (!prevCard) {
                console.log('No prev card');
                return;
            }

            const prevCardImage = document.querySelector('.our-team-slider__card-image');
            element.classList.add('locked');
            locked = true;

            const tl = gsap.timeline({
                onComplete: () => {
                    cardsContainer.append(prevCard);
                    cards.forEach(card => card.classList.remove('active'));
                    cards.forEach(card => card.classList.remove('next'));
                    cards.forEach(card => card.classList.remove('prev'));
                    cards.forEach(card => card.classList.remove('btn-shown'));
                    prevCard.classList.add('active');
                    prevCard.classList.add('btn-shown');

                    const imageContainer = prevCard.querySelector('.our-team-slider__card-image-container');

                    const tl = gsap.timeline({
                        onComplete: () => {
                            element.classList.remove('locked');
                            locked = false;
                         
                        }
                    });
                    tl.to(prevCard, {
                        autoAlpha: 1,
                        duration: 0.5
                    }).fromTo(imageContainer, {
                        xPercent: 10
                    }, {
                        xPercent: 0,
                        duration: 0.5
                    }, 0)
                }
            });

            currentCard.classList.add('prev');

            tl.to(prevCard, {
                autoAlpha: 0,
                duration: 0.5
            });

            currentCard.classList.remove('btn-shown');
        };

        nextArrow.addEventListener('click', event => {
            event.preventDefault();
            setPrevSlide();
        });

        prevArrow.addEventListener('click', event => {
            event.preventDefault();

            setNextSlide();
        });

        if (detectIt.hasTouch || window.matchMedia('(max-width: 640px)').matches) {
            const hammertime = new Hammer(cardsContainer);

            hammertime.on('swipeleft', () => {
                setNextSlide();
            });
            hammertime.on('swiperight', () => {
                setPrevSlide();
            });
        }
    });
}

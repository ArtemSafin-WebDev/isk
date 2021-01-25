
import gsap from 'gsap';

export default function eventsPreview() {
    const elements = Array.from(document.querySelectorAll('.js-events-preview'));

    elements.forEach(element => {
        const cards = Array.from(element.querySelectorAll('.news-and-events__card'));
        const previews = Array.from(element.querySelectorAll('.news-and-events__preview-item'));

        const previewCircle = element.querySelector('.news-and-events__preview')


        if (cards.length !== previews.length) {
            console.error('Not equal amound of cards and previews');
            return;
        }


        element.addEventListener('mouseenter', () => {
            previewCircle.classList.add('active');
        })
        element.addEventListener('mouseleave', () => {
            previewCircle.classList.remove('active');
        })


        cards.forEach((card, cardIndex) => {
            const cardTitle = card.querySelector('.news-and-events__card-title');


          

            card.addEventListener('mouseenter', () => {
                const offsetTop = cardTitle.offsetTop;
                previews.forEach(preview => preview.classList.remove('active'))
                previews[cardIndex].classList.add('active')
                gsap.to(previewCircle, {
                    duration: 0.3,
                    y: offsetTop + cardTitle.offsetHeight / 2,
                    yPercent: -50
                })
            })

           
        })
    })
}
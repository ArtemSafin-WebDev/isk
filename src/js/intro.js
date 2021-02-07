import gsap from 'gsap';
import { debounce } from 'lodash';

export default function intro() {
    const elements = Array.from(document.querySelectorAll('.js-intro'));

    elements.forEach(element => {
        const columnContent = Array.from(element.querySelectorAll('.intro__column-content'));
        const backgrounds = Array.from(element.querySelectorAll('.intro__background'));
        const backgroundVideos = Array.from(element.querySelectorAll('.intro__background-image'));
        const introBottomLink = element.querySelector('.intro__bottom-link');
        const decorativeColumns = Array.from(element.querySelectorAll('.js-intro-col'));
        const textColumns = Array.from(element.querySelectorAll('.js-intro-text-col'));
        const links = Array.from(element.querySelectorAll('.intro__column-link'))
        const leftColumn = element.querySelector('.intro__left-col');

        let leftColumnWidth = leftColumn.offsetWidth;

        window.addEventListener('resize', debounce(() => {
            leftColumnWidth = leftColumn.offsetWidth;
            backgrounds.forEach(bg => bg.classList.remove('active'));
            decorativeColumns.forEach(col => {
                gsap.set(col, {
                    clearProps: 'all'
                })
                col.classList.remove('active');
            })
            textColumns.forEach(col => {
                gsap.set(col, {
                    clearProps: 'all'
                })
                col.classList.remove('active');
            })
            links.forEach(link => link.classList.remove('inactive'));

            console.log('Debounced resize handler called')
        }), 300);

        columnContent.forEach((content, contentIndex) => {
            const col = decorativeColumns[contentIndex];

            content.addEventListener('mouseenter', () => {
                col.classList.add('active');
                backgrounds.forEach(bg => bg.classList.remove('active'));
                backgrounds[contentIndex].classList.add('active');
                backgroundVideos[contentIndex].play();
                textColumns.forEach(col => col.classList.remove('active'));
                textColumns[contentIndex].classList.add('active');
                links.forEach(link => link.classList.remove('inactive'))
                if (contentIndex === 0) {
                  
                    links[1].classList.add('inactive');
                    const tl = gsap.timeline();

                    tl.to(leftColumn, {
                        duration: 0.3,
                        width: leftColumnWidth + introBottomLink.offsetWidth / 2
                    }).to(
                        textColumns[1],
                        {
                            duration: 0.3,
                            x: introBottomLink.offsetWidth / 2
                        },
                        0
                    )
                } else {
                    links[0].classList.add('inactive');
                    const tl = gsap.timeline();

                    tl.to(leftColumn, {
                        duration: 0.3,
                        width: leftColumnWidth - introBottomLink.offsetWidth / 2
                    }).to(
                        textColumns[0],
                        {
                            duration: 0.3,
                            x: -introBottomLink.offsetWidth / 2
                        },
                        0
                    );
                }
            });
            content.addEventListener('mouseleave', () => {
                col.classList.remove('active');
                backgrounds.forEach(bg => bg.classList.remove('active'));
                backgroundVideos.forEach(video => video.pause());
                textColumns.forEach(col => col.classList.remove('active'));
                links.forEach(link => link.classList.remove('inactive'))
                if (contentIndex === 0) {
                    const tl = gsap.timeline();
                    tl.to(leftColumn, {
                        duration: 0.3,
                        width: leftColumnWidth
                    }).to(
                        textColumns[1],
                        {
                            duration: 0.3,
                            x: 0
                        },
                        0
                    );
                } else {
                    const tl = gsap.timeline();

                    tl.to(leftColumn, {
                        duration: 0.3,
                        width: leftColumnWidth
                    }).to(
                        textColumns[0],
                        {
                            duration: 0.3,
                            x: 0
                        },
                        0
                    );
                }
            });
        });
    });
}

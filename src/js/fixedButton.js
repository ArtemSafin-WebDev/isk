import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function fixedButton() {
    const introMainBtn = document.querySelector('.intro__main-btn');

    if (!introMainBtn) return;

    ScrollTrigger.matchMedia({
        '(min-width: 641px)': function() {
            ScrollTrigger.create({
                trigger: introMainBtn,
                start: `bottom bottom`,
                endTrigger: 'html',
                end: 'bottom top',
                pin: false,
                pinSpacing: false,
                onToggle: self => {
                    if (self.isActive) {
                        gsap.set(introMainBtn, {
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            zIndex: 300
                        });

                        gsap.set(document.body, {
                            paddingBottom: introMainBtn.offsetHeight
                        })
                    } else {
                        gsap.set(introMainBtn, {
                            clearProps: 'all'
                        });

                        gsap.set(document.body, {
                            paddingBottom: 0
                        })
                    }
                }
            });
        }
    });
}

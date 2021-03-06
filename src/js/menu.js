import { lockScroll, unlockScroll } from './scrollBlocker';
import gsap from 'gsap';
import { debounce } from 'lodash';
import { MOBILE_WIDTH } from './constants';

export default function menu() {
    let menuOpen = false;
    const openMenuBtn = document.querySelector('.js-menu-open');
    const menu = document.querySelector('.page-header__menu');

    const menuLinks = Array.from(menu.querySelectorAll('.page-header__menu-nav-link'));
    const menuPointer = menu.querySelector('.page-header__menu-pointer');
    let activeTl = null
    const openMenu = () => {
        document.body.classList.add('menu-open');
        menuOpen = true;

        if (activeTl) {
            activeTl.kill();
        }

        const tl = gsap.timeline({
            delay: 0.3
        });

        activeTl = tl;

        tl.fromTo(
            menuLinks,
            {
                autoAlpha: 0,
                x: 70
            },
            {
                duration: 0.4,
                autoAlpha: 1,
                stagger: 0.2,
                x: 0
            }
        );
        lockScroll(menu);
    };

    const closeMenu = () => {
        document.body.classList.remove('menu-open');
        menuOpen = false;
        unlockScroll();
    };

    openMenuBtn.addEventListener('click', event => {
        event.preventDefault();

        if (!menuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    if (!window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
        const initialActiveLink = menuLinks.find(link => link.classList.contains('active'));
        const menuNav = menu.querySelector('.page-header__menu-nav');

        gsap.set(menuPointer, {
            scale: 0,
            autoAlpha: 0
        });

        menuNav.addEventListener('mouseenter', () => {
            gsap.to(menuPointer, {
                duration: 0.2,
                scale: 1,
                autoAlpha: 1
            });
        });
        menuNav.addEventListener('mouseleave', () => {
            gsap.to(menuPointer, {
                duration: 0.2,
                scale: 0,
                autoAlpha: 0
            });
        });
        const slideToMenuLinks = link => {
            const linkOffset = link.offsetTop + link.offsetHeight / 2;

            gsap.to(menuPointer, {
                duration: 0.3,
                y: linkOffset
            });
        };

        const initializeLinks = () => {
            if (initialActiveLink) {
                slideToMenuLinks(initialActiveLink);
            } else if (menuLinks.length) {
                slideToMenuLinks(menuLinks[0]);
            } else {
                gsap.set(menuPointer, {
                    autoAlpha: 0
                });
            }
        };

        initializeLinks();

        menuLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                slideToMenuLinks(link);
            });
        });

        window.addEventListener(
            'resize',
            debounce(() => {
                initializeLinks();
            }, 300)
        );
    }

    const checkFixed = () => {
        if (!menuOpen) {
            let windTop = window.scrollY;
            if (windTop > 100) {
                document.body.classList.add('header-fixed');
            } else {
                document.body.classList.remove('header-fixed');
            }
        }
    };

    window.addEventListener(
        'resize',
        debounce(() => {
            checkFixed();
        }, 300)
    );

    window.addEventListener('scroll', checkFixed);

    checkFixed();
}

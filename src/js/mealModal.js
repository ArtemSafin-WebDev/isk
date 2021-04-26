import { lockScroll, unlockScroll } from "./scrollBlocker";

export default function mealModals() {
    const cards = Array.from(document.querySelectorAll('.nutrition__slider-sample-menu'));
    const closeModalBtns = Array.from(document.querySelectorAll('.nutrition__slider-sample-menu-modal-close'));
    const modals = Array.from(document.querySelectorAll('.nutrition__slider-sample-menu-modal'))

    cards.forEach(card => {
        card.addEventListener('click', event => {
            event.preventDefault();

            const modal = card.nextElementSibling;

            if (modal.matches('.nutrition__slider-sample-menu-modal')) {
                modal.classList.add('shown');
                lockScroll(modal);
            }
        })
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            const modal = btn.closest('.nutrition__slider-sample-menu-modal');
            if (modal) {
                modal.classList.remove('shown');
            }
            unlockScroll();
        })
    });

    modals.forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target === modal) {
                modal.classList.remove('shown');
                unlockScroll();
            }
        })
    })
}
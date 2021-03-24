import { lockScroll, unlockScroll } from "./scrollBlocker";

export default function aboutModals() {
    const cards = Array.from(document.querySelectorAll('.about-intro__btn'));
    const closeModalBtns = Array.from(document.querySelectorAll('.about-intro__modal-close'));
    const modals = Array.from(document.querySelectorAll('.about-intro__modal'))

    cards.forEach(card => {
        card.addEventListener('click', event => {
            event.preventDefault();

            const modal = card.nextElementSibling;

            if (modal.matches('.about-intro__modal')) {
                modal.classList.add('shown');
                lockScroll(modal);
            }
        })
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            const modal = btn.closest('.about-intro__modal');
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
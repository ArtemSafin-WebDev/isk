import { lockScroll, unlockScroll } from "./scrollBlocker";

export default function teachersModals() {
    const cards = Array.from(document.querySelectorAll('.teachers__card'));
    const closeModalBtns = Array.from(document.querySelectorAll('.teachers__card-modal-close'));
    const modals = Array.from(document.querySelectorAll('.teachers__card-modal'))

    cards.forEach(card => {
        card.addEventListener('click', event => {
            event.preventDefault();

            const modal = card.nextElementSibling;

            if (modal.matches('.teachers__card-modal')) {
                modal.classList.add('shown');
                lockScroll(modal);
            }
        })
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            const modal = btn.closest('.teachers__card-modal');
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
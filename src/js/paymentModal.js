import { lockScroll, unlockScroll } from './scrollBlocker';

export default function paymentModal() {
    const btns = Array.from(document.querySelectorAll('.js-open-payment-modal'));
    const closeModalBtns = Array.from(document.querySelectorAll('.payment-modal__close'));
    const modals = Array.from(document.querySelectorAll('.payment-modal'));

    btns.forEach(card => {
        card.addEventListener('click', event => {
            event.preventDefault();

            const modal = document.querySelector('.payment-modal');

            if (modal) {
                modal.classList.add('shown');
                lockScroll(modal);
            } else {
                console.error('No payment modal');
                return;
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            const modal = document.querySelector('.payment-modal');
            if (modal) {
                modal.classList.remove('shown');
            } else {
                console.error('No payment modal');
                return;
            }
            unlockScroll();
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target === modal) {
                modal.classList.remove('shown');
                unlockScroll();
            }
        });
    });
}

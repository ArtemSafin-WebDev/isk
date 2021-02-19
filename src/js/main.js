import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import intro from './intro';
import eventsPreview from './eventsPreview';
import reviewsSlider from './reviewsSlider';
import menu from './menu';
import educationSlider from './educationSlider';
import phoneMask from './phoneMask';
import customSelects from './customSelect';
import validation from './validation';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    intro();
    eventsPreview();
    reviewsSlider();
    menu();
    educationSlider();
    phoneMask();
    customSelects();
    validation();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})

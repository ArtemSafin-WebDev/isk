import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import intro from './intro';
import eventsPreview from './eventsPreview';
import reviewsSlider from './reviewsSlider';
import menu from './menu';
import educationSlider from './educationSlider';
import uniformSlider from './uniformSlider';
import nutritionSlider from './nutritionSlider';
import contactsMap from './contactsMap';
import initForms from './forms';
import setScrollbarWidth from './setScrollbarWidth';
import teachersModals from './teachersModals';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    intro();
    eventsPreview();
    reviewsSlider();
    menu();
    educationSlider();
    uniformSlider();
    nutritionSlider();
    contactsMap();
    initForms();
    setScrollbarWidth();
    teachersModals();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})

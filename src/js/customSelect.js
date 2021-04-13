import Choices from 'choices.js';

export default function customSelects() {


    function initializeCustomSelects() {
        const customSelects = Array.from(document.querySelectorAll('.js-custom-select'));

        customSelects.forEach(select => {
            new Choices(select, {
                searchEnabled: false,
                itemSelectText: '',
                shouldSort: false
            });
        })
    }

    window.initializeCustomSelects = initializeCustomSelects;

    initializeCustomSelects();
    
}
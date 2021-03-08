import Inputmask from "inputmask";
import validation from './validation';
import customSelects from './customSelect';
import autosize from "autosize";

export default function(){
    const phoneInputs = Array.from(document.querySelectorAll('.js-phone-input'));
    phoneInputs.forEach(input => {
        const instance = new Inputmask({ mask: '+7 (999) 999-99-99' });
        instance.mask(input);
    });

    validation();
    customSelects();

    autosize(document.querySelectorAll('textarea.text-input'));

}

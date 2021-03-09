import loadScript from './loadScript'

export default function () {

    let mapObj = document.getElementById('contacts-map');

    if(mapObj) {
        let lang = document.documentElement.lang;
        let langStr = lang === 'en' ? 'en_US' : 'ru-RU';
        loadScript(`https://api-maps.yandex.ru/2.1/?lang=${langStr}&apikey=be9b3c3d-8017-451e-9f98-fcaaa252692a`,  () => {
            ymaps.ready(function () {
                contactsMapInit();
            });
        });
    }

    function contactsMapInit(){
        let contactsMap;

        let pinSrc = mapObj.getAttribute('data-pin').split(';');
        let center = mapObj.getAttribute('data-center').split(',');
        let coordinates = mapObj.getAttribute('data-coordinates').split(';');
        let names = mapObj.getAttribute('data-names').split(';');

        let zoom = window.outerWidth > 600 ? 12 : 11;
        contactsMap = new ymaps.Map('contacts-map', {
            center: center,
            zoom: zoom,
            controls: []
        });

        contactsMap.behaviors.disable("scrollZoom");

        let zoomControl = new ymaps.control.ZoomControl({options: { position: { left: 10, bottom: 40 }}});

        contactsMap.controls.add(zoomControl);

        for(let i=0; i< coordinates.length; i++){
            let markParams = {
                iconLayout: 'default#image',
                iconImageHref: pinSrc[i],
                iconImageSize: [50, 78],
                iconImageOffset: [-5, -35],
                iconOffset : [-5, -35]
            };
            let mark = new ymaps.Placemark(coordinates[i].split(','),  {balloonContent: names[i]}, markParams);

            contactsMap.geoObjects.add(mark);
        }

    }

}

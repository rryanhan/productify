import Swiper from 'swiper';
import '../assets/lib/swiper-bundle.min.css';

export function initSwiper(): Swiper {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: false,

        cssMode: true,

        mousewheel: {
          forceToAxis: true,
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Listen for the slide change event
    swiper.on('slideChange', function () {
        console.log('Slide changed to: ', swiper.activeIndex);
    });

    return swiper;
}
import Swiper from 'swiper';
import '../assets/lib/swiper-bundle.min.css';

export function initArtistsSwiper(): Swiper {
    const swiper = new Swiper('.swiper-container-artists', {
        slidesPerView: 10,
        spaceBetween: 0,
        direction: 'horizontal',
        loop: false,
    
        cssMode: true,
    
        mousewheel: {
          forceToAxis: true,
        },
        
    });

    return swiper
}
export function initTracksSwiper(): Swiper {
    const swiper = new Swiper('.swiper-container-tracks', {
        slidesPerView: 10,
        spaceBetween: 0,
        direction: 'horizontal',
        loop: false,
    
        cssMode: true,
    
        mousewheel: {
          forceToAxis: true,
        },
    
    });

    return swiper
}


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


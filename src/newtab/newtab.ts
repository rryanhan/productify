import '../styles/tailwind.css';
import Swiper from 'swiper';
import { setBackgroundImage } from '../components/backgroundImage';
import { updateClock } from '../components/clock';
import { updateUserProfile } from '../components/loginButton';
import { callGreeting } from '../components/greeting';
import { initSwiper } from '../swiper/swiper-init';
import {tracksCarousel} from '../components/tracksCarousel';
import { artistsCarousel } from '../components/artistsCarousel';

// BACKGROUND IMAGE
setBackgroundImage();

// CLOCK FUNCTIONALITY
setInterval(updateClock, 1000);
updateClock();

// LOGIN BUTTON FUNCTIONALITY
updateUserProfile();

// GREETING FUNCTIONALITY
callGreeting();

// SWIPER FUNCTIONALITY FOR BETWEEN WINDOWS
initSwiper();

// TRACKS CAROUSEL FUNCTIONALITY
tracksCarousel();
artistsCarousel();
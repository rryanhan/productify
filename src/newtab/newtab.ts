import '../styles/tailwind.css';

import { setBackgroundImage } from '../components/backgroundImage';
import { updateClock } from '../components/clock';
import { updateUserProfile } from '../components/loginButton';
import { callGreeting } from '../components/greeting';
import { initSwiper } from '../swiper/swiper-init';

// BACKGROUND IMAGE
setBackgroundImage();

// CLOCK FUNCTIONALITY
setInterval(updateClock, 1000);
updateClock();

// LOGIN BUTTON FUNCTIONALITY
updateUserProfile();

// GREETING FUNCTIONALITY
callGreeting();

// SWIPER FUNCTIONALITY
initSwiper();
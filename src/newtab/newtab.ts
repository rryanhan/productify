import '../styles/tailwind.css';

import { setBackgroundImage } from '../components/backgroundImage';
import { updateClock } from '../components/clock';
import { login } from './auth';
import { updateUserProfile } from '../components/loginButton';

// BACKGROUND IMAGE
setBackgroundImage();

// CLOCK FUNCTIONALITY
setInterval(updateClock, 1000);
updateClock();


updateUserProfile();

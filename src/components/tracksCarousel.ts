import { getTopTracks} from '../api/spotify';
import {initTracksSwiper} from '../swiper/swiper-init';

// Define types for the data returned by the Spotify API
interface Image {
    url: string;
}

interface Artist {
    name: string;
    images: Image[];
}

interface Track {
    name: string;
    album: {
        images: Image[];
    };
    artists: Artist[];
}

interface TopTracksResponse {
    items: Track[];
}

initTracksSwiper();

export const tracksCarousel = async () => {
    try {
        const topTracks: TopTracksResponse = await getTopTracks("short_term");

        const topTracksWrapper = document.getElementById('topTracksWrapper');

        if (!topTracksWrapper) {
            console.error('topItemsWrapper element not found');
            return;
        }

        // Populate top tracks
        topTracks.items.forEach((track: Track, index: number) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="track text-center flex flex-col items-center">
                    <img src="${track.album.images[0].url}" alt="${track.name}" class="track-image w-20">
                    <div class="track-info">
                        <h1 class="text-customGreen">${index + 1}${'.'} ${track.name}</h1>
                        <h1 class="text-customWhite opacity-75">${track.artists.map(artist => artist.name).join(', ')}</h1>
                    </div>
                </div>
            `;
            topTracksWrapper.appendChild(slide);
        });
       
    } catch (error) {
        console.error('Error fetching top items:', error);
    }
};


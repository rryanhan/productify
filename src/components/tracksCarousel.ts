import { getTopTracks } from '../spotify';
import { initTracksSwiper } from '../swiper/swiper-init';

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
    uri: string; // Add the uri property
}

interface TopTracksResponse {
    items: Track[];
}

const swiper = initTracksSwiper();

export const tracksCarousel = async (timeRange: "short_term" | "medium_term" | "long_term") => {
    try {
        const topTracks: TopTracksResponse = await getTopTracks(timeRange);

        const topTracksWrapper = document.getElementById('topTracksWrapper');

        if (!topTracksWrapper) {
            console.error('topTracksWrapper element not found');
            return;
        }

        // Clear existing slides
        topTracksWrapper.innerHTML = '';

        // Populate top tracks
        topTracks.items.forEach((track: Track, index: number) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.setAttribute('data-uri', track.uri); // Add data-uri attribute
            slide.innerHTML = `
                <div class="track text-center flex flex-col items-center">
                    <img src="${track.album.images[0].url}" alt="${track.name}" class="track-image w-customWidth">
                    <div class="track-info">
                        <h1 class="text-customGreen">${index + 1}${'.'} ${track.name}</h1>
                        <h1 class="text-customWhite opacity-75">${track.artists.map(artist => artist.name).join(', ')}</h1>
                    </div>
                </div>
            `;
            topTracksWrapper.appendChild(slide);
        });

        // Update Swiper
        swiper.update();
       
    } catch (error) {
        console.error('Error fetching top tracks:', error);
    }
};


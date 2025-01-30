import { getTopArtists} from '../api/spotify';
import {initArtistsSwiper} from '../swiper/swiper-init';

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

interface TopArtistResponse {
    items: Artist[];
}

initArtistsSwiper();

export const artistsCarousel = async () => {
    try {
        const topTracks: TopArtistResponse = await getTopArtists("short_term");

        const topArtistsWrapper = document.getElementById('topArtistsWrapper');

        if (!topArtistsWrapper) {
            console.error('topItemsWrapper element not found');
            return;
        }

        // Populate top tracks
        topTracks.items.forEach((artist: Artist, index: number) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="artist text-center flex flex-col items-center">
                    <img src="${artist.images[0].url}" alt="${artist.name}" class="artist-image w-20 overflow-hidden object-cover rounded-full">
                    <div class="artist-info">
                        <h1 class="text-customGreen">${index + 1}${'.'} ${artist.name}</h1>
                    </div>
                </div>
            `;
            topArtistsWrapper.appendChild(slide);
        });
       
    } catch (error) {
        console.error('Error fetching top items:', error);
    }
};


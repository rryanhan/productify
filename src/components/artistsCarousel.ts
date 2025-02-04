import { getTopArtists } from '../api/spotify';
import { initArtistsSwiper } from '../swiper/swiper-init';

// Define types for the data returned by the Spotify API
interface Image {
    url: string;
}

interface Artist {
    name: string;
    images: Image[];
}

interface TopArtistResponse {
    items: Artist[];
}

const swiper = initArtistsSwiper();

export const artistsCarousel = async (timeRange: "short_term" | "medium_term" | "long_term") => {
    try {
        const topArtists: TopArtistResponse = await getTopArtists(timeRange);

        const topArtistsWrapper = document.getElementById('topArtistsWrapper');

        if (!topArtistsWrapper) {
            console.error('topArtistsWrapper element not found');
            return;
        }

        // Clear existing slides
        topArtistsWrapper.innerHTML = '';

        // Populate top artists
        topArtists.items.forEach((artist: Artist, index: number) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="artist text-center flex flex-col items-center">
                    <img src="${artist.images[0].url}" alt="${artist.name}" class="artist-image w-customWidth h-customWidth rounded-full aspect-square object-cover">
                    <div class="artist-info">
                        <h1 class="text-customGreen">${index + 1}${'.'} ${artist.name}</h1>
                    </div>
                </div>
            `;
            topArtistsWrapper.appendChild(slide);
        });

        // Update Swiper
        swiper.update();
       
    } catch (error) {
        console.error('Error fetching top artists:', error);
    }
};


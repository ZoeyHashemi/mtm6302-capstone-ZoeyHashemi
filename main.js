const $images = document.getElementById('images');
const $favorites = document.getElementById('favorites');


let apodData = [];

async function searchImage() {
    const dateInput = document.getElementById('dateInput').value;
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=LCdEVrFh3U9fFJr9BbYaSIjr1xBrl6sqq7OkNp57&date=${dateInput}`);
    apodData = await response.json();

    if (!Array.isArray(apodData)) {
        apodData = [apodData];
    }

    $images.innerHTML = buildImages(apodData);

    // Store the results in local storage
    localStorage.setItem('searchResults', JSON.stringify(apodData));

    // Redirect to the new page without creating a new history entry
    window.location.replace('results.html');
}

function openHdImage(hdurl) {
    window.open(hdurl, '_blank');
}

function buildImages(apodData) {
    const html = apodData.map(apod => /*html*/`
        <div class="image col-12 mb-3 ">
            <img src="${apod.url}" alt="${apod.title}" class="img-fluid " onclick="openHdImage('${apod.hdurl}')">
            <h2>${apod.title}</h2>
            <p>${apod.explanation}</p>
            <button class="save btn btn-primary"
                data-id="${apod.date}"
                data-title="${apod.title}"
                data-explanation="${apod.explanation}"
                data-url="${apod.url}"
                data-hdurl="${apod.hdurl}"
                onclick="addToFavorites(${JSON.stringify(apod)}, 'searchResults')"
            >Add To Favorites</button>
        </div>
    `).join('');

    return html;
}

function addToFavorites(apod, source) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.find(favorite => favorite.date === apod.date)) {
        favorites.push({
            date: apod.date,
            title: apod.title,
            explanation: apod.explanation,
            url: apod.url,
            hdurl: apod.hdurl,
        });

        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (source === 'searchResults') {
            buildFavoritesList(); // Update the favorites page if called from search results
        }
    }
}

function buildFavoritesList() {
    const ls = localStorage.getItem('favorites');
    const favorites = ls ? JSON.parse(ls) : [];

    if ($favorites) {
        $favorites.innerHTML = buildImages(favorites);
    }
}
const dateInput = document.getElementById('dateInput');
dateInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchImage();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Event delegation for handling user interactions on the favorites page
    
    const favoritesContainer = document.getElementById('favorites');
    if (favoritesContainer) {
        favoritesContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('save')) {
                const selectedApod = apodData.find(apod => apod.date === e.target.dataset.id);
                addToFavorites(selectedApod, 'favorites');
            } else if (e.target.classList.contains('remove')) {
                const index = favorites.findIndex(favorite => favorite.date === e.target.dataset.id);
                if (index >= 0) {
                    favorites.splice(index, 1);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    buildFavoritesList();
                }
            }
        });
    }

    buildFavoritesList();
});

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event triggered');

    // Retrieve search results from local storage
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));
    console.log('searchResults:', searchResults);

    // Display the search results on the page
    const resultsContainer = document.getElementById('searchResults');
    if (searchResults && resultsContainer) {
        console.log('Building images...');
        resultsContainer.innerHTML = buildImages(searchResults);
    } else {
        console.log('No search results or container not found.');
    }

    // Add event listeners to the "Add to Favorites" buttons
    const addToFavoritesButtons = document.querySelectorAll('.save');
    addToFavoritesButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const selectedApod = searchResults.find(apod => apod.date === event.target.dataset.id);
            addToFavorites(selectedApod, searchResults); // Pass searchResults array
        });
    });
});

function buildImages(apodData) {
    const html = apodData.map(apod => /*html*/`
        <div class="image col-12 mb-3">
            <img src="${apod.url}" alt="${apod.title}" class="img-fluid" onclick="openHdImage('${apod.hdurl}')">
            <h2>${apod.title}</h2>
            <p>${apod.explanation}</p>
            <button class="save btn btn-primary"
                data-id="${apod.date}"
                data-title="${apod.title}"
                data-explanation="${apod.explanation}"
                data-url="${apod.url}"
                data-hdurl="${apod.hdurl}"
                onclick="addToFavorites(${JSON.stringify(apod)})" // Call addToFavorites directly
            >Add To Favorites</button>
        </div>
    `).join('');

    return html;
}

function addToFavorites(apod, sourceArray) {
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
        buildFavoritesList(); // Update the favorites page
    }
}

function buildFavoritesList() {
    const ls = localStorage.getItem('favorites');
    let favorites = [];
    if (ls) {
        favorites = JSON.parse(ls);
    }

    if ($favorites) {
        $favorites.innerHTML = buildImages(favorites);
    }
}

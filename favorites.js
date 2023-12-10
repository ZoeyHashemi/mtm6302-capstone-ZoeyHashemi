document.addEventListener('DOMContentLoaded', function () {
    // Retrieve favorites from local storage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Display the favorite images on the page
    const favoritesContainer = document.getElementById('favorites');
    if (favoritesContainer) {
        favoritesContainer.innerHTML = buildFavorites(favorites);
    }
});

function buildFavorites(favorites) {
    const html = favorites.map(favorite => /*html*/`
        <div class="col mb-4 animate__animated animate__zoomIn">
            <div class="card h-100 d-flex flex-column animate__animated animate__zoomIn">
                <img src="${favorite.url}" alt="${favorite.title}" class="card-img-top img-fluid h-100">
                <div class="card-body d-flex flex-column">
                    
                    <div class="button-group top-icons">
                        <i class="fas fa-expand-arrows-alt" onclick="openHdImage('${favorite.hdurl}')"></i>
                        <i class="fas fa-download" onclick="downloadImage('${favorite.url}', '${favorite.title}')"></i>
                        <i class="fas fa-trash-alt remove" data-id="${favorite.date}" onclick="removeFromFavorites('${favorite.date}')"></i>
                        <i class="fas fa-share-alt" onclick="shareImage('${favorite.url}')"></i>
                        <h2 class="card-title text text-center ">${favorite.title}</h2>
                    </div>
                    <div class="flex-grow-1"> <!-- Flex grow to occupy remaining space -->
                        <p class="description-content">${favorite.explanation}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    return html;
}

function openHdImage(hdurl) {
    window.open(hdurl, '_blank');
}

function downloadImage(url, title) {
    let link;  // Declare link variable outside the fetch block

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            link = document.createElement('a');
            const blobUrl = URL.createObjectURL(blob);

            link.href = blobUrl;
            link.download = `${title}.jpg`;

            // Append the link to the body
            document.body.appendChild(link);

            // Trigger a click on the link to start the download
            link.click();
        })
        .catch(error => console.error('Error downloading image:', error))
        .finally(() => {
            // Remove the link and revoke the Blob URL outside the fetch block
            if (link) {
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }
        });
}

function customShare(url) {
    // Your custom sharing logic goes here
    alert('Share this link: ' + url);
}

// Usage
function shareImage(url) {
    if (navigator.share && 'share' in navigator) {
        // Web Share API is supported
        navigator.share({
            title: 'Check out this image!',
            text: 'Found this amazing image. Check it out!',
            url: url,
        })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        // Fallback for browsers that do not support Web Share API
        console.log('Web Share API not supported. Using custom sharing logic.');
        customShare(url);
    }
}

function removeFromFavorites(date) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(favorite => favorite.date === date);
    if (index >= 0) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        buildFavoritesList();
    }
}

function buildFavoritesList() {
    const ls = localStorage.getItem('favorites');
    if (ls) {
        const favorites = JSON.parse(ls); // Ensure to use a local variable

        const favoritesContainer = document.getElementById('favorites');
        if (favoritesContainer) {
            favoritesContainer.innerHTML = buildFavorites(favorites);
        }
    }
}
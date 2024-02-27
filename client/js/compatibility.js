async function fetchCompatibility() {
    try {
        // Retrieve MBTI types from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const yourMbtiType = urlParams.get('yourMbtiType');
        const partnerMbtiType = urlParams.get('partnerMbtiType');

        // Make a GET request to the server
        const response = await fetch(`${process.env.URL}/calculate-compatibility?yourMbtiType=${yourMbtiType}&partnerMbtiType=${partnerMbtiType}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch compatibility data');
        }
        
        const compatibilityData = await response.json();

        // Populate MBTI types
        document.getElementById('yourMbtiType').textContent = compatibilityData.type1;
        document.getElementById('partnerMbtiType').textContent = compatibilityData.type2;

        // Populate relationship facts
        const relationshipFactsList = document.getElementById('relationshipFacts');
        compatibilityData.relationshipFacts.forEach(fact => {
            const listItem = document.createElement('li');
            listItem.textContent = fact;
            relationshipFactsList.appendChild(listItem);
        });

        // Populate relationship roles summary
        document.getElementById('relationshipRoles').textContent = compatibilityData.relationshipRoles;

        // Populate movie names
        const movieNamesList = document.getElementById('movieNames');
        compatibilityData.movieNames.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = movie;
            movieNamesList.appendChild(listItem);
        });

        // Populate book names
        const bookNamesList = document.getElementById('bookNames');
        compatibilityData.bookNames.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = book;
            bookNamesList.appendChild(listItem);
        });

        // Populate anime names
        const animeNamesList = document.getElementById('animeNames');
        compatibilityData.animeNames.forEach(anime => {
            const listItem = document.createElement('li');
            listItem.textContent = anime;
            animeNamesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error);
        // Handle error if needed
    }
}

// Call the function to fetch compatibility data
fetchCompatibility();

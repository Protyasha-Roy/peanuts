document.addEventListener("DOMContentLoaded", function() {
    // Fetch user's IP address using a third-party service
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const userIP = data.ip;
  
        // Send user's IP address to the server for verification
        fetch(`https://peanuts.onrender.com/verify-access`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ipAddress: userIP })
        })
        .then(response => {
          if (response.ok) {
            console.log('successful');
          } else {
            window.location.href = 'errors.html'; // Redirect to errors
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error, redirect to errors page as fallback
          window.location.href = 'errors.html';
        });
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error, redirect to errors page as fallback
        window.location.href = 'errors.html';
      });
  });
  

// Function to handle form submission
const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract values from form fields
    const type1 = document.getElementById('type1').value;
    const type2 = document.getElementById('type2').value;
    const relationshipFacts = document.getElementById('relationshipFacts').value.split('.').map(fact => fact.trim());
    const relationshipRoles = document.getElementById('relationshipRoles').value;
    const movieNames = document.getElementById('movieNames').value.split(',').map(movie => movie.trim());
    const bookNames = document.getElementById('bookNames').value.split(',').map(book => book.trim());
    const animeNames = document.getElementById('animeNames').value.split(',').map(anime => anime.trim());

    // Create object with form data
    const formData = {
        type1,
        type2,
        relationshipFacts,
        relationshipRoles,
        movieNames,
        bookNames,
        animeNames
    };

    try {
        // Send form data to server
        const response = await fetch(`https://peanuts.onrender.com/upload-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to upload data');
        }

        const data = await response.json();
        if(data.message) {
            document.getElementById('message').innerText = data.message;
            
            setTimeout(() => {
                document.getElementById('message').innerText = '';
            }, 4000);
        }
        document.querySelector('form').reset();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Add event listener to form submission
document.querySelector('form').addEventListener('submit', handleSubmit);

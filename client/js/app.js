document.addEventListener("DOMContentLoaded", function() {
    // Fetch user's IP address using a third-party service
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const userIP = data.ip;

        console.log(userIP)

        // Send user's IP address to the server for verification
        fetch(`https://peanuts.onrender.com/verify-access`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ipAddress: userIP })
        })
        .then(response => {
            console.log(response)
          if (response.ok) {
            window.location.href = 'admin.html'; // Redirect to page with buttons
          } else {
            window.location.href = 'home.html'; // Redirect to home page
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

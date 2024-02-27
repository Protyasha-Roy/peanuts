const form = document.getElementById('compatibility-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const yourMbtiType = document.getElementById('yourMbtiType').value;
    const partnerMbtiType = document.getElementById('partnerMbtiType').value;

    // Redirect to the compatibility page with URL parameters
    window.location.href = `compatibility.html?yourMbtiType=${yourMbtiType}&partnerMbtiType=${partnerMbtiType}`;
});

console.log(process.env.API_URL)
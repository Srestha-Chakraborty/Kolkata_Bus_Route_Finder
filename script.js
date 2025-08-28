document.getElementById('busForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const source = encodeURIComponent(document.getElementById('source').value);
    const destination = encodeURIComponent(document.getElementById('destination').value);
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = '<p>Loading...</p>'; // Show loading message

    fetch(`/search_bus?source=${source}&destination=${destination}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        resultsDiv.innerHTML = ''; // Clear loading message

        if (data.buses && data.buses.length > 0) {
            data.buses.forEach(bus => {
                const busInfo = document.createElement('div');
                busInfo.classList.add('bus-info');
                busInfo.innerHTML = `<p>Bus No: <strong>${bus.bus_no}</strong> | Route: ${bus.bus_name}</p>`;
                resultsDiv.appendChild(busInfo);
            });
        } else {
            resultsDiv.innerHTML = '<p>No buses found for the selected route.</p>';
        }
    })
    .catch(error => {
        resultsDiv.innerHTML = '<p>An error occurred while fetching bus data. Please try again later.</p>';
        console.error('Error fetching bus data:', error);
    });
});

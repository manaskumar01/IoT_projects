async function fetchSensorData() {
    try {
        const response = await fetch('/api/sensors'); // Ensure this matches the Flask endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('soil-moisture').textContent = data.soil_moisture.toFixed(2);
        document.getElementById('temperature').textContent = data.temperature.toFixed(2);
        document.getElementById('humidity').textContent = data.humidity.toFixed(2);
        document.getElementById('rainfall').textContent = data.rainfall.toFixed(2);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
    }
}
async function controlIrrigation(status) {
    try {
        const response = await fetch('/api/irrigation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert(`Irrigation turned ${status ? 'ON' : 'OFF'}`);
    } catch (error) {
        console.error('Error controlling irrigation:', error);
    }
}

// Add event listeners to buttons
document.getElementById('irrigation-on').addEventListener('click', () => controlIrrigation(true));
document.getElementById('irrigation-off').addEventListener('click', () => controlIrrigation(false));

// Fetch sensor data periodically
setInterval(fetchSensorData, 5000); // Update every 5 seconds
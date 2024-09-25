let heartRateData = [];
const heartRateThreshold = 100; // Example threshold for high heart rate
const ctx = document.getElementById('heartRateChart').getContext('2d');
let chart;

// Initialize Chart.js
function initChart() {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Will be filled dynamically
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: heartRateData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    beginAtZero: true
                }
            },
        },
    });
}

// Function to connect to the heart rate monitor using Web Bluetooth API
async function connectHeartRateSensor() {
    document.getElementById('popup').style.display = 'block';

    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['heart_rate'] }]
        });
        
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('heart_rate');
        const characteristic = await service.getCharacteristic('heart_rate_measurement');

        characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged', handleHeartRateData);
    } catch (error) {
        console.log('Error connecting to heart rate sensor: ', error);
        document.getElementById('popup').style.display = 'none';
    }
}

// Function to process heart rate data
function handleHeartRateData(event) {
    const value = event.target.value;
    const heartRate = value.getUint8(1);
    
    document.getElementById('heartRate').innerText = `Heart Rate: ${heartRate} bpm`;
    document.getElementById('lastHeartRate').innerText = `Last Recorded: ${heartRate} bpm`;

    // Update heart rate data for chart
    heartRateData.push(heartRate);
    if (heartRateData.length > 10) {
        heartRateData.shift(); // Limit to last 10 readings
    }

    // Update chart labels
    const time = new Date().toLocaleTimeString();
    chart.data.labels.push(time);
    if (chart.data.labels.length > 10) {
        chart.data.labels.shift(); // Keep only last 10 timestamps
    }
    
    chart.update();

    // Check heart rate threshold and show health tips
    if (heartRate > heartRateThreshold) {
        showHealthTip("High heart rate detected! Consider taking a break.");
    } else {
        showHealthTip("Your heart rate is normal. Keep up the good work!");
    }
}

// Function to display health tips
function showHealthTip(tip) {
    document.getElementById('healthTips').innerText = tip;
}

// Cancel connection and hide the pop-up
document.getElementById('cancel-btn').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

// Handle form submission
document.getElementById('healthReportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const report = document.getElementById('report').value;
    document.getElementById('submittedReports').innerHTML += `<p>${report}</p>`;
    document.getElementById('report').value = ''; // Clear the input
});

document.getElementById('connect-btn').addEventListener('click', () => {
    initChart(); // Initialize the chart when connecting
    connectHeartRateSensor();
});

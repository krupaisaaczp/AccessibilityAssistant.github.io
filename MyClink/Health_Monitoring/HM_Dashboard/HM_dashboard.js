// Function to navigate to a different page
function navigateTo(page) {
    window.location.href = page;
}

// Function to show notifications
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}

// Show a welcome message on load
window.onload = () => {
    showNotification('Welcome to the Medical Dashboard!');
};

// Modal functionality
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Example function to fetch and update dynamic data
function updateDynamicData() {
    // Here you can implement your logic to fetch and display dynamic health data
    const heartbeatElement = document.getElementById('heartbeatData');
    const stepCountElement = document.getElementById('stepCountData');

    // Simulated data
    const heartbeat = Math.floor(Math.random() * 40) + 60; // Random heartbeat between 60-100
    const steps = Math.floor(Math.random() * 5000); // Random steps

    heartbeatElement.textContent = `Heartbeat: ${heartbeat} bpm`;
    stepCountElement.textContent = `Steps: ${steps}`;
}

// Call the function periodically to update data
setInterval(updateDynamicData, 5000); // Update every 5 seconds

let stepCount = 0;
let lastUpdate = 0;
let distance = 0.0;  // in kilometers
let speed = 0.0;     // in kilometers per hour
let calories = 0.0;  // in kcal
let startTime;
let tracking = false;
let lastAcceleration = null;

const averageStepLength = 0.0008; // Average step length in kilometers (80 cm)

// Function to start tracking
function startTracking() {
    startTime = new Date();
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('devicemotion', handleMotion);
    }

    document.getElementById('start-btn').disabled = true;
    document.getElementById('stop-btn').disabled = false;
    document.getElementById('popup').classList.remove('hidden');
}

// Function to stop tracking
function stopTracking() {
    window.removeEventListener('devicemotion', handleMotion);
    document.getElementById('start-btn').disabled = false;
    document.getElementById('stop-btn').disabled = true;
    tracking = false;
}

// Function to calculate steps and related metrics
function handleMotion(event) {
    const currentTime = Date.now();
    const acceleration = event.accelerationIncludingGravity;

    if (!lastAcceleration) {
        lastAcceleration = acceleration;
        lastUpdate = currentTime;
        return;
    }

    const deltaTime = (currentTime - lastUpdate) / 1000; // in seconds
    lastUpdate = currentTime;

    const deltaX = Math.abs(lastAcceleration.x - acceleration.x);
    const deltaY = Math.abs(lastAcceleration.y - acceleration.y);
    const deltaZ = Math.abs(lastAcceleration.z - acceleration.z);

    const accelerationMagnitude = Math.sqrt(deltaX**2 + deltaY**2 + deltaZ**2);

    if (accelerationMagnitude > 1.5) {  // Basic threshold for step detection
        stepCount++;
        distance = stepCount * averageStepLength; // Update distance
        calories = stepCount * 0.05; // Approximation: 0.05 kcal per step

        const elapsedTime = (currentTime - startTime) / (1000 * 60 * 60); // in hours
        speed = distance / elapsedTime; // Speed in km/h

        updateDisplay();
    }

    lastAcceleration = acceleration;
}

// Function to update the display
function updateDisplay() {
    document.getElementById('step-count').innerText = stepCount;
    document.getElementById('distance-traveled').innerText = distance.toFixed(2);
    document.getElementById('speed').innerText = speed.toFixed(2);
    document.getElementById('calories').innerText = calories.toFixed(0);
}

document.getElementById('start-btn').addEventListener('click', startTracking);
document.getElementById('stop-btn').addEventListener('click', stopTracking);
document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('popup').classList.add('hidden');
});

const voiceButton = document.getElementById('voice-btn');
const output = document.getElementById('output');
const response = document.getElementById('response');
const micIndicator = document.getElementById('mic-indicator');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');
const toggleSpeech = document.getElementById('toggle-speech');

let recognition;
let isListening = false;

voiceButton.addEventListener('click', () => {
    if (!isListening) {
        startVoiceRecognition();
    } else {
        stopVoiceRecognition();
    }
});

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('hidden');
});

closeSettings.addEventListener('click', () => {
    settingsPanel.classList.add('hidden');
});

function startVoiceRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.onstart = () => {
        output.textContent = 'Listening...';
        micIndicator.style.visibility = 'visible'; // Show mic indicator
        isListening = true;
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        output.textContent = `You said: ${transcript}`;
        processCommand(transcript);
    };

    recognition.onend = () => {
        output.textContent += ' (Stopped listening)';
        micIndicator.style.visibility = 'hidden'; // Hide mic indicator
        isListening = false; // Update listening status
    };

    recognition.onerror = (event) => {
        output.textContent = `Error occurred in recognition: ${event.error}`;
        micIndicator.style.visibility = 'hidden';
        isListening = false; // Update listening status
    };

    recognition.start();
}

function stopVoiceRecognition() {
    if (recognition) {
        recognition.stop();
    }
}

function processCommand(command) {
    let responseText = '';

    if (command.includes('hello')) {
        responseText = 'Hello! How can I assist you today?';
    } else if (command.includes('what is your name')) {
        responseText = 'I am your voice assistant.';
    } else if (command.includes('how are you')) {
        responseText = 'I am just a program, but thanks for asking!';
    } else if (command.includes('time')) {
        const currentTime = new Date().toLocaleTimeString();
        responseText = `The current time is ${currentTime}.`;
    } else if (command.includes('date')) {
        const currentDate = new Date().toLocaleDateString();
        responseText = `Today's date is ${currentDate}.`;
    } else if (command.includes('weather')) {
        responseText = 'I can check the weather for you, but please provide a city name.';
    } else {
        responseText = 'Sorry, I didn’t understand that. Could you please rephrase?';
    }

    displayResponse(responseText);
}

function displayResponse(text) {
    response.textContent = text;
    if (toggleSpeech.checked) {
        speakResponse(text);
    }
}

function speakResponse(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

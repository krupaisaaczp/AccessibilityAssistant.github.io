document.getElementById('upload-medical-history').onclick = function() {
    showUploadModal();
};

document.getElementById('chat').onclick = function() {
    showChatModal();
};

document.getElementById('video-call').onclick = function() {
    showVideoCallModal();
};

document.getElementById('book-appointment').onclick = function() {
    showAppointmentModal();
};

document.getElementById('close').onclick = function() {
    closeModal();
};

function showUploadModal() {
    const modalBody = `
        <h2>Upload Medical History</h2>
        <input type="file" id="medicalHistoryFile" accept=".pdf, .doc, .docx">
        <button onclick="uploadFile()">Submit</button>
    `;
    document.getElementById('modal-body').innerHTML = modalBody;
    openModal();
}

function showChatModal() {
    const modalBody = `
        <h2>Chat with Doctor</h2>
        <textarea id="chatInput" placeholder="Type your message here..."></textarea>
        <button onclick="sendChat()">Send</button>
    `;
    document.getElementById('modal-body').innerHTML = modalBody;
    openModal();
}

function showVideoCallModal() {
    const modalBody = `
        <h2>Video Call</h2>
        <p>Accessing camera...</p>
        <button onclick="startVideoCall()">Start Call</button>
    `;
    document.getElementById('modal-body').innerHTML = modalBody;
    openModal();
}

function showAppointmentModal() {
    const modalBody = `
        <h2>Book an Appointment</h2>
        <input type="text" id="patientName" placeholder="Your Name">
        <input type="date" id="appointmentDate">
        <input type="time" id="appointmentTime">
        <button onclick="bookAppointment()">Book</button>
    `;
    document.getElementById('modal-body').innerHTML = modalBody;
    openModal();
}

function openModal() {
    document.getElementById('modal').style.display = "block";
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

function uploadFile() {
    const fileInput = document.getElementById('medicalHistoryFile');
    if (fileInput.files.length > 0) {
        alert('File uploaded successfully!');
        closeModal();
    } else {
        alert('Please select a file to upload.');
    }
}

function sendChat() {
    const chatInput = document.getElementById('chatInput').value;
    if (chatInput.trim() !== "") {
        alert('Message sent: ' + chatInput);
        closeModal();
    } else {
        alert('Please type a message to send.');
    }
}

function startVideoCall() {
    alert('Starting video call...');
    closeModal();
}

function bookAppointment() {
    const name = document.getElementById('patientName').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;

    if (name && date && time) {
        alert(`Appointment booked for ${name} on ${date} at ${time}`);
        closeModal();
    } else {
        alert('Please fill all fields to book an appointment.');
    }
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === document.getElementById('modal')) {
        closeModal();
    }
}

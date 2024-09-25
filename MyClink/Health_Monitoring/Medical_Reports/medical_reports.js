const reportForm = document.getElementById('reportForm');
const reportList = document.getElementById('reportList');
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');

// Array to hold reports
let reports = [];

// Function to render reports on the page
function renderReports() {
    reportList.innerHTML = '';
    reports.forEach((report, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${report.title}</strong> (${report.date})<br>${report.details}
            <a href="${report.file}" target="_blank">View File</a>
            <button class="delete" onclick="deleteReport(${index})">Delete</button>
        `;
        reportList.appendChild(li);
    });
}

// Function to handle form submission
reportForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('reportTitle').value;
    const date = document.getElementById('reportDate').value;
    const details = document.getElementById('reportDetails').value;
    const fileInput = document.getElementById('reportFile');
    const file = fileInput.files[0];

    // Create a new FileReader to read the file
    const reader = new FileReader();
    reader.onload = function(event) {
        // Push report data along with the file data to reports array
        reports.push({
            title,
            date,
            details,
            file: event.target.result // Use the file data as a URL
        });
        renderReports();
        reportForm.reset();
        closeModal();
    };
    
    // Read the file as a data URL
    if (file) {
        reader.readAsDataURL(file);
    }
});

// Function to delete a report
function deleteReport(index) {
    reports.splice(index, 1);
    renderReports();
}

// Function to open modal
function openModal() {
    modal.style.display = "block";
}

// Function to close modal
function closeModal() {
    modal.style.display = "none";
}

// Event listeners for modal open and close
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

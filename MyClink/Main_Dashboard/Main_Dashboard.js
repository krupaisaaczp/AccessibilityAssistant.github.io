// Increase or Decrease Font Size for Better Readability
function adjustFontSize(sizeChange) {
    document.body.style.fontSize = (parseInt(window.getComputedStyle(document.body).fontSize) + sizeChange) + 'px';
}

// Toggle High Contrast Mode
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

// Add Keyboard Navigation (Use arrow keys to navigate between dashboard icons)
document.addEventListener('keydown', function(e) {
    const focusableIcons = document.querySelectorAll('.icon');
    let currentIndex = Array.from(focusableIcons).findIndex(icon => icon === document.activeElement);
    
    if (e.key === 'ArrowRight' && currentIndex < focusableIcons.length - 1) {
        focusableIcons[currentIndex + 1].focus();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        focusableIcons[currentIndex - 1].focus();
    }
});

// Add Hover and Focus Animations for Accessibility
const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.classList.add('hovered');
    });
    icon.addEventListener('mouseleave', () => {
        icon.classList.remove('hovered');
    });
    icon.addEventListener('focus', () => {
        icon.classList.add('focused');
    });
    icon.addEventListener('blur', () => {
        icon.classList.remove('focused');
    });
});

// Placeholder for Voice Command (can use Web Speech API)
document.getElementById('voice-command').addEventListener('click', () => {
    alert('Voice Command Activated (Placeholder for Web Speech API)');
});

// Auto font resize for larger screens or elderly
window.onload = function() {
    adjustFontSize(4); // Increase default font size on load
};
// Adjust Font Size
document.getElementById('increase-font').addEventListener('click', () => adjustFontSize(2));
document.getElementById('decrease-font').addEventListener('click', () => adjustFontSize(-2));

function adjustFontSize(sizeChange) {
    const elements = document.querySelectorAll('body, h1, p');
    elements.forEach(element => {
        const currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
        element.style.fontSize = (currentFontSize + sizeChange) + 'px';
    });
}

// Toggle High Contrast
document.getElementById('toggle-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

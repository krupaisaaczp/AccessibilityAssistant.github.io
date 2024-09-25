// Function to handle game start
function startGame(gameName) {
    const gameCard = document.querySelector(`.game-card[data-game="${gameName}"]`);
    const gameTitle = gameCard.querySelector('h2').innerText;
    
    // Display a loading animation before starting the game
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = `
      <div class="loading">
        <h2>Loading ${gameTitle}...</h2>
        <div class="spinner"></div>
      </div>
    `;
    document.body.appendChild(overlay);
  
    // Simulate game loading for 2 seconds before launching the game
    setTimeout(() => {
      alert(`${gameTitle} is starting now!`);
      
      // Remove the loading overlay once the game starts
      overlay.remove();
  
      // Redirect to the game or activate the specific game functionality
      // For example: window.location.href = `/${gameName}.html`;
    }, 2000); // 2-second delay for a loading animation
  }
  
  // Attach event listeners dynamically to all "Start Game" buttons
  document.querySelectorAll('.start-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const gameName = event.target.closest('.game-card').getAttribute('data-game');
      startGame(gameName);
    });
  });
  
  // Make game cards interactive with hover effects
  document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover');
    });
  
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover');
    });
  });
  
  // Add a button click animation for "Start Game"
  document.querySelectorAll('.start-btn').forEach(button => {
    button.addEventListener('mousedown', () => {
      button.classList.add('clicked');
    });
  
    button.addEventListener('mouseup', () => {
      button.classList.remove('clicked');
    });
  });
  
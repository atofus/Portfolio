const gameEngine = new AnimationEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./images/run.png");
ASSET_MANAGER.queueDownload("./images/run-white.png");
ASSET_MANAGER.queueDownload("./images/run-white-flipped.png");
ASSET_MANAGER.queueDownload("./images/jump-white.png");
ASSET_MANAGER.queueDownload("./images/jump-white-flipped.png");
ASSET_MANAGER.queueDownload("./images/fall-white.png");
ASSET_MANAGER.queueDownload("./images/fall-white-flipped.png");
ASSET_MANAGER.queueDownload("./images/slide-white.png");
ASSET_MANAGER.queueDownload("./images/slide-white-flipped.png");
ASSET_MANAGER.queueDownload("./images/sit-white-flipped.png");
ASSET_MANAGER.queueDownload("./images/sit-flipped.png");
ASSET_MANAGER.queueDownload("./images/sit-white.png");
ASSET_MANAGER.queueDownload("./images/sit.png");
ASSET_MANAGER.queueDownload("./images/skid-white.png");
ASSET_MANAGER.queueDownload("./images/skid.png");
ASSET_MANAGER.queueDownload("./images/walk.png");
ASSET_MANAGER.queueDownload("./images/walk-white.png");
ASSET_MANAGER.queueDownload("./images/walk-white-flipped.png");

function startMainAnimation() {
	ASSET_MANAGER.downloadAll(() => {
		const canvas = document.getElementById("animation");
		const ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;

		gameEngine.addEntity(new Figure(gameEngine)); //put the gameEngine into HollowKnight entity

		gameEngine.init(ctx);

		gameEngine.start();
	});
}


 // Add this function to create random shooting stars across the screen
 function createShootingStars() {
	// Get the viewport dimensions
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;
	
	// Create between 1-5 shooting stars
	const numStars = Math.random() * (5 - 1) + 1;
	
	for (let i = 0; i < numStars; i++) {
	  // Create a shooting star element
	  const star = document.createElement('div');
	  star.className = 'shooting-star';
	  
	  // Random starting position anywhere on screen
	  // For a more natural effect, most shooting stars start from the top portion
	  const startX = Math.random() * viewportWidth;
	  const startY = Math.random() * (viewportHeight * 0.7); // Top 70% of screen
	  
	  // Random size for variety
	  const size = Math.random() * 5 + 2;
	  
	  // Random color - vibrant colors
	  const hue = Math.floor(Math.random() * 360);
	  const saturation = Math.floor(Math.random() * 20) + 80; // 80-100%
	  const lightness = Math.floor(Math.random() * 30) + 60; // 60-90%
	  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	  
	  // Set star styles
	  star.style.width = `${size}px`;
	  star.style.height = `${size}px`;
	  star.style.left = `${startX}px`;
	  star.style.top = `${startY}px`;
	  star.style.backgroundColor = color;
	  star.style.boxShadow = `0 0 ${size*1}px ${size/2}px ${color}`;
	  
	  // Direction - mostly diagonal down
	  const angle = Math.random() * Math.PI/2 + Math.PI/4; // Between 45° and 135°
	  const speed = Math.random() * (15 - 10) + 10;
	  const vx = Math.cos(angle) * speed;
	  const vy = Math.sin(angle) * speed;
	  
	  // Animation duration
	  const duration = Math.random() * 1500 + 1000; // 1-2.5 seconds
	  
	  // Add star to body
	  document.body.appendChild(star);
	  
	  // Animate the star
	  let startTime = null;
	  function animateStar(timestamp) {
		if (!startTime) startTime = timestamp;
		const elapsed = timestamp - startTime;
		const progress = elapsed / duration;
		
		if (progress < 1) {
		  const currentX = parseFloat(star.style.left) + vx;
		  const currentY = parseFloat(star.style.top) + vy;
		  
		  star.style.left = `${currentX}px`;
		  star.style.top = `${currentY}px`;
		  
		  // Fade out gradually
		  star.style.opacity = 0.6 - progress; //the higher the #, the longer it fades out
		  
		  // Trail effect (optional)
		  star.style.boxShadow = `0 0 ${size*2}px ${size/2}px ${color}, 
								0 0 ${size*4}px ${size}px rgba(${hue}, 100%, 90%, ${0.3 - progress*0.3})`;
		  
		  requestAnimationFrame(animateStar);
		} else {
		  document.body.removeChild(star);
		}
	  }
	  
	  requestAnimationFrame(animateStar);
	}
  }
  
// Add event listener to the profile button
document.addEventListener('DOMContentLoaded', function() {
	const profileButton = document.querySelector('.profile-button');
	
	profileButton.addEventListener('click', function(e) {
	  // Create shooting stars randomly throughout the screen
	  createShootingStars();
	  
	  // Ripple effect on the button itself
	  const ripple = document.createElement('span');
	  ripple.className = 'button-ripple';
	  this.appendChild(ripple);
	  
	  // Position the ripple at click point relative to button
	  const rect = this.getBoundingClientRect();
	  const x = e.clientX - rect.left;
	  const y = e.clientY - rect.top;
	  ripple.style.left = `${x}px`;
	  ripple.style.top = `${y}px`;
	  
	  // Remove ripple after animation completes
	  setTimeout(() => {
		ripple.remove();
	  }, 600);
	});
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".logo").onmouseover = event => {
		//this will keep track of the # of times its run
		let iterations = 0;

		// Will use all 26 characters 
		const interval = setInterval(() => { //interval is to make it keep changing on its own
			event.target.innerText = event.target.innerText
				.split("")
				.map((letter, index) => {
					if (index < iterations) {
						return event.target.dataset.value[index];
					}
					return letters[Math.floor(Math.random() * 26)];
				})
				.join("");

			if (iterations > event.target.dataset.value.length) {  //length of the word
				clearInterval(interval);
			}
			iterations += 1 / 3;
		}, 30); //30 times per second
	};
});


window.addEventListener("scroll", () => {
	const header = document.querySelector("header");
	if (window.scrollY > 50) {
	  header.classList.add("scrolled");
	} else {
	  header.classList.remove("scrolled");
	}
});


//Spalsh screen
document.addEventListener('DOMContentLoaded', function() {
	// Create stars for background
	const starsContainer = document.querySelector('.stars');
	const numStars = 100;
	
	for (let i = 0; i < numStars; i++) {
		const star = document.createElement('div');
		star.classList.add('star');
		
		// Random star properties
		const size = Math.random() * 3 + 1;
		star.style.width = `${size}px`;
		star.style.height = `${size}px`;
		star.style.left = `${Math.random() * 100}%`;
		star.style.top = `${Math.random() * 100}%`;
		star.style.animationDelay = `${Math.random() * 3}s`;
		
		starsContainer.appendChild(star);
	}

	
	// Rocket launch effect
	const rocket = document.querySelector('.rocket');
	const splashScreen = document.getElementById('splash-screen');
	const mainContent = document.querySelector('main.container');
	
	rocket.addEventListener('click', function() {
		// Launch rocket
		this.classList.add('launch');

		// Fade out splash screen and show main content
		setTimeout(() => {
			splashScreen.style.opacity = '0';
			splashScreen.style.pointerEvents = 'none';
			document.body.classList.remove('no-scroll'); // ✅ Enable scroll again
			mainContent.style.opacity = '1';
			mainContent.style.pointerEvents = 'auto';
			startMainAnimation();
		}, 850);
			
	});
});



  
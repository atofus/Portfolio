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

	//   this.appendChild(ripple);
	  
	  // Position the ripple at click point relative to button
	  const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

	  ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
	  
	  e.currentTarget.appendChild(ripple);
	  
	  // Remove ripple after animation completes
	  setTimeout(() => {
		ripple.remove();
	  }, 600);
	});
});

//GLITCH EFFECT FOR LOGO
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


// //Spalsh screen
// document.addEventListener('DOMContentLoaded', function() {
// 	// Create stars for background
// 	const starsContainer = document.querySelector('.stars');
// 	if (starsContainer != null) {
// 		const numStars = 100;
	
// 		for (let i = 0; i < numStars; i++) {
// 			const star = document.createElement('div');
// 			star.classList.add('star');
			
// 			// Random star properties
// 			const size = Math.random() * 3 + 1;
// 			star.style.width = `${size}px`;
// 			star.style.height = `${size}px`;
// 			star.style.left = `${Math.random() * 100}%`;
// 			star.style.top = `${Math.random() * 100}%`;
// 			star.style.animationDelay = `${Math.random() * 3}s`;
			
// 			starsContainer.appendChild(star);
// 		}
// 	}

	
// // 	// Rocket launch effect
// 	const rocket = document.querySelector('.rocket');
// 	const splashScreen = document.getElementById('splash-screen');
// 	const mainContent = document.querySelector('main.container');
	
// 	rocket.addEventListener('click', function() {
// 		// Launch rocket
// 		this.classList.add('launch');

// 		// Fade out splash screen and show main content
// 		setTimeout(() => {
// 			// splashScreen.style.opacity = '0';
// 			// splashScreen.style.pointerEvents = 'none';
// 			// ✅ Enable scroll again
// 			document.body.classList.remove('no-scroll'); 
// 			// mainContent.style.opacity = '1';
// 			// mainContent.style.pointerEvents = 'auto';
// 			startMainAnimation();
// 		}, 1000);

// 	});
// // });

//CAROUSEL for project images
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels on the page
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(initCarousel);
});

function initCarousel(carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevButton = carousel.querySelector('.carousel-button.prev');
    const nextButton = carousel.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    
    // Set up event listeners
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            navigate(currentIndex - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            navigate(currentIndex + 1);
        });
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            navigate(index);
        });
    });
    
    // Auto-advance the carousel every 5 seconds
    let interval = setInterval(() => {
        navigate(currentIndex + 1);
    }, 5000);
    
    // Pause auto-advance when hovering over the carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            navigate(currentIndex + 1);
        }, 5000);
    });
    
    function navigate(index) {
        // Handle wrapping around
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        // Remove active class from current slide and dot
        slides[currentIndex].classList.remove('active');
        if (dots[currentIndex]) {
            dots[currentIndex].classList.remove('active');
        }
        
        // Add active class to new slide and dot
        currentIndex = index;
        slides[currentIndex].classList.add('active');
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }
}

// const scene = document.querySelector('.scene div');
// const CreateDiv = () =>{
//     for (let i = 0; i < 210; i++){
//         scene.innerHTML += "<div></div>";
//     }
// }
// CreateDiv();

// const stars = document.querySelectorAll('.scene div');
// stars.forEach( star => {
//     let x = `${Math.random() * 200}vmax`;
//     let y = `${Math.random() * 100}vh`;
//     let z = `${Math.random() * 200 - 100}vmin`;
//     let rx = `${Math.random() * 360}deg`;
//     star.style.setProperty('--x', x);
//     star.style.setProperty('--y', y);
//     star.style.setProperty('--z', z);
//     star.style.setProperty('--rx', rx);
//     let delay = `${Math.random() * 1.5}s`;
//     star.style.animationDelay = delay;
// })


//Project-Description Read more option:
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
        e.preventDefault();
        const shortText = this.previousElementSibling.previousElementSibling;
        const fullText = this.previousElementSibling;
        const isExpanded = fullText.style.display === 'inline';

        shortText.style.display = isExpanded ? 'inline' : 'none';
        fullText.style.display = isExpanded ? 'none' : 'inline';
        this.textContent = isExpanded ? 'Read more' : 'Read less';
    });
});

//Go back up to top of page button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 2000) { //at what point do we want the button to fade in
	scrollToTopBtn.classList.add("show");
  } else {
	scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
	top: 0,
	behavior: "smooth"
  });
});

//float profile image
  // Special animation for the profile image with a float effect
  const profileImage = document.querySelector('.profile-image');
  if (profileImage) {
    profileImage.addEventListener('animationend', function(e) {
      if (e.animationName === 'fadeInLeft') {
        this.classList.add('animate-float');
      }
    });
  }

  document.querySelector('a[href="#experience"]').addEventListener('click', function (e) {
	e.preventDefault();
	const headerOffset = 30; // Change this to match your header height
	const element = document.getElementById('experience');
	const elementPosition = element.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
	window.scrollTo({
	  top: offsetPosition,
	  behavior: 'smooth'
	});
  });
  
  document.querySelector('a[href="#projects"]').addEventListener('click', function (e) {
	e.preventDefault();
	const headerOffset = 20; // Change this to match your header height
	const element = document.getElementById('project');
	const elementPosition = element.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
	window.scrollTo({
	  top: offsetPosition,
	  behavior: 'smooth'
	});
  });

  document.querySelector('a[href="#contact"]').addEventListener('click', function (e) {
	e.preventDefault();
	const headerOffset = 125; // Change this to match your header height
	const element = document.getElementById('contact');
	const elementPosition = element.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
	window.scrollTo({
	  top: offsetPosition,
	  behavior: 'smooth'
	});
  });

  document.querySelector('a[href="#logo"]').addEventListener('click', function (e) {
	e.preventDefault();
  
	window.scrollTo({
	  top: 0,
	  behavior: 'smooth'
	});
  });

  // Add this function to your existing index.js file
function createSmokeEffect() {
	const smokeContainer = document.getElementById('smoke-container');
	if (!smokeContainer) return;
  
	// Clear any existing smoke particles
	smokeContainer.innerHTML = '';
	
	// Create new smoke particles
	for (let i = 0; i < 15; i++) {
	  const smoke = document.createElement('div');
	  smoke.className = 'smoke-particle';
	  
	  // Randomize position and animation delay
	  const offsetX = Math.random() * 30 - 15; // -15px to 15px
	  const offsetY = Math.random() * 10;      // 0 to 10px
	  const delay = Math.random() * 0.5;       // 0 to 0.5s delay
	  
	  smoke.style.left = `calc(50% + ${offsetX}px)`;
	  smoke.style.bottom = `${offsetY}px`;
	  smoke.style.animationDelay = `${delay}s`;
	  
	  smokeContainer.appendChild(smoke);
	}
  }
  
  // Modify the rocket click event listener in your splash screen code
//   document.addEventListener('DOMContentLoaded', function() {
	
// 	// Rocket launch effect
// 	const rocket = document.querySelector('.rocket');
// 	const splashScreen = document.getElementById('splash-screen');
// 	const mainContent = document.querySelector('main.container');
	
// 	if (rocket) {
// 	  // Add hover effect for rocket
// 	  rocket.addEventListener('mouseenter', function() {
// 		createSmokeEffect();
// 	  });
	  
// 	  rocket.addEventListener('click', function() {
// 		// Launch rocket
// 		this.classList.add('launch');
		
// 		// Create more intense smoke effect
// 		createSmokeEffect();
		
// 		// Repeat smoke effect several times during launch
// 		const smokeInterval = setInterval(createSmokeEffect, 200);
		
// 		// Fade out splash screen and show main content
// 		setTimeout(() => {
// 		  splashScreen.style.opacity = '0';
// 		  splashScreen.style.pointerEvents = 'none';
// 		  // Enable scroll again
// 		  document.body.classList.remove('no-scroll');
// 		  mainContent.style.opacity = '1';
// 		  mainContent.style.pointerEvents = 'auto';
// 		  startMainAnimation();
		  
// 		  // Stop creating smoke after transition
// 		  clearInterval(smokeInterval);
// 		}, 1000);
// 	  });
// 	}
//   });
  
  //Scroll event listener to animate elements as they appear
  window.addEventListener("scroll", function() {
	const header = document.querySelector("header");
	if (window.scrollY > 50) {
	  header.classList.add("scrolled");
	} else {
	  header.classList.remove("scrolled");
	}
	
	// This is handled by Intersection Observer in animations.js now
  });
  
  // Add this to initialize animations when the page is fully loaded
//   window.addEventListener('load', function() {
// 	// Trigger animation for elements above the fold
// 	setTimeout(() => {
// 	  const elementsAboveFold = document.querySelectorAll('.intro-heading, .profile-image');
// 	  elementsAboveFold.forEach(el => {
// 		if (el.classList.contains('fade-in') || 
// 			el.classList.contains('fade-in-left') || 
// 			el.classList.contains('fade-in-right') ||
// 			el.classList.contains('fade-in-up') ||
// 			el.classList.contains('fade-in-down')) {
// 		  el.classList.add('visible');
// 		}
// 	  });
// 	}, 500); // Small delay to ensure everything is ready
//   });



  
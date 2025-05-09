// Enhanced indexAnim.js - Improved entrance animations

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

document.addEventListener('DOMContentLoaded', function() {
  // Initialize splash screen interactions
  initSplashScreen();
  
  // Setup scroll animations
  setupScrollAnimations();
  
  // Fix for background stars animation to continue even after splash screen
  continueStarAnimation();
});

document.addEventListener("DOMContentLoaded", function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // rest of your animation and init code...
});

// Splash screen interactions
function initSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  const rocket = document.querySelector('.rocket');
  const mainContent = document.querySelector('main.container');
  const header = document.querySelector('header');
  const splashName = document.querySelector('.splash-name');
  const instructions = document.querySelector('.instructions');
  const profile = document.querySelector('.profile');
  const skills = document.querySelector('.skills-section')
  const icons = document.querySelector('.splash-icons');
  
  // Make sure content is initially hidden
  if (mainContent) mainContent.style.opacity = '0';
  if (header) header.style.opacity = '0';
  // Hide the profile section completely initially
  if (profile) {
    profile.style.opacity = '0';
    profile.style.visibility = 'hidden';
  }
  if (skills) {
    skills.style.opacity = '0';
    skills.style.visibility = 'hidden';
  }

  
  // Highlight rocket and instructions with pulse animation
  if (instructions) {
    // Make instructions more visible and add pulse animation
    instructions.style.opacity = '1';
  }
  
  if (rocket && splashScreen) {
    // Make rocket interactive
    rocket.style.cursor = 'pointer';
    
    // Subtle float animation for rocket before click
    rocket.classList.add('animate-float');
    
    // Rocket interaction
    rocket.addEventListener('click', function() {
      console.log("Rocket launched!");

        // First, scroll to top of page to ensure rocket launches from top
        // window.scrollTo(0, 0);
      
      // Stop float animation
      rocket.classList.remove('animate-float');
      
      // Start rocket launch animation
      rocket.classList.add('rocket-launch');
      
      // Animate the name
      if (splashName) {
        splashName.classList.add('splash-name-reveal');
      }

      if (icons) {
        icons.classList.add('splash-icon-reveal');
      }
      
      // Hide instructions immediately
      if (instructions) {
        instructions.style.display = 'none';
      }
      
      // Start splash screen exit animation
      setTimeout(() => {
        splashScreen.classList.add('splash-exit');
      }, 300);
      
      // After animations, show main content
      setTimeout(() => {
        // Hide splash screen
        splashScreen.style.display = 'none';
        
        // Show header
        if (header) {
          header.style.opacity = '1';
          header.style.transition = 'opacity 0.5s ease';
          header.classList.add('animate-fade-in-down');
        }
        
        // Show main content
        if (mainContent) {
          mainContent.style.opacity = '1';
          mainContent.style.transition = 'opacity 0.5s ease';
        }
        
        // Enable scrolling
        document.body.classList.remove('no-scroll');
        
        // Reveal the profile section with a slight delay
        setTimeout(() => {
          if (profile) {
            profile.style.visibility = 'visible';
            profile.style.opacity = '1';
            profile.style.transition = 'opacity 0.5s ease';
            
            // Start entrance animations for profile elements
            startMainAnimation();
            triggerEntranceAnimations();
          }
          if (skills) {
            skills.style.visibility = 'visible';
            skills.style.opacity = '1';
            skills.style.transition = 'opacity 2s ease';
          }
        }, 300);
      }, 1700);
    });
  } else {
    console.log("Splash screen elements not found");
    // If splash screen elements aren't available, show content directly
    if (mainContent) mainContent.style.opacity = '1';
    if (header) header.style.opacity = '1';
    if (profile) {
      profile.style.visibility = 'visible';
      profile.style.opacity = '1';
    }
    if (skills) {
      skills.style.visibility = 'visible';
      skills.style.opacity = '1';
    }
    document.body.classList.remove('no-scroll');
    
    // Trigger animations without delay
    triggerEntranceAnimations();
  }
}

// Function to trigger entrance animations
// Function to trigger entrance animations
function triggerEntranceAnimations() {
  // Profile section animations with staggered timing
  const profileElements = [
    { selector: '.profile-image', animation: 'animate-fade-in-left', delay: 0 },
    { selector: '.text-content', animation: 'animate-fade-in-right', delay: 200 },
    { selector: '.intro-heading', animation: 'animate-fade-in-up', delay: 400 },
    { selector: '.location', animation: 'animate-fade-in-up', delay: 500 },
    { selector: '.about-text', animation: 'animate-fade-in-up', delay: 600 },
    { selector: '.about-text1', animation: 'animate-fade-in-up', delay: 700 },
    { selector: '.about-text2', animation: 'animate-fade-in-up', delay: 800 },
    { selector: '.social-icons', animation: 'animate-fade-in-up', delay: 900 },
    { selector: '.skills-heading', animation: 'animate-fade-in-up', delay: 1000}
  ];
  
  // First ensure all elements start hidden
  profileElements.forEach(item => {
    const element = document.querySelector(item.selector);
    if (element) {
      // Apply hidden state immediately
      // element.classList.add('animate-hidden'); // THIS FIXED EVERYTHING
      // Set initial state for animations
      if (item.animation === 'animate-fade-in-up') {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
      } else if (item.animation === 'animate-fade-in-left') {
        element.style.transform = 'translateX(-20px)';
        element.style.opacity = '0';
      } else if (item.animation === 'animate-fade-in-right') {
        element.style.transform = 'translateX(20px)';
        element.style.opacity = '0';
      }
    }
  });
  
  // Then apply animations to each element with delay
  profileElements.forEach(item => {
    const element = document.querySelector(item.selector);
    if (element) {
      // Trigger animation after delay
      setTimeout(() => {
        element.classList.remove('animate-hidden');
        element.classList.add(item.animation);
        
        // Reset the inline styles to let CSS animations take over
        element.style.transform = '';
        element.style.opacity = '';
        
        // Special cases for certain elements
        if (item.selector === '.profile-image') {
          // Add float animation after fade-in completes
          element.addEventListener('animationend', function(e) {
            // console.log("Animation ended:", e.animationName);
            // The actual animation name from your CSS, not the class name
            if (e.animationName === 'animate-fade-in-left' || e.animationName === 'fadeInLeft') {
              element.classList.add('animate-float');
              // console.log("Added float animation");
            }
          });
        }
        
        // Add pulse effect to buttons
        if (item.selector === '.text-content') {
          // Listen to the animationend on the text-content element
          element.addEventListener('animationend', function(e) {
            console.log("Text content animation ended:", e.animationName);
            
            // Check if this is the right animation that ended
            if (e.animationName === 'fadeInRight') {
              // Get only the first button
              const firstButton = this.querySelector('.profile-button');
              
              if (firstButton) {
                console.log("Found first button, adding shadow pulse");
                
                // Add a slight delay so it happens after the parent animation
                setTimeout(() => {
                  firstButton.classList.add('animate-shadow-pulse');
                  console.log("Added shadow pulse animation to first button");
                }, 200);
              }
            }
          });
        }
      }, item.delay);
    }
  });
}

// Check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 && 
    rect.bottom >= 0
  );
}

// Setup animations for elements that appear on scroll
function setupScrollAnimations() {
  // Elements to animate on scroll
  const scrollElements = [
    // Skills section
    // { selector: '.skills-heading', animation: 'animate-fade-in-up'},
    { selector: '.skills-grid .skill-item', animation: 'animate-fade-in-up', staggered: true },
    { selector: '.language-item', animation: 'animate-fade-in-left', staggered: true },
    
    // Experience section
    { selector: '.experience-header', animation: 'animate-fade-in-up' },
    { selector: '.tabs', animation: 'animate-fade-in-up' },
    { selector: '.timeline-item', animation: 'animate-fade-in-left', staggered: true },
    
    // Projects section
    { selector: '.project-header', animation: 'animate-fade-in-up' },
    { selector: '.project-card', animation: 'animate-fade-in-up', staggered: true },
    { selector: '.view-more-projects', animation: 'animate-fade-in-up' },
    
    // Contact section
    { selector: '.contact-header', animation: 'animate-fade-in-up' },
    { selector: '.contact-subtext', animation: 'animate-fade-in-up' },
    { selector: '.contact-form', animation: 'animate-fade-in-up' }
  ];
  
  // Apply hidden state to all scroll elements
  scrollElements.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(el => {
      el.classList.add('animate-hidden');
    });
  });
  
  // Function to check and animate elements on scroll
  function checkScrollPosition() {
    scrollElements.forEach(item => {
      const elements = document.querySelectorAll(item.selector);
      
      elements.forEach((element, index) => {
        if (isInViewport(element) && element.classList.contains('animate-hidden')) {
          // Apply staggered delay for groups of elements
          const delay = item.staggered ? index * 100 : 0;
          
          setTimeout(() => {
            element.classList.remove('animate-hidden');
            element.classList.add(item.animation);
          }, delay);
        }
      });
    });
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', checkScrollPosition);
  // Check once on page load
  window.addEventListener('load', checkScrollPosition);
}


// Ensure stars continue to animate in the background
function continueStarAnimation() {
  // This function ensures the star background animation continues
  // even after the splash screen is removed
  const originalCanvas = document.getElementById('canvas');
  if (originalCanvas) {
    // Make sure the canvas remains even when splash screen is gone
    originalCanvas.style.position = 'fixed';
    originalCanvas.style.top = '0';
    originalCanvas.style.left = '0';
    originalCanvas.style.zIndex = '-1';
    originalCanvas.style.pointerEvents = 'none';
  }
}

//Splash screen
document.addEventListener('DOMContentLoaded', function() {
	// Create stars for background
	const starsContainer = document.querySelector('.stars');
	if (starsContainer != null) {
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
	}
});

	// // Rocket launch effect
	// const rocket = document.querySelector('.rocket');
	// const splashScreen = document.getElementById('splash-screen');
	// const mainContent = document.querySelector('main.container');
	
	// rocket.addEventListener('click', function() {
	// 	// Launch rocket
	// 	this.classList.add('launch');

	// 	// Fade out splash screen and show main content
	// 	setTimeout(() => {
	// 		splashScreen.style.opacity = '0';
	// 		splashScreen.style.pointerEvents = 'none';
	// 		// ✅ Enable scroll again
	// 		document.body.classList.remove('no-scroll'); 
	// 		mainContent.style.opacity = '1';
	// 		mainContent.style.pointerEvents = 'auto';
	// 		startMainAnimation();
	// 	}, 1000);

	// });
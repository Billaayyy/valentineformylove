// Helper: returns a promise that resolves after ms milliseconds
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Helper: Fades out a slide then adds the "hidden" class
  function fadeOutSlide(slide, duration = 1000) {
    return new Promise(resolve => {
      slide.classList.remove('fade-in');
      slide.classList.add('fade-out');
      setTimeout(() => {
        slide.classList.add('hidden');
        resolve();
      }, duration);
    });
  }
  
  // Helper: Fades in a slide by removing "hidden" and adding "fade-in"
  function fadeInSlide(slide, duration = 1000) {
    return new Promise(resolve => {
      slide.classList.remove('hidden');
      slide.classList.add('fade-in');
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
  
  // ----- Slide 1 to Slide 2 Transition -----
  document.getElementById('playButton').addEventListener('click', async () => {
    const slide1 = document.getElementById('slide1');
    const slide2 = document.getElementById('slide2');
  
    await fadeOutSlide(slide1, 1000);
    await fadeInSlide(slide2, 1000);
  
    // Wait 2 seconds, then move picture grid and reveal short typewriter text
    await delay(2000);
    document.getElementById('pictureGrid').style.transform = 'translateY(-20px)';
    document.getElementById('shortTypewriterText').classList.remove('hidden');
  
    // Wait for short typewriter animation to finish (~4 seconds), then transition to Slide 3
    await delay(4000);
    await fadeOutSlide(slide2, 1000);
    const slide3 = document.getElementById('slide3');
    await fadeInSlide(slide3, 1000);
    typeWriter();
  });
  
  // ----- Long Typewriter Effect for Slide 3 -----
  const slide3TextElement = document.getElementById('slide3Text');
  const longText = `Hey Jena, 
  
  This is your loving boyfriend speaking, well not actually speaking, but anyway, it's me Billy your favorite person, i think hehe..
  
  Happy Valentine's Day, i'm so happy that you are my valentine, and i hope it keeps going on till we're 80, well i'm not gonna stop sending you love till we're 80 but, it's just a rizz yk, i love you till the end of my life, and in the after life, i still love you, i don't know if that's possible or na, but if it's possible i'll still love you hehe, well i don't know how to send you some valentines gift, and the time ur back here, it's probably way too long, so.. imma present you with 3 things in the next screen..`;
  
  function typeWriter() {
    let i = 0;
    const speed = 50; // ms per character
  
    function type() {
      if (i < longText.length) {
        slide3TextElement.textContent += longText.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // When finished, show the Proceed button
        const proceedButton = document.getElementById('proceedButton');
        proceedButton.classList.remove('hidden');
        proceedButton.classList.add('fade-in');
      }
    }
    type();
  }
  
  // ----- Proceed Button: Slide 3 to Slide 4 Transition -----
  document.getElementById('proceedButton').addEventListener('click', async () => {
    const slide3 = document.getElementById('slide3');
    const slide4 = document.getElementById('slide4');
  
    await fadeOutSlide(slide3, 1000);
    await fadeInSlide(slide4, 1000);
  
    // After 3 seconds on Slide 4, automatically transition to Slide 5
    await delay(3000);
    await fadeOutSlide(slide4, 1000);
    const slide5 = document.getElementById('slide5');
    await fadeInSlide(slide5, 1000);
  });
  
  // ----- Slide 5: Gacha Screen Interaction -----
  const slide5 = document.getElementById('slide5');
  let gachaStep = 0;
  function gachaClickHandler(e) {
    // Ignore clicks on buttons
    if (e.target.tagName === 'BUTTON') return;
  
    if (gachaStep === 0) {
      document.getElementById('item1').classList.remove('hidden');
      gachaStep++;
    } else if (gachaStep === 1) {
      document.getElementById('item2').classList.remove('hidden');
      gachaStep++;
    } else if (gachaStep === 2) {
      document.getElementById('item3').classList.remove('hidden');
      gachaStep++;
      // Once all items are revealed, hide the global instructions and show the buttons
      document.getElementById('gachaInstructions').classList.add('hidden');
      document.getElementById('gachaButtons').classList.remove('hidden');
      slide5.removeEventListener('click', gachaClickHandler);
    }
  }
  slide5.addEventListener('click', gachaClickHandler);
  
// Helper: returns a promise that resolves after ms milliseconds
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Helper: Fades out a slide then adds the "hidden" class
  function fadeOutSlide(slide, duration = 1000) {
    return new Promise(resolve => {
      slide.classList.remove('fade-in');
      slide.classList.add('fade-out');
      setTimeout(() => {
        slide.classList.add('hidden');
        resolve();
      }, duration);
    });
  }
  
  // Helper: Fades in a slide by removing "hidden" and adding "fade-in"
  function fadeInSlide(slide, duration = 1000) {
    return new Promise(resolve => {
      slide.classList.remove('hidden');
      slide.classList.add('fade-in');
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
  
  /* ... (Existing code for Slides 1–5 remains unchanged) ... */
  
  // ----- "I'll Take it <3" Button (Slide 5 to Slide 6) -----
  document.getElementById('takeButton').addEventListener('click', async (e) => {
    e.stopPropagation();
    await fadeOutSlide(document.getElementById('slide5'), 1000);
    const slide6 = document.getElementById('slide6');
    await fadeInSlide(slide6, 1000);
    // Launch confetti and start cycling the bottom text on Slide 6
    launchConfetti();
    cycleFinalText();
  });
  
  // ----- Launch Confetti Function -----
  function launchConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#FFC107', '#E91E63', '#00BCD4', '#4CAF50', '#FF5722'];
    const confettiCount = 100;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      // Set a random color
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      // Position randomly across the width
      confetti.style.left = Math.random() * 100 + '%';
      // Start at a random vertical position near the top
      confetti.style.top = Math.random() * 20 + 'px';
      // Random rotation
      confetti.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
      // Random animation duration between 2s and 5s
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confettiContainer.appendChild(confetti);
    }
    // Remove confetti elements after 5 seconds
    setTimeout(() => {
      confettiContainer.innerHTML = '';
    }, 5000);
  }
  
  // ----- Cycle Final Text Function -----
  function cycleFinalText() {
    const cycleElement = document.getElementById('cycleText');
    const messages = [
      "Hehe.. That's all.. you can leave now..",
      "Well.. i designed this website today.. but there'll be part 2 soon.."
    ];
    let index = 0;
    cycleElement.textContent = messages[index];
    
    setInterval(() => {
      // Fade out over 1 second
      cycleElement.classList.add('fade-out');
      
      setTimeout(() => {
        // Update the message once faded out
        index = (index + 1) % messages.length;
        cycleElement.textContent = messages[index];
        
        // Remove fade-out and add fade-in for 1 second
        cycleElement.classList.remove('fade-out');
        cycleElement.classList.add('fade-in');
        
        setTimeout(() => {
          cycleElement.classList.remove('fade-in');
        }, 1000);
        
      }, 1000);
      
    }, 8000); // Each cycle lasts 8 seconds total
  }  
  
// ----- "Ew, No." Button: Small Random Teleportation (further) -----
document.getElementById('noButton').addEventListener('click', (e) => {
    e.stopPropagation();
    const noButton = document.getElementById('noButton');
    // Random offset between -50 and 50 pixels
    const randomX = Math.floor(Math.random() * 101) - 50;
    const randomY = Math.floor(Math.random() * 101) - 50;
    noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });
  
  
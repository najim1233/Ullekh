
document.addEventListener("DOMContentLoaded", function () {
  // Fade-in effect on scroll for elements with the class .section
  const elements = document.querySelectorAll(".section");

  function fadeInOnScroll() {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        element.classList.add("fade-in");
      } else {
        element.classList.remove("fade-in");
      }
    });
  }

  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll(); // Initial call to ensure elements can fade in immediately if already in view

  // Smooth scroll effect for all anchor links with href starting with #
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  
  
  // Function to dynamically add a notice on the page
function addNotice(message) {
  const noticeContainer = document.createElement('div');
  noticeContainer.classList.add('notice');
  noticeContainer.innerHTML = `<p>${message}</p><button class="close-notice" onclick="closeNotice(this)">Close</button>`;
  
  // Append the notice to the body or a specific section
  document.body.appendChild(noticeContainer);
}

// Function to close a specific notice
function closeNotice(button) {
  const notice = button.parentElement;
  notice.style.display = 'none';
}

// Function to show the modal popup with a notice
function showNotice(message) {
  const noticeMessage = message || "The exam is starting in 2 minutes. Please get ready!";
  document.getElementById('notice-message').innerText = noticeMessage;
  document.getElementById('noticeModal').style.display = 'block';
}

// Function to close the modal popup
function closeModal() {
  document.getElementById('noticeModal').style.display = 'none';
}

// Function to trigger notices at specified intervals
function startIntervalNotices() {
  // Trigger a notice 7 minutes after page load
  setTimeout(() => {
    addNotice("Reminder: 7 minutes have passed since loading the page.");
  }, 7 * 60 * 1000); // 7 minutes

  // Trigger a notice every 5 seconds
  setInterval(() => {
    addNotice("This is a notice triggered every 5 seconds.");
  }, 5000); // 5 seconds

  // Trigger a notice every 10 minutes
  setInterval(() => {
    addNotice("This is a notice triggered every 10 minutes.");
  }, 10 * 60 * 1000); // 10 minutes

  // Trigger a notice every hour
  setInterval(() => {
    addNotice("This is a notice triggered every hour.");
  }, 60 * 60 * 1000); // 1 hour

  // Trigger a notice based on current time (example: every time the minute is 30)
  setInterval(() => {
    const currentTime = new Date();
    if (currentTime.getMinutes() === 30) {
      addNotice("It's 30 minutes past the hour!");
    }
  }, 60000); // Check every minute
  
}

// Call the function when the page is loaded
window.onload = function() {
  startIntervalNotices();
};
  
// Example exam data (can be fetched dynamically from a server)
const exams = [
  {
    name: 'Mathematics Exam',
    date: 'March 3, 2025 05:15:00',
    duration: '2 Hours',
    materialLink: 'https://www.example.com/material/maths.pdf',
    examLink: 'https://www.example.com/exam/maths'
  },
  {
    name: 'Physics Exam',
    date: 'March 15, 2025 11:00:00',
    duration: '2 Hours',
    materialLink: 'https://www.example.com/material/physics.pdf',
    examLink: 'https://www.example.com/exam/physics'
  }
];

// Function to dynamically generate the exam cards
function generateExamCards() {
  const examCardsContainer = document.getElementById('exam-cards-container');
  
  exams.forEach(exam => {
    const examCard = document.createElement('div');
    examCard.classList.add('col-md-6');
    
    examCard.innerHTML = `
      <div class="exam-card">
        <h3>${exam.name}</h3>
        <p>Date: <span>${new Date(exam.date).toLocaleDateString()}</span></p>
        <p>Time: <span>${new Date(exam.date).toLocaleTimeString()}</span></p>
        <p>Duration: <span>${exam.duration}</span></p>
        <div id="countdown-${exam.name.replace(/\s+/g, '-').toLowerCase()}"></div>
        <button id="exam-btn-${exam.name.replace(/\s+/g, '-').toLowerCase()}" class="download-btn">Download Study Material</button>
      </div>
    `;
    
    examCardsContainer.appendChild(examCard);
    setupExamCountdown(exam);
  });
}

// Function to setup countdown and change button state
function setupExamCountdown(exam) {
  const examName = exam.name.replace(/\s+/g, '-').toLowerCase();
  const countdownElem = document.getElementById(`countdown-${examName}`);
  const examBtn = document.getElementById(`exam-btn-${examName}`);
  
  const examTime = new Date(exam.date).getTime();
  const materialLink = exam.materialLink;
  const examLink = exam.examLink;

  // Countdown timer
  const interval = setInterval(function() {
    const now = new Date().getTime();
    const distance = examTime - now;

    // Calculate remaining time
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElem.innerHTML = `Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Show download button until 2 minutes before the exam
    if (distance > 120000) {
      examBtn.innerHTML = 'Download Study Material';
      examBtn.href = materialLink;
    } else if (distance <= 120000 && distance > 0) {
      examBtn.innerHTML = 'Get Ready for Exam';
      examBtn.onclick = showNotice;
    } else {
      clearInterval(interval);
      countdownElem.innerHTML = "Exam Started!";
      examBtn.innerHTML = 'Start Exam';
      examBtn.onclick = function() {
        window.location.href = examLink; // Start the exam
      };
    }
  }, 1000);
}

// Function to show the modal popup
function showNotice() {
  const noticeMessage = "The exam is starting in 2 minutes. Please get ready!";
  document.getElementById('notice-message').innerText = noticeMessage;
  document.getElementById('noticeModal').style.display = 'block';
}


// Function to close the modal popup

// Call the function when the page is loaded
window.onload = generateExamCards;


  // Fade-in effect for .tip-card elements as the user scrolls
  const tips = document.querySelectorAll('.tip-card');
  function fadeInTips() {
    tips.forEach(tip => {
      const rect = tip.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        tip.classList.add('fade-in');
      }
    });
  }
function closeModal() {
  document.getElementById('noticeModal').style.display = 'none';
}
  window.addEventListener('scroll', fadeInTips);
  fadeInTips(); // Initial call

  // Smooth scrolling for the Learn More button
  const learnMoreButton = document.querySelector('.cta-btn');
  if (learnMoreButton) {
    learnMoreButton.addEventListener('click', function (e) {
      e.preventDefault();
      const targetSection = document.querySelector('#about-us');
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }

  // Scroll to the hero section as soon as the page loads
  const examSection = document.getElementById('exam-section');
  const heroSection = document.getElementById('hero-section');
  if (examSection) {
    examSection.scrollIntoView({
      behavior: 'smooth', // Smooth scroll
      block: 'start' // Scroll to the top of the element
    });
  }

  // Listen for scroll events and return to hero section on scroll up
  window.addEventListener('scroll', function () {
    // If the user scrolls to the top of the page (scrollY = 0)
    if (window.scrollY === 0) {
      // Scroll to the hero section smoothly
      heroSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });

  // Get the scroll-to-top button
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Show the button when the user scrolls down 100px or more
  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollTopBtn.classList.add("show"); // Add 'show' class to make it visible
    } else {
      scrollTopBtn.classList.remove("show"); // Remove 'show' class to hide the button
    }
  };

  // When the user clicks the button, scroll to the top of the document
  if (scrollTopBtn) {
    scrollTopBtn.onclick = function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll to the top
      });
    };
  }
});


    

// const socket = new WebSocket('ws://localhost:8080');


// const username = `dilshad`; 

// socket.onmessage = function (event) {
//     const chatBox = document.getElementById('chat-box');
//     const data = JSON.parse(event.data); 

    
//     if (data.username === username) return;

    
//     const message = document.createElement('div');
//     message.classList.add('message', 'received'); 
//     message.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
//     chatBox.appendChild(message);

//     chatBox.scrollTop = chatBox.scrollHeight; 
// };


// function sendMessage() {
//     const messageInput = document.getElementById('message');
//     const message = messageInput.value.trim();

//     if (message !== '') {
      
//         const chatBox = document.getElementById('chat-box');
//         const messageDiv = document.createElement('div');
//         messageDiv.classList.add('message');
//         messageDiv.innerHTML = `${message} <strong>:${username}</strong>`;
//         chatBox.appendChild(messageDiv);

//         chatBox.scrollTop = chatBox.scrollHeight; 

        
//         socket.send(JSON.stringify({ username, message }));

        
//         messageInput.value = '';
//     }
// }

// MODERN PORTFOLIO JAVASCRIPT

// DOM Elements
const hamburgerIcon = document.querySelector('.hamburger-icon');
const menuLinks = document.querySelector('.menu-links');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

function initTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon();
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  if (currentTheme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Mobile Menu Toggle
function toggleMenu() {
  hamburgerIcon.classList.toggle('open');
  menuLinks.classList.toggle('open');
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      if (menuLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Navbar Background on Scroll
function handleNavbarScroll() {
  const navbar = document.querySelector('.glass-nav');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(20px)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    navbar.style.backdropFilter = 'blur(20px)';
  }
}

// Typing Animation for Hero Section
function initTypingAnimation() {
  const typingText = document.querySelector('.typing-text');
  const texts = ['Frontend Developer', 'UI/UX Designer', 'Web Developer', 'Creative Coder'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 100 : 150;
    
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeText, typeSpeed);
  }
  
  if (typingText) {
    typeText();
  }
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.project-card, .experience-card, .certificate-card, .contact-card, .stat-card'
  );
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
  const profileImage = document.querySelector('.profile-image');
  const particles = document.querySelectorAll('.particle');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (profileImage) {
      profileImage.style.transform = `translateY(${rate}px)`;
    }
    
    particles.forEach((particle, index) => {
      const speed = (index + 1) * 0.1;
      particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Form Handling
function initFormHandling() {
  const form = document.querySelector('.modern-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Simulate form submission
      showNotification('Message sent successfully!', 'success');
      form.reset();
    });
  }
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === 'success' ? 'background: #10b981;' : ''}
    ${type === 'error' ? 'background: #ef4444;' : ''}
    ${type === 'info' ? 'background: #3b82f6;' : ''}
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Skill Level Animations
function initSkillAnimations() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
      }
    });
  }, { threshold: 0.5 });
  
  skillItems.forEach(skill => {
    skillObserver.observe(skill);
  });
}

// Add CSS for skill animations
function addSkillAnimationCSS() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;
  document.head.appendChild(style);
}

// Project Card Tilt Effect
function initProjectTiltEffect() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// Loading Animation
function initLoadingAnimation() {
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .social-links');
    
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  });
}

// Add loading styles
function addLoadingCSS() {
  const style = document.createElement('style');
  style.textContent = `
    .hero-greeting,
    .hero-title,
    .hero-subtitle,
    .hero-description,
    .hero-buttons,
    .social-links {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    body.loaded .hero-greeting,
    body.loaded .hero-title,
    body.loaded .hero-subtitle,
    body.loaded .hero-description,
    body.loaded .hero-buttons,
    body.loaded .social-links {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

// Initialize all functions
function init() {
  initTheme();
  initSmoothScrolling();
  initTypingAnimation();
  initScrollAnimations();
  initParallaxEffect();
  initFormHandling();
  initSkillAnimations();
  initProjectTiltEffect();
  initLoadingAnimation();
  addSkillAnimationCSS();
  addLoadingCSS();
  
  // Event listeners
  window.addEventListener('scroll', () => {
    updateActiveNavLink();
    handleNavbarScroll();
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburgerIcon.contains(e.target) && !menuLinks.contains(e.target)) {
      if (menuLinks.classList.contains('open')) {
        toggleMenu();
      }
    }
  });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

// Export functions for global access
window.toggleMenu = toggleMenu;
window.toggleTheme = toggleTheme;
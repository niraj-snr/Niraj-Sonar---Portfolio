document.addEventListener('DOMContentLoaded', () => {

  // Video background optimization
  const videoBg = document.querySelector('.video-background video');

  if (videoBg) {
    // Check if mobile or slow connection
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isSlowConnection = navigator.connection
      ? navigator.connection.effectiveType.includes('2g') ||
      navigator.connection.saveData
      : false;

    if (isMobile || isSlowConnection) {
      videoBg.remove();
      document.querySelector('.video-fallback').style.display = 'block';
    } else {
      // Lazy load video
      videoBg.setAttribute('preload', 'auto');
      videoBg.play().catch(e => {
        // Fallback if autoplay fails
        document.querySelector('.video-fallback').style.display = 'block';
      });
    }
  } 

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  // Custom cursor
  const cursor = document.querySelector('.cursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Cursor hover effects
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.hero-title .line, .hero-subtitle, .btn, .section-title, .about-text p, .skills-list li, .project-card');

    elements.forEach(el => {
      const elementPosition = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state
  document.querySelectorAll('.hero-title .line, .hero-subtitle, .btn, .section-title, .about-text p, .skills-list li, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Trigger on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});
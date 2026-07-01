document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE NAV MENU TOGGLE ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('active');
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Accessibility: Update aria-expanded attribute
      menuToggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close mobile nav when clicking a link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- STICKY NAV SCROLL EFFECT ---
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- PRODUCT CATEGORY FILTER (products.html) ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button class
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        // Show/hide product cards
        productCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
        
        // Trigger reveal check for newly visible items
        checkReveal();
      });
    });
  }

  // --- SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal');

  const checkReveal = () => {
    const triggerBottom = (window.innerHeight / 5) * 4.5; // Trigger early for premium fluid feel
    
    revealElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  // Initial trigger & scroll event binding
  if (revealElements.length > 0) {
    window.addEventListener('scroll', checkReveal);
    // Tiny delay to ensure layout rendering doesn't interfere
    setTimeout(checkReveal, 100);
  }
});

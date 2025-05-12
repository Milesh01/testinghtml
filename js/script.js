// Dynamically load header and footer
document.addEventListener("DOMContentLoaded", () => {
    fetch("components/hero.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("hero").innerHTML = data;
      });
  
      fetch("components/state-counter.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("state-counter").innerHTML = data;
      });

    fetch("components/footer.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("footer").innerHTML = data;
      });

      fetch("components/features.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("features").innerHTML = data;
      });

      fetch("pages/faq.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("faq").innerHTML = data;
      });
      
      fetch("pages/faq.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("faq").innerHTML = data;
      });

       fetch("pages/contact-us.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("contact-us").innerHTML = data;
      });

       fetch("pages/review.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("review").innerHTML = data;
      });
         fetch("components/mission.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("mission").innerHTML = data;
      });
  });
  
// ====Header=====
  document.addEventListener('DOMContentLoaded', function() {
      const header = document.querySelector('.header');
      const menuToggle = document.getElementById('menuToggle');
      const mobileMenu = document.getElementById('mobileMenu');
      const overlay = document.getElementById('overlay');
      let lastScrollY = window.scrollY;
      const threshold = 50; // When to start the effect
      let isFixed = false;
      let isSticky = false;

      // Toggle mobile menu
      menuToggle.addEventListener('click', function() {
          mobileMenu.classList.toggle('active');
          overlay.classList.toggle('active');
          document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
          
          // Change icon
          if (mobileMenu.classList.contains('active')) {
              menuToggle.innerHTML = '<i class="fas fa-times"></i>';
          } else {
              menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
          }
      });


      overlay.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = 'auto';
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });

      window.addEventListener('scroll', function() {
          const currentScrollY = window.scrollY;
          const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
          
          if (currentScrollY > threshold && !isFixed) {
              header.classList.add('fixed');
              isFixed = true;
          }
          else if (currentScrollY <= threshold && isFixed) {
              header.classList.remove('fixed', 'slide-down', 'sticky');
              isFixed = false;
              isSticky = false;
              return;
          }
          
          if (isFixed) {
              if (scrollDirection === 'down' && !isSticky) {
                  header.classList.add('slide-down');
              } 
              else if (scrollDirection === 'up' && header.classList.contains('slide-down')) {
                  header.classList.remove('slide-down');
              }
              
              if (currentScrollY < lastScrollY && currentScrollY > threshold + 80) {
                  header.classList.add('sticky');
                  isSticky = true;
              }
          }
          
          lastScrollY = currentScrollY;
      });
  });


  // Toggle switch functionality with price calculation
   document.addEventListener('DOMContentLoaded', function() {
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const planPrices = document.querySelectorAll('.plan-price');
    
    // Store original prices
    const originalPrices = [];
    document.querySelectorAll('.price-amount').forEach(price => {
        originalPrices.push(parseInt(price.textContent));
    });
    
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active state
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const isAnnual = this.getAttribute('data-period') === 'annually';
            
            // Update all prices
            document.querySelectorAll('.price-amount').forEach((price, index) => {
                const originalPrice = originalPrices[index];
                const displayPrice = isAnnual ? Math.round(originalPrice * 0.8) : originalPrice;
                price.textContent = displayPrice;
            });
            
            // Update all periods
            document.querySelectorAll('.price-period').forEach(period => {
                period.textContent = isAnnual ? '/year' : '/month';
            });
        });
    });
});



// ======Testimonials==========
document.addEventListener("DOMContentLoaded", function () {
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animated");
      }
    });
  };

  // Initialize animation on load
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
});


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

          fetch("components/chatbox.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("chatbox").innerHTML = data;
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
              menuToggle.innerHTML = '<i class="text-primary fas fa-times"></i>';
          } else {
              menuToggle.innerHTML = '<i class="text-danger fas fa-bars"></i>';
          }
      });
// ..
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

// ======Price Change==============
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



document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("testimonialTrack");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  const indicatorsContainer = document.getElementById("sliderIndicators");

  let currentIndex = 0;
  const slideCount = slides.length;
  let slideWidth = 0;
  let slidesToShow = window.innerWidth > 992 ? 2 : 1; // Show 2 on desktop, 1 on mobile
  let autoSlideInterval;

  // Create indicators based on visible slides
  function createIndicators() {
    indicatorsContainer.innerHTML = "";
    const indicatorCount = Math.ceil(slideCount / slidesToShow);

    for (let i = 0; i < indicatorCount; i++) {
      const indicator = document.createElement("div");
      indicator.classList.add("slider-indicator");
      if (i === Math.floor(currentIndex / slidesToShow)) {
        indicator.classList.add("active");
      }
      indicator.addEventListener("click", () => {
        goToSlide(i * slidesToShow);
      });
      indicatorsContainer.appendChild(indicator);
    }
  }

  function initSlider() {
    slidesToShow = window.innerWidth > 992 ? 2 : 1;

    slideWidth = track.clientWidth / slidesToShow;

    slides.forEach((slide) => {
      slide.style.minWidth = `${slideWidth}px`;
    });

    updateSliderPosition();
    createIndicators();
    startAutoSlide();
  }

  // Update slider position
  function updateSliderPosition() {
    const offset = -currentIndex * slideWidth;
    track.style.transform = `translateX(${offset}px)`;

    // Update active indicator
    const activeIndicatorIndex = Math.floor(currentIndex / slidesToShow);
    document
      .querySelectorAll(".slider-indicator")
      .forEach((indicator, index) => {
        indicator.classList.toggle("active", index === activeIndicatorIndex);
      });
  }

  // Go to specific slide
  function goToSlide(index) {
    // Ensure we don't go past the last slide
    if (index > slideCount - slidesToShow) {
      index = slideCount - slidesToShow;
    }
    if (index < 0) {
      index = 0;
    }

    currentIndex = index;
    updateSliderPosition();
    resetAutoSlide();
  }

  // Next slide
  function nextSlide() {
    if (currentIndex < slideCount - slidesToShow) {
      currentIndex += 1;
    } else {
      currentIndex = 0; // Loop back to start
    }
    updateSliderPosition();
    resetAutoSlide();
  }

  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex -= 1;
    } else {
      // If at start, go to last possible position
      currentIndex = slideCount - slidesToShow;
    }
    updateSliderPosition();
    resetAutoSlide();
  }

  // Auto slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Event listeners
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Pause on hover
  track.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
  track.addEventListener("mouseleave", startAutoSlide);

  // Handle window resize with debounce
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initSlider, 250);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Initialize
  initSlider();

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-in").forEach((element) => {
    observer.observe(element);
  });
});
    
// ========backToTopBtn
 const backToTopBtn = document.getElementById("backToTopBtn");

    window.onscroll = function () {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

// ========ChatBox========
  function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('show-chatbox');
  }
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.add('hidden');
}

// Lightbox functions
function openLightbox(imageSrc, imageAlt) {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImage');
    modal.classList.add('active');
    modalImg.src = imageSrc;
    modalImg.alt = imageAlt;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Portfolio filter functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    // Close mobile menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });

    // Add click event listeners to portfolio images
    const portfolioImages = document.querySelectorAll('.portfolio-item img');
    portfolioImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    // Close lightbox when clicking outside image
    const modal = document.getElementById('lightboxModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Image Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let autoplayInterval;

    // Preload adjacent images for smoother transitions
    function preloadAdjacentImages(index) {
        const nextIndex = (index + 1) % slides.length;
        const prevIndex = (index - 1 + slides.length) % slides.length;

        [nextIndex, prevIndex].forEach(i => {
            const img = slides[i].querySelector('img');
            if (img && !img.complete) {
                const preloadImg = new Image();
                preloadImg.src = img.src;
            }
        });
    }

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dots span');

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Preload adjacent images when changing slides
        preloadAdjacentImages(currentSlide);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto-play carousel every 4 seconds
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    // Start autoplay
    startAutoplay();

    // Preload first set of adjacent images on page load
    preloadAdjacentImages(0);

    // Smooth fixed hero section on scroll (Desktop only)
    const heroSection = document.getElementById('home');
    const carouselSection = document.querySelector('.carousel-container').parentElement.parentElement;
    const servicesSection = document.getElementById('services');
    const nav = document.querySelector('nav');

    let lastScrollY = 0;
    let ticking = false;
    let isFixed = false;
    let lastScrollForNav = 0;

    // Create placeholder to maintain layout
    const heroPlaceholder = document.createElement('div');
    heroPlaceholder.style.display = 'none';
    heroSection.parentNode.insertBefore(heroPlaceholder, heroSection);

    function smoothScroll() {
        const scrollY = window.scrollY;

        // Mobile header hide/show on scroll
        if (window.innerWidth <= 768) {
            const scrollThreshold = 10; // Minimum scroll distance to trigger

            if (Math.abs(scrollY - lastScrollForNav) > scrollThreshold) {
                if (scrollY > lastScrollForNav && scrollY > 80) {
                    // Scrolling down - hide navbar
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up - show navbar
                    nav.style.transform = 'translateY(0)';
                }
                lastScrollForNav = scrollY;
            }

            // Reset to normal flow on mobile
            heroPlaceholder.style.display = 'none';
            heroSection.style.position = 'static';
            heroSection.style.top = 'auto';
            heroSection.style.left = 'auto';
            heroSection.style.right = 'auto';
            heroSection.style.width = 'auto';
            heroSection.style.zIndex = 'auto';
            heroSection.style.transform = 'none';
            heroSection.classList.remove('hero-scrolled');
            isFixed = false;
            ticking = false;
            return;
        }

        // Reset navbar transform on desktop
        nav.style.transform = 'translateY(0)';
        lastScrollForNav = scrollY;

        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        const navHeight = nav.offsetHeight;
        const heroHeight = heroSection.offsetHeight;

        // Calculate the position where services section starts
        const servicesPosition = servicesSection.getBoundingClientRect().top + scrollY;

        // Hero stays fixed until services section reaches the viewport
        const fixedScrollZone = servicesPosition - heroHeight - navHeight;

        if (scrollY > 0 && scrollY < fixedScrollZone) {
            // Entering/staying in fixed zone
            if (!isFixed) {
                heroPlaceholder.style.height = heroHeight + 'px';
                heroPlaceholder.style.display = 'block';

                heroSection.style.position = 'fixed';
                heroSection.style.top = navHeight + 'px';
                heroSection.style.left = '0';
                heroSection.style.right = '0';
                heroSection.style.width = '100%';
                heroSection.style.zIndex = '40';
                heroSection.style.transform = 'translateY(0)';
                heroSection.classList.add('hero-scrolled');

                isFixed = true;
            }

        } else if (scrollY >= fixedScrollZone) {
            // Exiting fixed zone downward - transition smoothly
            if (isFixed) {
                heroPlaceholder.style.display = 'block';
                heroSection.style.position = 'absolute';
                heroSection.style.top = (fixedScrollZone + navHeight) + 'px';
                heroSection.style.transform = 'translateY(0)';
                heroSection.classList.remove('hero-scrolled');
                isFixed = false;
            } else {
                heroSection.style.position = 'absolute';
                heroSection.style.top = (fixedScrollZone + navHeight) + 'px';
            }

        } else {
            // At top - normal flow (scrolling up past nav)
            heroPlaceholder.style.display = 'none';

            heroSection.style.position = 'static';
            heroSection.style.top = 'auto';
            heroSection.style.left = 'auto';
            heroSection.style.right = 'auto';
            heroSection.style.width = 'auto';
            heroSection.style.zIndex = 'auto';
            heroSection.style.transform = 'none';
            heroSection.classList.remove('hero-scrolled');

            isFixed = false;
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    // Optimized scroll listener
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(smoothScroll);
            ticking = true;
        }
    }, { passive: true });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (!ticking) {
            requestAnimationFrame(smoothScroll);
            ticking = true;
        }
    });

    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Set default filter to photography on page load
    portfolioItems.forEach(item => {
        if (item.classList.contains('photography')) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-brand-red', 'text-white');
                btn.classList.add('text-custom-dark');
            });
            button.classList.add('bg-brand-red', 'text-white');
            button.classList.remove('text-custom-dark');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Lazy load iframes to prevent memory issues
document.addEventListener('DOMContentLoaded', function() {
    const lazyIframes = document.querySelectorAll('iframe.lazy-iframe');

    // Only load iframes when they become visible or when their filter is clicked
    const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    iframe.removeAttribute('data-src');
                    observer.unobserve(iframe);
                }
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before the iframe becomes visible
    });

    lazyIframes.forEach(iframe => {
        iframeObserver.observe(iframe);
    });

    // Also load iframes when their portfolio filter is clicked
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Small delay to allow filter animation to complete
            setTimeout(() => {
                const visibleItems = document.querySelectorAll(`.portfolio-item.${filter}, .portfolio-item`);
                visibleItems.forEach(item => {
                    if (item.style.display !== 'none') {
                        const iframe = item.querySelector('iframe.lazy-iframe[data-src]');
                        if (iframe) {
                            iframe.src = iframe.dataset.src;
                            iframe.removeAttribute('data-src');
                        }
                    }
                });
            }, 100);
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission using Web3Forms
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitButton.disabled = true;

    try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Success
            formStatus.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Thank you! Your message has been sent successfully. We\'ll get back to you soon!';
            formStatus.className = 'text-green-600 font-semibold text-center mt-4';
            form.reset();
        } else {
            // Error
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>Oops! Something went wrong. Please try again or call us at (405) 926-6844.';
            formStatus.className = 'text-red-600 font-semibold text-center mt-4';
        }
    } catch (error) {
        // Network error
        formStatus.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Network error. Please check your connection or call us at (405) 926-6844.';
        formStatus.className = 'text-red-600 font-semibold text-center mt-4';
    }

    // Reset button
    submitButton.innerHTML = originalButtonText;
    submitButton.disabled = false;
});
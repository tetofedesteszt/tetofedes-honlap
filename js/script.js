// TetőProfil - Tetőfedő Honlap JavaScript
// Dátum: 2025.03.25

document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Portfolio Filters
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                portfolioFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Animate on Scroll
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-fade-in-down, .animate-fade-in-left, .animate-fade-in-right');
    
    if (animatedElements.length > 0) {
        const animateElements = () => {
            animatedElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 50) {
                    element.style.visibility = 'visible';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Initial check
        animateElements();
        
        // Check on scroll
        window.addEventListener('scroll', animateElements);
    }
    
    // Mobile Menu Toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target) && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
    
    // Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });
    }
    
    // Testimonial Carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    
    if (testimonialCarousel) {
        let currentSlide = 0;
        const slides = testimonialCarousel.querySelectorAll('.testimonial-card');
        const totalSlides = slides.length;
        const nextButton = testimonialCarousel.querySelector('.carousel-next');
        const prevButton = testimonialCarousel.querySelector('.carousel-prev');
        
        // Show first slide
        slides[0].classList.add('active');
        
        // Next slide
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % totalSlides;
                slides[currentSlide].classList.add('active');
            });
        }
        
        // Previous slide
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                slides[currentSlide].classList.add('active');
            });
        }
        
        // Auto slide
        setInterval(function() {
            if (nextButton) {
                nextButton.click();
            }
        }, 5000);
    }
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                
                form.classList.add('was-validated');
            });
        });
    }
    
    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length > 0) {
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Image Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${imgSrc}" alt="Lightbox Image">
                        <span class="lightbox-close">&times;</span>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox on click
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                });
            });
        });
    }
    
    // Sticky Header
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Tabs
    const tabLinks = document.querySelectorAll('.nav-tabs .nav-link');
    
    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs
                tabLinks.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab content
                const tabContents = document.querySelectorAll('.tab-pane');
                tabContents.forEach(content => content.classList.remove('show', 'active'));
                
                // Show clicked tab content
                const targetId = this.getAttribute('href');
                const targetContent = document.querySelector(targetId);
                if (targetContent) {
                    targetContent.classList.add('show', 'active');
                }
            });
        });
    }
    
    // Add animation classes to elements
    const addAnimationClasses = () => {
        // Hero section elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        
        if (heroTitle) heroTitle.classList.add('animate-fade-in-down');
        if (heroSubtitle) heroSubtitle.classList.add('animate-fade-in-up');
        if (heroButtons) heroButtons.classList.add('animate-fade-in');
        
        // Section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.classList.add('animate-fade-in-up');
        });
        
        // Service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('animate-fade-in-up');
        });
        
        // Portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-fade-in-up');
        });
        
        // Testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('animate-fade-in-up');
        });
        
        // Team cards
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('animate-fade-in-up');
        });
        
        // Blog posts
        const blogPosts = document.querySelectorAll('.blog-post');
        blogPosts.forEach((post, index) => {
            post.style.animationDelay = `${index * 0.2}s`;
            post.classList.add('animate-fade-in-up');
        });
    };
    
    // Call animation classes function
    addAnimationClasses();
    
    // Initialize any custom components
    initializeCustomComponents();
});

// Initialize custom components
function initializeCustomComponents() {
    // Price calculator for pricing page
    const calculatePriceBtn = document.getElementById('calculatePrice');
    
    if (calculatePriceBtn) {
        calculatePriceBtn.addEventListener('click', function() {
            const area = document.getElementById('roofArea').value;
            const material = document.getElementById('roofMaterial').value;
            const resultDiv = document.getElementById('calculationResult');
            const priceElement = document.getElementById('estimatedPrice');
            
            if (!area || !material) {
                alert('Kérjük, adja meg a tető alapterületét és válasszon tetőfedő anyagot!');
                return;
            }
            
            let pricePerSqm = 0;
            switch(material) {
                case 'ceramic':
                    pricePerSqm = 20000;
                    break;
                case 'concrete':
                    pricePerSqm = 16500;
                    break;
                case 'metal':
                    pricePerSqm = 18000;
                    break;
                case 'bitumen':
                    pricePerSqm = 16000;
                    break;
                default:
                    pricePerSqm = 0;
            }
            
            const totalPrice = area * pricePerSqm;
            const formattedPrice = new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(totalPrice);
            
            priceElement.textContent = `${formattedPrice} (${area} m² × ${pricePerSqm.toLocaleString('hu-HU')} Ft/m²)`;
            resultDiv.style.display = 'block';
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const formResponse = document.getElementById('formResponse');
            formResponse.innerHTML = '<div class="alert alert-success">Köszönjük üzenetét! Hamarosan felvesszük Önnel a kapcsolatot.</div>';
            
            // Reset form
            this.reset();
            
            // Scroll to response
            formResponse.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.subscribe-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email input
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('alert', 'alert-success', 'mt-3');
                successMessage.textContent = 'Köszönjük a feliratkozást! Sikeresen feliratkozott hírlevelünkre.';
                
                // Replace form with success message
                this.parentNode.replaceChild(successMessage, this);
            }
        });
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .team-card, .blog-post, .pricing-card');
    
    cards.forEach(card => {
        card.classList.add('hover-shadow', 'hover-translate-y');
    });
    
    // Add lightbox to gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.classList.add('hover-scale');
    });
}

// Add custom CSS styles for lightbox
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        display: block;
        border: 5px solid white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
`;

document.head.appendChild(lightboxStyles);

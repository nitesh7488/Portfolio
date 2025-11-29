// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPortfolio();
});

function initPortfolio() {
    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const scrollUpBtn = document.querySelector('.scroll-up-btn');
    
    // Sticky Navbar on Scroll
    window.addEventListener('scroll', function() {
        if (this.scrollY > 20) {
            navbar.classList.add("sticky");
            scrollUpBtn.classList.add("show");
        } else {
            navbar.classList.remove("sticky");
            scrollUpBtn.classList.remove("show");
        }
        
        // Timeline Animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            if (item.getBoundingClientRect().top < window.innerHeight - 100) {
                item.classList.add('visible');
            }
        });
        
        // Animate skill bars when in view
        const skillsSection = document.getElementById('skills');
        if (skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
            animateSkillBars();
        }
    });

    // Slide-up Script
    scrollUpBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Toggle Menu/Navbar
    menuBtn.addEventListener('click', function() {
        navMenu.classList.toggle("active");
        menuBtn.querySelector('i').classList.toggle("active");
    });

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove("active");
            menuBtn.querySelector('i').classList.remove("active");
        });
    });

    // Typing Animation
    if (document.querySelector('.typing')) {
        const typed = new Typed(".typing", {
            strings: ["Full Stack Developer", "Web Designer", "Software Engineer", "Problem Solver"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    if (document.querySelector('.typing-2')) {
        const typed2 = new Typed(".typing-2", {
            strings: ["Full Stack Developer", "Web Designer", "Software Engineer", "Problem Solver"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Construct email body
            const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0ASubject: ${subject}%0D%0AMessage: ${message}`;
            
            // Send email using mailto
            const mailtoLink = `mailto:mandalnitesh654@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Initialize Owl Carousel
    if (jQuery('.owl-carousel').length) {
        jQuery('.owl-carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            autoplaySpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
        
        // Remove event listener after animation
        window.removeEventListener('scroll', checkSkills);
    }

    // Check if skills section is in view
    function checkSkills() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        
        const skillsTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillsTop < windowHeight - 100) {
            animateSkillBars();
        }
    }

    // Initial check for skills animation
    window.addEventListener('scroll', checkSkills);
    
    // Trigger skills animation if already in view on load
    setTimeout(checkSkills, 1000);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.service-card, .project-card, .stat, .skill-category').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card,
        .project-card,
        .stat,
        .skill-category {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        body.loaded .service-card,
        body.loaded .project-card,
        body.loaded .stat,
        body.loaded .skill-category {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Service Worker Registration (optional - for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}
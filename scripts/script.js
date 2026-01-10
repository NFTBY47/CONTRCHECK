document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburgerInput = document.getElementById('hamburger-input');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerInput && mobileMenu) {
        hamburgerInput.addEventListener('change', () => {
            if (hamburgerInput.checked) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-menu-link, .mobile-menu-button');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerInput.checked = false;
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                hamburgerInput.checked = false;
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (hamburgerInput && hamburgerInput.checked) {
                        hamburgerInput.checked = false;
                        if (mobileMenu) mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                        
                        // Wait for menu to close before scrolling
                        setTimeout(() => {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 300);
                    } else {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.card, .audience-card, .business-card, .process-step');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // Handle animation
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach(el => animationObserver.observe(el));
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
    });
    
    // Set current year in footer (optional)
    const yearElement = document.querySelector('footer .footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
    
    // Add skip to content link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Перейти к основному содержимому';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.background = '#4dabf7';
    skipLink.style.color = '#000';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '1001';
    skipLink.style.textDecoration = 'none';
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Set main content id
    const mainElement = document.querySelector('main');
    if (mainElement && !mainElement.id) {
        mainElement.id = 'main';
        mainElement.tabIndex = -1;
    }
});

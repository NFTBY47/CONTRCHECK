document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    let isMenuOpen = false;
    let isAnimating = false;
    
    // Функция открытия меню
    function openMenu() {
        if (isAnimating || isMenuOpen) return;
        
        isAnimating = true;
        isMenuOpen = true;
        
        // Добавляем классы
        mobileMenu.classList.add('active');
        hamburgerButton.classList.add('active');
        
        // Блокируем скролл страницы
        document.body.classList.add('no-scroll');
        
        // Обновляем ARIA атрибуты
        hamburgerButton.setAttribute('aria-expanded', 'true');
        
        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }
    
    // Функция закрытия меню
    function closeMenu() {
        if (isAnimating || !isMenuOpen) return;
        
        isAnimating = true;
        
        // Убираем классы
        mobileMenu.classList.remove('active');
        hamburgerButton.classList.remove('active');
        
        // Обновляем ARIA атрибуты
        hamburgerButton.setAttribute('aria-expanded', 'false');
        
        setTimeout(() => {
            // Возвращаем скролл
            document.body.classList.remove('no-scroll');
            isMenuOpen = false;
            isAnimating = false;
        }, 300);
    }
    
    // Open menu
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', () => {
            if (!isMenuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });
    }
    
    // Close menu with X button
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            closeMenu();
        });
    }
    
    // Close menu when clicking on overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => {
            closeMenu();
        });
    }
    
    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu-link, .mobile-menu-button');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                closeMenu();
                
                // Ждем закрытия меню перед скроллом
                setTimeout(() => {
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 300);
            } else {
                closeMenu();
            }
        });
    });
    
    // Smooth scroll for anchor links (desktop navigation)
    document.querySelectorAll('.desktop-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Закрытие меню при изменении размера окна (на десктоп)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                closeMenu();
            }
        }, 250);
    });
    
    // Floating testimonials animation
    function initTestimonialsAnimation() {
        const columns = document.querySelectorAll('.testimonials-column-content');
        
        columns.forEach(column => {
            const speed = column.getAttribute('data-speed') || 15;
            const contentHeight = column.scrollHeight / 2;
            const containerHeight = column.parentElement.offsetHeight;
            
            // Adjust animation duration based on content height
            const duration = (contentHeight / containerHeight) * speed;
            
            column.style.animationDuration = `${duration}s`;
            
            // Pause animation on hover
            column.addEventListener('mouseenter', () => {
                column.style.animationPlayState = 'paused';
            });
            
            column.addEventListener('mouseleave', () => {
                column.style.animationPlayState = 'running';
            });
        });
    }
    
    // Initialize testimonials animation
    initTestimonialsAnimation();
    
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
    const elementsToAnimate = document.querySelectorAll('.card, .audience-card, .business-card, .process-step, .testimonial-card');
    
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
    
    // Set current year in footer
    const yearElement = document.querySelector('footer .footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
    
    // Улучшенная анимация для кнопок при клике
    const allButtons = document.querySelectorAll('.brutalist-button:not(.hamburger):not(.mobile-menu-close), .btn');
    
    allButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
            this.style.boxShadow = '0 2px 0 var(--black)';
        });
        
        button.addEventListener('mouseup', function() {
            if (this.matches(':hover')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = 'var(--shadow)';
            } else {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});

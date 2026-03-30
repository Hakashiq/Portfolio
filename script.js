/* ============================================
   HAK ASHIQ M — PIXEL/ARCADE PORTFOLIO
   JavaScript — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Typewriter Effect for Hero Role ----
    const roleElement = document.getElementById('hero-role');
    const roles = [
        'FULL STACK DEVELOPER',
        'JAVA DEVELOPER',
        'BACKEND ARCHITECT',
        'PROBLEM SOLVER',
        'CODE WARRIOR'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeRole, typeSpeed);
    }
    typeRole();

    // ---- Navigation Scroll Effect ----
    const nav = document.getElementById('main-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile nav toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // ---- Active Nav Highlight ----
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = navLinks.querySelectorAll('a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navAnchors.forEach(a => a.classList.remove('active'));
                const activeLink = navLinks.querySelector(`a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ---- Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll(
        '.dialog-box, .info-card, .skill-category, .project-card, ' +
        '.timeline-item, .publication-card, .badge-card, .contact-card, .social-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Skill Bar Animation ----
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ---- Staggered reveal for grids ----
    const gridContainers = document.querySelectorAll(
        '.about-info-cards, .skills-grid, .projects-grid, .badges-grid, .social-grid'
    );

    gridContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.15}s`;
        });
    });

    // ---- Hide "Insert Coin" text after scroll ----
    const insertCoin = document.querySelector('.hero-insert-coin');
    let coinHidden = false;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && !coinHidden) {
            insertCoin.style.opacity = '0';
            coinHidden = true;
        } else if (window.scrollY <= 100 && coinHidden) {
            insertCoin.style.opacity = '1';
            coinHidden = false;
        }
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = nav.offsetHeight + 10;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Parallax effect for stars ----
    const stars = document.querySelectorAll('.pixel-star');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        stars.forEach((star, i) => {
            const speed = 0.05 + (i * 0.02);
            star.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ---- Console Easter Egg ----
    console.log('%c🕹️ HAK ASHIQ M — PORTFOLIO', 
        'font-family: "Press Start 2P", monospace; font-size: 16px; color: #ff006e; background: #f5edd6; padding: 10px 20px;');
    console.log('%cPlayer 1 has entered the game!', 
        'font-family: "VT323", monospace; font-size: 14px; color: #06d6a0;');
    console.log('%cBuilt with ❤️ and lots of ☕', 
        'font-family: "VT323", monospace; font-size: 12px; color: #8a8a7a;');

});

/* ==========================================
   INTERACTIVE SCRIPTS
   Project: Hak Ashiq M - Scout Portfolio
   ========================================== */

// --- Skill Data Dictionary ---
const skillDatabase = {
    react: {
        name: "React.js",
        rating: 90,
        position: "Forward (Frontend Playmaker)",
        notes: "Key playmaker in client-side architectures. Highly adept at building reactive, modular frontends, managing component states, and integrating RESTful APIs and interactive dashboards.",
        plays: [
            "Component Lifecycle, Hooks & Virtual DOM",
            "Single Page Application (SPA) Routing",
            "Stateless REST API Integration & Data Fetching"
        ]
    },
    llm: {
        name: "FastAPI & LLM APIs",
        rating: 89,
        position: "Forward (AI Integration)",
        notes: "Striking capacity in generative AI systems. Expert in parsing resumes, constructing intelligent question-generation prompts, and orchestrating response evaluations via LLM API integration with FastAPI microservices.",
        plays: [
            "LLM API Integration & Prompt Engineering",
            "FastAPI Microservice Architecture",
            "Adaptive Questioning & Automated Evaluation"
        ]
    },
    css: {
        name: "REST APIs & JWT Auth",
        rating: 91,
        position: "Forward (API Gateway & Security)",
        notes: "Front-line gateway connecting frontend clients with backend microservices. Specializes in RESTful API design, stateless JWT authentication, and secure endpoint communication with role-based access control.",
        plays: [
            "RESTful API Architecture & Endpoints",
            "Stateless JWT-based Authentication",
            "Conflict Detection & Business Rule Validation"
        ]
    },
    springboot: {
        name: "Spring Boot & Security",
        rating: 93,
        position: "Midfield (Core Engine)",
        notes: "The central playmaker structuring backend architectures. Exceptional at developing enterprise-grade REST APIs, layered controller-service-repository patterns, and managing ORM persistence with Spring Data JPA and Hibernate.",
        plays: [
            "Spring Boot RESTful Architectures & DTOs",
            "Spring Security & JWT Authentication",
            "Spring Data JPA & Hibernate Relational Mapping"
        ]
    },
    java: {
        name: "Java (JUnit & Mockito)",
        rating: 92,
        position: "Midfield (Core Language)",
        notes: "Sturdy foundation with elite command over compiler execution, OOP principles, and multithreading. Rigorously verified with automated JUnit and Mockito test suites ensuring high code quality.",
        plays: [
            "Object-Oriented Programming (OOP) & Clean Code",
            "Automated Unit Testing with JUnit & Mockito",
            "Layered Architecture & Centralized Exception Handling"
        ]
    },
    sql: {
        name: "SQL & Relational DBs",
        rating: 90,
        position: "Midfield (Database Architecture)",
        notes: "Master of database schemas, relational integrity, and high-performance querying. Adept at query tuning, normalization, complex joins, and transaction consistency.",
        plays: [
            "Relational Schema Design & Normalization",
            "Complex Joins & Aggregation Queries",
            "Transaction Isolation & ACID Compliance"
        ]
    },
    oop: {
        name: "DSA & DBMS",
        rating: 92,
        position: "Midfield (Logic & Algorithms)",
        notes: "Elite algorithmic command with 250+ LeetCode problems solved across Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and Greedy algorithms. Grounded in solid DBMS and Object-Oriented principles.",
        plays: [
            "250+ LeetCode Solved (Trees, Graphs, DP, Greedy)",
            "Time & Space Complexity Optimization (Big-O)",
            "Database Management Systems (DBMS) Modeling"
        ]
    },
    mysql: {
        name: "MySQL & Relational Modeling",
        rating: 90,
        position: "Defense (Relational DB)",
        notes: "Solid center-back defending database integrity. Expert at structural relational modeling, foreign key constraints, table indexing for fast filtering, and enforcing ACID consistency.",
        plays: [
            "Relational Database Modeling & Normal Forms",
            "Database Indexing for High-Speed Filtering",
            "Referential Integrity & Transaction Boundaries"
        ]
    },
    redis: {
        name: "Redis Caching",
        rating: 89,
        position: "Defense (Caching & Speed)",
        notes: "Defensive midfielder neutralizing database query bottlenecks. Deploys high-speed in-memory caching to reduce repeated database queries, cache API responses, and minimize latency.",
        plays: [
            "High-Speed In-Memory Caching Strategies",
            "Query Latency Reduction & Cache Expiry",
            "Session Store & High-Availability In-Memory Data"
        ]
    },
    git: {
        name: "Git, GitHub & Maven",
        rating: 92,
        position: "Goalkeeper (Tools & Build)",
        notes: "The dependable guardian safeguarding code stability and build automation. Proficient in Git workflows, branching strategies, collaborative GitHub pull requests, and Maven lifecycle management.",
        plays: [
            "Git Branching, Rebasing & Conflict Resolution",
            "Maven Build Automation & Dependency Management",
            "GitHub Collaborative Code Management & Review"
        ]
    }
};

// --- DOM elements ---
const header = document.querySelector('.main-header');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const playerNodes = document.querySelectorAll('.player-node');
const scoutNotesContent = document.getElementById('scout-notes-content');
const filterBtns = document.querySelectorAll('.filter-btn');
const matchCards = document.querySelectorAll('.match-card');
const contactForm = document.getElementById('scout-contact-form');
const feedTicker = document.getElementById('feed-ticker-container');
const soundToggle = document.getElementById('sound-toggle');
const whistleTrigger = document.getElementById('whistle-trigger');

const whistleSound = document.getElementById('whistle-sound');
const crowdSound = document.getElementById('crowd-sound');

let isCrowdSoundPlaying = false;

// --- Header Scroll Effect & Turf Progress ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Turf Scroll Progress Calculation
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    const scrollTurf = document.getElementById('scroll-turf');
    const scrollBall = document.getElementById('scroll-ball');
    if (scrollTurf && scrollBall) {
        scrollTurf.style.width = `${scrollPercent}%`;
        scrollBall.style.left = `${scrollPercent}%`;
        // Rotate 3.6 degrees for every 1% scrolled
        scrollBall.style.transform = `translate(-50%, -50%) rotate(${scrollPercent * 10.8}deg)`;
    }
    
    // Highlight Active Link on Scroll
    const scrollPos = window.scrollY + 200;
    document.querySelectorAll('.section').forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            const currentId = section.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// --- Mobile Navigation Toggle ---
mobileNavToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = mobileNavToggle.querySelector('i');
    if (navLinks.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileNavToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
});

// --- Interactive Pitch Skill Swapping ---
playerNodes.forEach(node => {
    const triggerAction = () => {
        // Toggle active state
        playerNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        
        const skillKey = node.getAttribute('data-skill');
        const skill = skillDatabase[skillKey];
        
        if (skill) {
            // Update the notes panel with fade transition
            scoutNotesContent.style.opacity = 0;
            setTimeout(() => {
                let playsHtml = '';
                skill.plays.forEach(play => {
                    playsHtml += `<li><i class="fa-solid fa-check"></i> ${play}</li>`;
                });
                
                scoutNotesContent.innerHTML = `
                    <div class="skill-scout-view">
                        <div class="skill-title-row">
                            <h4 class="skill-name">${skill.name}</h4>
                            <span class="skill-rating-badge">OVR ${skill.rating}</span>
                        </div>
                        <span class="skill-position-badge">${skill.position}</span>
                        
                        <div class="rating-bar-container">
                            <div class="rating-bar-fill" style="width: ${skill.rating}%;"></div>
                        </div>

                        <p class="skill-notes">
                            ${skill.notes}
                        </p>
                        
                        <ul class="skill-tactical-plays">
                            ${playsHtml}
                        </ul>
                    </div>
                `;
                scoutNotesContent.style.opacity = 1;
            }, 150);
        }
    };

    node.addEventListener('click', triggerAction);
    node.addEventListener('mouseenter', triggerAction);
});

// --- Campaign Filters ---
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterVal = btn.getAttribute('data-filter');
        
        matchCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filterVal === 'all' || categories.includes(filterVal)) {
                card.style.display = 'flex';
                card.style.animation = 'slideIn 0.4s ease-out forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- Audio Controls ---
whistleTrigger.addEventListener('click', () => {
    // Play whistle sound
    whistleSound.currentTime = 0;
    whistleSound.play().catch(e => console.log("Audio play blocked by browser. Interaction required first."));
    
    // Add visual splash class
    whistleTrigger.classList.add('active');
    setTimeout(() => whistleTrigger.classList.remove('active'), 300);
});

soundToggle.addEventListener('click', () => {
    const icon = soundToggle.querySelector('i');
    if (!isCrowdSoundPlaying) {
        crowdSound.play()
            .then(() => {
                isCrowdSoundPlaying = true;
                icon.classList.remove('fa-volume-xmark');
                icon.classList.add('fa-volume-high');
                soundToggle.setAttribute('title', 'Mute Stadium Sound');
                addTickerItem("System", "Stadium atmosphere volume toggled to: HIGH. Feel the crowd!");
            })
            .catch(e => {
                console.log("Audio play blocked: " + e);
                // Fallback for local files or browser policy
                alert("Please click anywhere on the page first, then enable sound!");
            });
    } else {
        crowdSound.pause();
        isCrowdSoundPlaying = false;
        icon.classList.remove('fa-volume-high');
        icon.classList.add('fa-volume-xmark');
        soundToggle.setAttribute('title', 'Play Stadium Sound');
        addTickerItem("System", "Locker room atmosphere toggled to: MUTE.");
    }
});

// --- Ticker Feeds ---
const tickerNewsList = [
    { sender: "Fabrizio Romano", msg: "Hak Ashiq M continues to attract serious interest after checking in 250+ LeetCode problems solved. Staggering algorithmic numbers." },
    { sender: "Sky Sports Tech", msg: "Analyzing tactical shapes: Spring Boot, Spring Security, and React are forming a formidable full-stack offensive pivot." },
    { sender: "Marca", msg: "Scout reports confirm: Hak Ashiq M's workrate has been registered as High/High." },
    { sender: "L'Equipe", msg: "Tactical breakdown: New Bidding Service engine demonstrates pristine sealed-tender privacy and unit test rigor." },
    { sender: "The Athletic", msg: "Locker room sources say: Winning the Kho Kho Inter-Zonal tournament has built supreme stamina and leadership traits." }
];

function addTickerItem(sender, message) {
    const date = new Date();
    const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    
    const tickerItem = document.createElement('div');
    tickerItem.className = 'ticker-item new-update';
    tickerItem.innerHTML = `
        <span class="ticker-time">${timeStr}</span>
        <p><strong>${sender}:</strong> ${message}</p>
    `;
    
    feedTicker.insertBefore(tickerItem, feedTicker.firstChild);
    
    // Auto trim old reports (keep max 10)
    if (feedTicker.children.length > 10) {
        feedTicker.removeChild(feedTicker.lastChild);
    }
}

// Tick periodically
let tickerIndex = 0;
setInterval(() => {
    const item = tickerNewsList[tickerIndex];
    addTickerItem(item.sender, item.msg);
    tickerIndex = (tickerIndex + 1) % tickerNewsList.length;
}, 8000);

// --- Contact Form Submission ---
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const nameVal = document.getElementById('scout-name').value;
    const orgVal = document.getElementById('scout-org').value;
    const emailVal = document.getElementById('scout-email').value;
    const msgVal = document.getElementById('scout-msg').value;
    
    // Play whistle kickoff sound
    whistleSound.currentTime = 0;
    whistleSound.play().catch(err => console.log(err));
    
    // Add temporary loading indicator to the submit button
    const submitBtn = form.querySelector('.btn-submit-press');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Broadcasting to Manager...`;

    // Send Form Data to FormSubmit.co via AJAX (keeps page state)
    fetch("https://formsubmit.co/ajax/thakashiq@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "Reporter Name": nameVal,
            "Agency/Club": orgVal,
            "Contact Email": emailVal,
            "Press Inquiry/Message": msgVal
        })
    })
    .then(response => response.json())
    .then(data => {
        // Paparazzi camera flash across the press room
        const cameraFlash = document.getElementById('camera-flash');
        if (cameraFlash) {
            cameraFlash.classList.add('flash-burst');
            setTimeout(() => cameraFlash.classList.remove('flash-burst'), 600);
        }

        // Celebrate successful transfer negotiation with confetti
        if (typeof window.triggerCelebrationConfetti === 'function') {
            window.triggerCelebrationConfetti(window.innerWidth / 2, window.innerHeight / 2, ['#2E5A36', '#D4AF37', '#1E3E26', '#E6C665'], 60);
        }

        // Append entry to live press ticker feed
        addTickerItem("TRANSFER TALKS OPEN", `Scout **${nameVal}** representing **${orgVal}** has officially opened transfer talks! Proposal: "${msgVal.substring(0, 50)}..."`);
        
        // Show Success Feedback UI inside the form with requested copy
        const formContainer = document.querySelector('.press-form-container');
        formContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--color-green); animation: slideIn 0.4s ease-out;">
                <i class="fa-solid fa-handshake" style="font-size: 4.5rem; margin-bottom: 20px; color: var(--color-gold);"></i>
                <h3 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--font-heading);">Message received — transfer talks open!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">Your proposal has been dispatched directly to Hak Ashiq M's agent (thakashiq@gmail.com). Match scouting sheet dispatched.</p>
                <button id="reset-form-btn" class="btn btn-primary" style="margin: 0 auto; display: inline-flex;"><i class="fa-solid fa-arrow-rotate-left"></i> Submit Another Inquiry</button>
            </div>
        `;
        
        document.getElementById('reset-form-btn').addEventListener('click', () => {
            if (formContainer && originalFormHTML) {
                formContainer.innerHTML = originalFormHTML;
                const newForm = document.getElementById('scout-contact-form');
                if (newForm) {
                    newForm.addEventListener('submit', handleFormSubmit);
                }
                if (typeof initMagneticButtons === 'function') {
                    initMagneticButtons();
                }
            }
        });
    })
    .catch(err => {
        console.error(err);
        addTickerItem("System", "Error broadcasting press query. Please check connection.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        alert("Failed to submit form to email. Please try again.");
    });
}

// Initial form cache for safe in-place reset (prevents file:// frame reload error)
const pressFormContainer = document.querySelector('.press-form-container');
const originalFormHTML = pressFormContainer ? pressFormContainer.innerHTML : '';

// Bind the submission listener to the form
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// Download scouting report brochure
const brochureBtn = document.getElementById('download-scout-pdf');
if (brochureBtn) {
    brochureBtn.addEventListener('click', (e) => {
        addTickerItem("System", "Scouting Brochure (Resume PDF) downloaded by recruiter.");
    });
}

// --- Scroll Reveal Intersection Observers ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Observer for standard cards (match cards, trophies, transfers)
    const revealElements = document.querySelectorAll('.reveal-card, .slide-tackle-left, .slide-tackle-right, .trophy-drop');
    
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once it's revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => cardObserver.observe(el));
    
    // 2. Observer for the Tactical Pitch (jersey lineup reveal)
    const pitch = document.querySelector('.pitch');
    if (pitch) {
        const pitchObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Blow kickoff whistle when the field enters view!
                    const whistleSound = document.getElementById('whistle-sound');
                    if (whistleSound && !pitch.classList.contains('active')) {
                        whistleSound.volume = 0.3;
                        whistleSound.currentTime = 0;
                        whistleSound.play().catch(e => console.log("Kickoff autoplay whistle blocked: " + e));
                        addTickerItem("System", "KICKOFF! Tactical line-up deploying on the pitch.");
                    }
                    
                    pitch.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        pitchObserver.observe(pitch);
    }
});

/* ==========================================================================
   PHASE 1: LIVING FUT CARD, STADIUM LOADER & ATMOSPHERE MODULES
   ========================================================================== */

// --- Module 1: Stadium Tunnel Walk-Out Intro / Loader ---
function initStadiumLoader() {
    try {
        const intro = document.getElementById('stadium-intro');
        if (!intro) return;

        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const alreadySeen = sessionStorage.getItem('kickoffSeen');

        if (isReducedMotion || alreadySeen === 'true') {
            intro.classList.add('intro-hidden');
            setTimeout(() => intro.remove(), 600);
            return;
        }

        let isDismissed = false;
        const dismissLoader = () => {
            if (isDismissed) return;
            isDismissed = true;
            intro.classList.add('intro-hidden');
            sessionStorage.setItem('kickoffSeen', 'true');
            setTimeout(() => intro.remove(), 600);
        };

        const skipBtn = document.getElementById('intro-skip-btn');
        if (skipBtn) skipBtn.addEventListener('click', dismissLoader);
        intro.addEventListener('click', dismissLoader);
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') dismissLoader();
        });

        // Auto dismiss after 1.8s
        setTimeout(dismissLoader, 1800);
    } catch (err) {
        console.warn('initStadiumLoader error:', err);
    }
}

// --- Module 2: Living FUT Card 3D Tilt & Holographic Foil ---
function initHeroTilt() {
    try {
        const wrapper = document.getElementById('fut-card-wrapper');
        const card = document.getElementById('fut-card');
        if (!wrapper || !card) return;

        // Skip mouse-tracking on touch-only devices, let gentle idle float take over
        const isTouch = window.matchMedia('(hover: none)').matches;
        if (isTouch) return;

        let rafId = null;
        let targetRotateX = 0;
        let targetRotateY = 0;
        let foilX = 50;
        let foilY = 50;

        const onMouseMove = (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Clamped max tilt ±12deg
            targetRotateX = Math.max(-12, Math.min(12, ((y - centerY) / centerY) * -12));
            targetRotateY = Math.max(-12, Math.min(12, ((x - centerX) / centerX) * 12));

            foilX = Math.round((x / rect.width) * 100);
            foilY = Math.round((y / rect.height) * 100);

            if (!rafId) {
                rafId = requestAnimationFrame(updateCardTransform);
            }
        };

        const updateCardTransform = () => {
            card.classList.remove('animate-float');
            card.style.transform = `perspective(1000px) rotateX(${targetRotateX.toFixed(2)}deg) rotateY(${targetRotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.setProperty('--foil-x', `${foilX}%`);
            card.style.setProperty('--foil-y', `${foilY}%`);
            card.style.setProperty('--foil-opacity', '0.7');
            rafId = null;
        };

        const onMouseLeave = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.setProperty('--foil-opacity', '0');
            setTimeout(() => {
                card.classList.add('animate-float');
            }, 300);
        };

        wrapper.addEventListener('mousemove', onMouseMove, { passive: true });
        wrapper.addEventListener('mouseleave', onMouseLeave, { passive: true });
    } catch (err) {
        console.warn('initHeroTilt error:', err);
    }
}

// --- Module 3: Ambient Golden Particles Behind FUT Card ---
function initHeroParticles() {
    try {
        const canvas = document.getElementById('hero-particles');
        if (!canvas) return;

        // Skip on mobile or prefers-reduced-motion
        if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            canvas.style.display = 'none';
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 480;
        canvas.height = 600;

        const particles = [];
        const count = 35;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.8,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -(Math.random() * 0.6 + 0.3),
                alpha: Math.random() * 0.6 + 0.2,
                color: Math.random() > 0.4 ? 'rgba(201, 148, 85,' : 'rgba(46, 90, 54,'
            });
        }

        let isRunning = true;
        let animFrameId = null;

        const render = () => {
            if (!isRunning) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color}${p.alpha})`;
                ctx.fill();
            });

            animFrameId = requestAnimationFrame(render);
        };

        // Pause canvas loop when hero section is not in viewport
        const heroSection = document.getElementById('overview');
        if (heroSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!isRunning) {
                            isRunning = true;
                            render();
                        }
                    } else {
                        isRunning = false;
                        if (animFrameId) cancelAnimationFrame(animFrameId);
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(heroSection);
        } else {
            render();
        }
    } catch (err) {
        console.warn('initHeroParticles error:', err);
    }
}

// --- Module 4: Stat Numbers Count-Up Animation ---
function initStatsCountUp() {
    try {
        const statElements = document.querySelectorAll('.stat-val[data-target]');
        if (!statElements.length) return;

        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) {
            statElements.forEach(el => {
                el.textContent = el.getAttribute('data-target');
            });
            return;
        }

        let hasRun = false;
        const runCountUp = () => {
            if (hasRun) return;
            hasRun = true;

            const duration = 1200; // 1.2s
            const startTime = performance.now();

            const update = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out expo
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                statElements.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'), 10) || 90;
                    const current = Math.floor(easeProgress * target);
                    el.textContent = current;
                });

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    statElements.forEach(el => {
                        el.textContent = el.getAttribute('data-target');
                    });
                }
            };

            requestAnimationFrame(update);
        };

        const hero = document.getElementById('overview');
        if (hero) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        runCountUp();
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(hero);
        } else {
            runCountUp();
        }
    } catch (err) {
        console.warn('initStatsCountUp error:', err);
    }
}

// --- Module 5: Radar Chart Switcher & Polygon Animation ---
function initRadarChart() {
    try {
        const toggleBtn = document.getElementById('radar-toggle-btn');
        const statsView = document.getElementById('player-stats-view');
        const radarView = document.getElementById('player-radar-view');
        if (!toggleBtn || !statsView || !radarView) return;

        let showingRadar = false;

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showingRadar = !showingRadar;

            if (showingRadar) {
                statsView.classList.add('view-hidden');
                radarView.classList.add('view-active');
                toggleBtn.innerHTML = `<i class="fa-solid fa-list-ol"></i> <span class="toggle-label">STATS VIEW</span>`;

                // Re-trigger polygon draw animation
                const polygon = radarView.querySelector('.radar-data-polygon');
                if (polygon) {
                    polygon.style.animation = 'none';
                    polygon.offsetHeight; // trigger reflow
                    polygon.style.animation = 'radarPolygonExpand 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                }
            } else {
                radarView.classList.remove('view-active');
                statsView.classList.remove('view-hidden');
                toggleBtn.innerHTML = `<i class="fa-solid fa-chart-pie"></i> <span class="toggle-label">RADAR VIEW</span>`;
            }
        });
    } catch (err) {
        console.warn('initRadarChart error:', err);
    }
}

// --- Module 6: Parallax Atmosphere Beams on Scroll ---
function initAtmosphereParallax() {
    try {
        if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const beamLeft = document.querySelector('.floodlight-beam.beam-left');
        const beamRight = document.querySelector('.floodlight-beam.beam-right');
        if (!beamLeft && !beamRight) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    if (scrollY < 1200) {
                        if (beamLeft) beamLeft.style.transform = `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.01}deg)`;
                        if (beamRight) beamRight.style.transform = `translateY(${scrollY * 0.18}px) rotate(${-scrollY * 0.01}deg)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    } catch (err) {
        console.warn('initAtmosphereParallax error:', err);
    }
}

/* ==========================================================================
   PHASE 2: PASS NETWORK, SCOREBOARD ROLLERS, SPOTLIGHTS & TROPHY LIFT
   ========================================================================== */

// --- Module 7: Sports Celebration Confetti Engine ---
let triggerCelebrationConfetti = () => {};

function initCelebrationConfetti() {
    try {
        const canvas = document.getElementById('celebration-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        let particles = [];
        let animId = null;

        const renderLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.vx *= p.drag;
                p.rot += p.rotSpeed;
                p.alpha -= p.decay;

                if (p.alpha <= 0 || p.y > canvas.height + 20) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;

                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 0.6);
                }
                ctx.restore();
            }

            if (particles.length > 0) {
                animId = requestAnimationFrame(renderLoop);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                animId = null;
            }
        };

        triggerCelebrationConfetti = (originX, originY, palette = ['#FFD700', '#DAA520', '#2E5A36', '#FFFFFF'], count = 40) => {
            if (isReducedMotion) return;

            const safeX = originX || window.innerWidth / 2;
            const safeY = originY || window.innerHeight / 2;

            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * Math.random());
                const speed = 4 + Math.random() * 9;
                particles.push({
                    x: safeX,
                    y: safeY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 3.5, // upward pop
                    gravity: 0.22,
                    drag: 0.98,
                    size: 5 + Math.random() * 6,
                    color: palette[Math.floor(Math.random() * palette.length)],
                    rot: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.25,
                    alpha: 1,
                    decay: 0.012 + Math.random() * 0.014,
                    shape: Math.random() > 0.4 ? 'rect' : 'circle'
                });
            }

            if (!animId) {
                animId = requestAnimationFrame(renderLoop);
            }
        };

        // Expose globally
        window.triggerCelebrationConfetti = triggerCelebrationConfetti;
    } catch (err) {
        console.warn('initCelebrationConfetti error:', err);
    }
}

// --- Module 8: Tactical Pitch Pass Network & Dynamic Heat-Zone ---
function initPassNetwork() {
    try {
        const pitch = document.querySelector('.pitch');
        const heatZone = document.getElementById('player-heat-zone');
        const lanes = document.querySelectorAll('.pass-lane');
        const nodes = document.querySelectorAll('.player-node');
        if (!pitch || !lanes.length) return;

        const skillPositions = {
            react: { cx: 125, cy: 140 },
            llm: { cx: 250, cy: 105 },
            css: { cx: 375, cy: 140 },
            springboot: { cx: 250, cy: 315 },
            java: { cx: 100, cy: 350 },
            sql: { cx: 400, cy: 350 },
            oop: { cx: 250, cy: 420 },
            mysql: { cx: 160, cy: 546 },
            redis: { cx: 340, cy: 546 },
            git: { cx: 250, cy: 630 }
        };

        const highlightPlayerLanes = (skillKey) => {
            if (!skillKey) return;

            // Move & illuminate dynamic heat zone
            const pos = skillPositions[skillKey];
            if (pos && heatZone) {
                heatZone.setAttribute('cx', pos.cx);
                heatZone.setAttribute('cy', pos.cy);
                heatZone.classList.add('active');
            }

            // Highlight connected passing lanes, dim others
            lanes.forEach(lane => {
                const connected = (lane.getAttribute('data-players') || '').split(' ');
                if (connected.includes(skillKey)) {
                    lane.classList.add('highlighted');
                    lane.classList.remove('dimmed');
                } else {
                    lane.classList.add('dimmed');
                    lane.classList.remove('highlighted');
                }
            });

            // Re-trigger animated fill of the skill rating bar
            setTimeout(() => {
                const fillBar = document.querySelector('.scout-notes-panel .rating-bar-fill');
                if (fillBar) {
                    fillBar.classList.remove('fill-animate');
                    void fillBar.offsetWidth; // trigger reflow
                    fillBar.classList.add('fill-animate');
                }
            }, 180);
        };

        const resetPlayerLanes = () => {
            lanes.forEach(lane => {
                lane.classList.remove('highlighted');
                lane.classList.remove('dimmed');
            });
            if (heatZone) {
                heatZone.classList.remove('active');
            }
        };

        nodes.forEach(node => {
            const skillKey = node.getAttribute('data-skill');
            node.addEventListener('mouseenter', () => highlightPlayerLanes(skillKey));
            node.addEventListener('click', () => highlightPlayerLanes(skillKey));
        });

        pitch.addEventListener('mouseleave', resetPlayerLanes);
    } catch (err) {
        console.warn('initPassNetwork error:', err);
    }
}

// --- Module 9: Match Day Scoreboard Digit Rollers ---
function initScoreboards() {
    try {
        const badges = document.querySelectorAll('.match-status-badge[data-home]');
        if (!badges.length) return;

        const rollDigit = (element, targetValue) => {
            if (!element) return;
            const target = parseInt(targetValue, 10);
            if (isNaN(target)) return;

            let current = 0;
            element.textContent = '0';
            element.classList.add('rolling');

            const stepTime = Math.max(120, Math.floor(700 / (target + 1)));
            const interval = setInterval(() => {
                current++;
                if (current <= target) {
                    element.textContent = current;
                    element.classList.remove('rolling');
                    void element.offsetWidth;
                    element.classList.add('rolling');
                } else {
                    clearInterval(interval);
                    element.textContent = target;
                }
            }, stepTime);
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('revealed');

                    const badge = card.querySelector('.match-status-badge[data-home]');
                    if (badge && !badge.dataset.rolled) {
                        badge.dataset.rolled = 'true';
                        const homeDigit = badge.querySelector('.home-score');
                        const awayDigit = badge.querySelector('.away-score');
                        const homeTarget = badge.getAttribute('data-home') || '0';
                        const awayTarget = badge.getAttribute('data-away') || '0';

                        rollDigit(homeDigit, homeTarget);
                        setTimeout(() => rollDigit(awayDigit, awayTarget), 250);
                    }
                    obs.unobserve(card);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.match-card').forEach(card => observer.observe(card));
    } catch (err) {
        console.warn('initScoreboards error:', err);
    }
}

// --- Module 10: Match Card Spotlight Hover & Goal Celebration Bursts ---
function initMatchSpotlights() {
    try {
        const cards = document.querySelectorAll('.match-card');
        if (!cards.length) return;

        const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        cards.forEach(card => {
            if (isFinePointer) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--spotlight-x', `${x.toFixed(1)}%`);
                    card.style.setProperty('--spotlight-y', `${y.toFixed(1)}%`);
                }, { passive: true });
            }

            // Click trigger for Goal Celebration Confetti Burst
            card.addEventListener('click', (e) => {
                const rect = card.getBoundingClientRect();
                const clickX = e.clientX || (rect.left + rect.width / 2);
                const clickY = e.clientY || (rect.top + rect.height / 2);
                triggerCelebrationConfetti(clickX, clickY, ['#2E5A36', '#D4AF37', '#1E3E26', '#E6C665'], 35);
            });
        });
    } catch (err) {
        console.warn('initMatchSpotlights error:', err);
    }
}

// --- Module 11: Trophy Cabinet 3D Tilt, Periodic Shine & Trophy Lift Ceremony ---
function initTrophyInteractions() {
    try {
        const trophyCards = document.querySelectorAll('.trophy-card');
        if (!trophyCards.length) return;

        // 1. Periodic Shine Sweep across trophies
        let currentTrophyIdx = 0;
        setInterval(() => {
            if (document.hidden) return;
            const card = trophyCards[currentTrophyIdx % trophyCards.length];
            if (card) {
                card.classList.add('shine-sweep');
                setTimeout(() => card.classList.remove('shine-sweep'), 1400);
            }
            currentTrophyIdx++;
        }, 4200);

        // 2. 3D Tilt on Hover for fine pointer desktop
        const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        trophyCards.forEach(card => {
            if (isFinePointer) {
                let rafId = null;
                let rotX = 0;
                let rotY = 0;

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    rotX = Math.max(-10, Math.min(10, ((y - centerY) / centerY) * -10));
                    rotY = Math.max(-10, Math.min(10, ((x - centerX) / centerX) * 10));

                    if (!rafId) {
                        rafId = requestAnimationFrame(() => {
                            card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-8px)`;
                            rafId = null;
                        });
                    }
                }, { passive: true });

                card.addEventListener('mouseleave', () => {
                    if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = null;
                    }
                    card.style.transform = '';
                });
            }

            // 3. Trophy Click: Trophy Lift Animation + Gold Confetti Shower + Commentary Feed
            card.addEventListener('click', (e) => {
                if (card.classList.contains('lifting')) return;
                card.classList.add('lifting');
                setTimeout(() => card.classList.remove('lifting'), 900);

                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Gold and trophy celebration palette
                triggerCelebrationConfetti(centerX, centerY, ['#FFD700', '#DAA520', '#FFFFFF', '#B8860B', '#F59E0B'], 55);

                // Add to live media ticker feed
                const trophyTitle = card.getAttribute('data-trophy') || card.querySelector('.trophy-title')?.textContent || 'Major Trophy';
                if (typeof addTickerItem === 'function') {
                    addTickerItem("TROPHY ROOM", `Honour unlocked: **${trophyTitle}** celebrated by scouts and supporters!`);
                }
            });
        });
    } catch (err) {
        console.warn('initTrophyInteractions error:', err);
    }
}

/* ==========================================================================
   PHASE 3: TRANSFER TIMELINE, PRESS ROOM FLASH & GLOBAL POLISH
   ========================================================================== */

// --- Module 12: Transfer History Scroll-Linked Progress & Official Stamp Slam ---
function initTimelineScroll() {
    try {
        const timeline = document.getElementById('transfers-timeline');
        const progressBar = document.getElementById('timeline-scroll-progress');
        if (!timeline || !progressBar) return;

        let ticking = false;
        const updateTimelineProgress = () => {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDist = rect.height;
            const currentDist = (windowHeight * 0.7) - rect.top;
            const progress = Math.max(0, Math.min(100, (currentDist / totalDist) * 100));
            progressBar.style.height = `${progress.toFixed(1)}%`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateTimelineProgress);
                ticking = true;
            }
        }, { passive: true });

        // Official Stamp Slam Screen-Shake on scroll reveal
        const transferCards = document.querySelectorAll('.transfer-card');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('revealed');

                    // Subtle screen shake on stamp impact
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        setTimeout(() => {
                            document.body.classList.add('stamp-screen-shake');
                            setTimeout(() => document.body.classList.remove('stamp-screen-shake'), 300);
                        }, 250);
                    }

                    obs.unobserve(card);
                }
            });
        }, { threshold: 0.25 });

        transferCards.forEach(card => observer.observe(card));
    } catch (err) {
        console.warn('initTimelineScroll error:', err);
    }
}

// --- Module 13: Continuous Smooth Ticker Marquee ---
function initTickerMarquee() {
    try {
        const ticker = document.getElementById('feed-ticker-container');
        if (!ticker) return;

        let isHovered = false;
        ticker.addEventListener('mouseenter', () => { isHovered = true; });
        ticker.addEventListener('mouseleave', () => { isHovered = false; });

        // Continuous smooth auto-scroller
        let scrollPos = 0;
        const scrollStep = () => {
            if (!isHovered && ticker.scrollHeight > ticker.clientHeight) {
                scrollPos += 0.45;
                if (scrollPos >= ticker.scrollHeight - ticker.clientHeight) {
                    scrollPos = 0;
                }
                ticker.scrollTop = scrollPos;
            } else {
                scrollPos = ticker.scrollTop;
            }
            requestAnimationFrame(scrollStep);
        };
        requestAnimationFrame(scrollStep);
    } catch (err) {
        console.warn('initTickerMarquee error:', err);
    }
}

// --- Module 14: Magnetic Hover on Interactive Action Buttons ---
function initMagneticButtons() {
    try {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const magneticElements = document.querySelectorAll('.btn-submit-press, .action-btn.theme-btn, .whistle-btn');
        magneticElements.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const dx = (e.clientX - rect.left - rect.width / 2) * 0.25;
                const dy = (e.clientY - rect.top - rect.height / 2) * 0.25;
                btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
            }, { passive: true });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    } catch (err) {
        console.warn('initMagneticButtons error:', err);
    }
}

// --- Module 15: Day Match / Night Match Theme Persistence ---
function initThemeToggle() {
    try {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        const icon = toggleBtn.querySelector('i');
        const savedTheme = localStorage.getItem('matchTheme');

        if (savedTheme === 'night') {
            document.body.classList.add('night-match');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }

        toggleBtn.addEventListener('click', () => {
            const isNight = document.body.classList.toggle('night-match');
            if (icon) {
                if (isNight) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
            localStorage.setItem('matchTheme', isNight ? 'night' : 'day');

            if (typeof addTickerItem === 'function') {
                addTickerItem("STADIUM CONTROL", isNight ? "Night match floodlights activated. Match underway under the lights!" : "Day match natural sunlight restored.");
            }
        });
    } catch (err) {
        console.warn('initThemeToggle error:', err);
    }
}

// --- Module 16: Section Headings Split-Text / Mask Reveal ---
function initHeadingMaskReveals() {
    try {
        const headings = document.querySelectorAll('.section-title');
        if (!headings.length) return;

        headings.forEach(h2 => {
            const rawText = h2.innerHTML;
            h2.innerHTML = `<span class="title-mask-inner">${rawText}</span>`;
        });

        const headers = document.querySelectorAll('.section-header');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        headers.forEach(h => observer.observe(h));
    } catch (err) {
        console.warn('initHeadingMaskReveals error:', err);
    }
}

// --- Module 17: Custom Sports Football Cursor with Trailing Physics ---
function initCustomCursor() {
    try {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const cursorBall = document.getElementById('cursor-ball');
        const cursorTrail = document.getElementById('cursor-trail');
        if (!cursorBall || !cursorTrail) return;

        document.body.classList.add('has-custom-cursor');

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let ballX = targetX;
        let ballY = targetY;
        let trailX = targetX;
        let trailY = targetY;
        let ballRot = 0;
        let isVisible = false;

        const onPointerMove = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;

            if (!isVisible) {
                isVisible = true;
                cursorBall.classList.remove('hidden');
                cursorTrail.classList.remove('hidden');
            }

            // If hovering over input/textarea, hide custom cursor and restore native cursor
            const targetTag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
            const isTextControl = (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select' || e.target.isContentEditable);
            if (isTextControl) {
                cursorBall.classList.add('hidden');
                cursorTrail.classList.add('hidden');
            } else {
                cursorBall.classList.remove('hidden');
                cursorTrail.classList.remove('hidden');
            }

            // If hovering over clickable elements, expand trailing ring
            const isClickable = e.target.closest('a, button, .player-node, .match-card, .trophy-card, .filter-btn, .action-btn');
            if (isClickable) {
                cursorTrail.classList.add('hovered');
            } else {
                cursorTrail.classList.remove('hovered');
            }
        };

        window.addEventListener('mousemove', onPointerMove, { passive: true });

        document.addEventListener('mouseleave', () => {
            cursorBall.classList.add('hidden');
            cursorTrail.classList.add('hidden');
            isVisible = false;
        });

        document.addEventListener('mouseenter', () => {
            cursorBall.classList.remove('hidden');
            cursorTrail.classList.remove('hidden');
            isVisible = true;
        });

        // Animation loop with lerp and rotational velocity
        const renderCursor = () => {
            const dx = targetX - ballX;
            const dy = targetY - ballY;
            ballX += dx * 0.8;
            ballY += dy * 0.8;
            ballRot += (dx + dy) * 0.35; // rotate ball proportionally to movement

            trailX += (targetX - trailX) * 0.22;
            trailY += (targetY - trailY) * 0.22;

            cursorBall.style.transform = `translate(${ballX.toFixed(1)}px, ${ballY.toFixed(1)}px) rotate(${ballRot.toFixed(1)}deg)`;
            cursorTrail.style.transform = `translate(${trailX.toFixed(1)}px, ${trailY.toFixed(1)}px)`;

            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);
    } catch (err) {
        console.warn('initCustomCursor error:', err);
    }
}

// Initialize Phase 1, Phase 2 & Phase 3 modules on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Phase 1 Modules
    initStadiumLoader();
    initHeroTilt();
    initHeroParticles();
    initStatsCountUp();
    initRadarChart();
    initAtmosphereParallax();

    // Phase 2 Modules
    initCelebrationConfetti();
    initPassNetwork();
    initScoreboards();
    initMatchSpotlights();
    initTrophyInteractions();

    // Phase 3 Modules
    initTimelineScroll();
    initTickerMarquee();
    initMagneticButtons();
    initThemeToggle();
    initHeadingMaskReveals();
    initCustomCursor();
});

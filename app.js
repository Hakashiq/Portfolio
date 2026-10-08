/* ==========================================
   INTERACTIVE SCRIPTS
   Project: Hak Ashiq M - Scout Portfolio
   ========================================== */

// --- Skill Data Dictionary ---
const skillDatabase = {
    react: {
        name: "React.js",
        rating: 90,
        position: "Forward (Frontend UI)",
        notes: "Acts as the key playmaker in user interfaces. Highly adept at building reactive, modular frontends, managing component states, and integrating interactive dashboards. Provides fluid transitions and crisp user experiences.",
        plays: [
            "Component Lifecycle & Hooks Mastery",
            "Single Page Application (SPA) Routing",
            "State Management & API Integration"
        ]
    },
    llm: {
        name: "FastAPI & LLM APIs",
        rating: 88,
        position: "Forward (AI Integration)",
        notes: "Striking capacity in generative AI systems. Expert in parsing resumes, constructing intelligent question-generation prompts, and orchestrating response evaluations via LLM integration.",
        plays: [
            "Prompt Engineering & Agents",
            "FastAPI Microservice Deployment",
            "LLM API Orchestration (Google/OpenAI)"
        ]
    },
    css: {
        name: "Tailwind & CSS3",
        rating: 86,
        position: "Forward (Styling & Design)",
        notes: "Provides elegant spacing and high aesthetics. Specializes in grid layouts, glassmorphic cards, custom animations, and responsive screen-size configurations.",
        plays: [
            "Flexbox & CSS Grid Mastery",
            "Custom Animations & Keyframes",
            "Tailwind Utility Framework Efficiency"
        ]
    },
    springboot: {
        name: "Spring Boot",
        rating: 92,
        position: "Midfield (Core Engine)",
        notes: "The central playmaker that structures the system. Exceptional at developing enterprise-grade REST APIs, modular code bases, and mapping relational databases using Spring Data JPA.",
        plays: [
            "Spring Boot RESTful Architectures",
            "Spring Security & JWT Authentication",
            "Spring Data JPA & Query Tuning"
        ]
    },
    java: {
        name: "Java",
        rating: 91,
        position: "Midfield (Core Language)",
        notes: "Sturdy foundation with elite command over compiler execution. Proficient in garbage collection mechanics, concurrency, multithreading, and type safety constraints.",
        plays: [
            "Object-Oriented Programming (OOP)",
            "Java Collections Framework (JCF)",
            "Multithreading & Concurrency Control"
        ]
    },
    sql: {
        name: "SQL & Relational DBs",
        rating: 89,
        position: "Midfield (Database Architecture)",
        notes: "Master of database schemas, relational integrity, and high-performance querying. Adept at query tuning, normalization, complex joins, and transaction consistency.",
        plays: [
            "Relational Schema Design & Normalization",
            "Complex Joins & Aggregation Queries",
            "Transaction Isolation & ACID Compliance"
        ]
    },
    oop: {
        name: "OOP & DSA",
        rating: 90,
        position: "Midfield (Logic & Algorithms)",
        notes: "Keeps defensive lines organised. Elite tactical knowledge in Data Structures and Algorithms (solved 250+ Leetcode challenges). Highly skilled in time/space complexity optimization.",
        plays: [
            "Time & Space Complexity (Big O)",
            "Graphs, Trees, & Dynamic Programming",
            "Clean Code & Solid Design Patterns"
        ]
    },
    mysql: {
        name: "MySQL",
        rating: 89,
        position: "Defense (Relational DB)",
        notes: "Solid center-back defending database integrity. Expert at structural mapping, normal forms, indexing queries, and enforcing relational constraints.",
        plays: [
            "SQL Schema Optimization & Normalization",
            "Indexing & Transaction Isolation",
            "Complex Joins & View Configurations"
        ]
    },
    mongodb: {
        name: "MongoDB",
        rating: 85,
        position: "Defense (NoSQL Document)",
        notes: "Flexible fullback handling unstructured datasets. Proficient in managing document references, aggregation pipelines, and rapid prototyping workflows.",
        plays: [
            "NoSQL Schema Modelling",
            "Document Aggregation Pipelines",
            "Index Configurations for Read Speed"
        ]
    },
    redis: {
        name: "Redis",
        rating: 88,
        position: "Defense (Caching & Speed)",
        notes: "Defensive midfielder blocking latency spikes. Acts as an in-memory cache to hold key-value tokens, sessions, and heavy API response data.",
        plays: [
            "High-Speed Caching Strategies",
            "Session Store Management",
            "Key Expiry & Invalidation Rules"
        ]
    },
    git: {
        name: "Git & Version Control",
        rating: 92,
        position: "Goalkeeper (Tools & Safety)",
        notes: "The last line of defense preventing deploy merges from breaking production. Master of branch management, resolving merge conflicts, and structured version tracking.",
        plays: [
            "Advanced Git Branching & Rebase",
            "Merge Conflict Resolutions",
            "Build Automation (Maven & Package Managers)"
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
    { sender: "Fabrizio Romano", msg: "Hak Ashiq M continues to attract serious interest after checking in 250+ Leetcode ratings. Staggering numbers." },
    { sender: "Sky Sports Tech", msg: "Analyzing tactical shapes: Spring Boot and React are forming a formidable offensive pivot." },
    { sender: "Marca", msg: "Scout reports confirm: Hak Ashiq M's workrate has been registered as High/High." },
    { sender: "The Athletic", msg: "Locker room sources say: Winning the Kho Kho Inter-Zonal tournament has built supreme leadership traits." }
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
        // Append entry to live press ticker feed
        addTickerItem("BREAKING NEWS", `Scout **${nameVal}** representing **${orgVal}** has officially entered the press room! Direct inquiry submitted: "${msgVal.substring(0, 50)}..."`);
        
        // Show Success Feedback UI inside the form
        const formContainer = document.querySelector('.press-form-container');
        formContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--color-green); animation: slideIn 0.4s ease-out;">
                <i class="fa-solid fa-circle-check" style="font-size: 4.5rem; margin-bottom: 20px; color: var(--color-green);"></i>
                <h3 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--font-heading);">Contract Inquiry Sent!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">Your question has been sent directly to Hak Ashiq M's agent (thakashiq@gmail.com). Fabrizio Romano is preparing the 'Here We Go' announcement.</p>
                <button id="reset-form-btn" class="btn btn-primary" style="margin: 0 auto; display: inline-flex;"><i class="fa-solid fa-arrow-rotate-left"></i> Submit Another Inquiry</button>
            </div>
        `;
        
        document.getElementById('reset-form-btn').addEventListener('click', () => {
            location.reload(); // Simple reload to restore the original form HTML state
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

// Initialize Phase 1 modules on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initStadiumLoader();
    initHeroTilt();
    initHeroParticles();
    initStatsCountUp();
    initRadarChart();
    initAtmosphereParallax();
});

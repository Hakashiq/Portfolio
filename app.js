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
    python: {
        name: "Python",
        rating: 88,
        position: "Midfield (Scripting & AI)",
        notes: "Versatile support player in data preprocessing and microservices. Frequently utilized to write FastAPI middleware, AI pipeline scripts, and data parsers.",
        plays: [
            "Data Wrangling & Text Parsing",
            "FastAPI Server Architecture",
            "Script Automation & Tooling"
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
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('scout-name').value;
    const orgInput = document.getElementById('scout-org').value;
    const emailInput = document.getElementById('scout-email').value;
    const msgInput = document.getElementById('scout-msg').value;
    
    // Play whistle kickoff sound
    whistleSound.currentTime = 0;
    whistleSound.play().catch(e => console.log(e));
    
    // Append to live feed
    addTickerItem("BREAKING NEWS", `Scout **${nameInput}** representing **${orgInput}** has officially entered the press room! Direct inquiry submitted: "${msgInput.substring(0, 50)}..."`);
    
    // Clear inputs
    contactForm.reset();
    
    // Display Success Feedback UI inside the form
    const formContainer = document.querySelector('.press-form-container');
    const originalContent = formContainer.innerHTML;
    
    formContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--color-green); animation: slideIn 0.4s ease-out;">
            <i class="fa-solid fa-circle-check" style="font-size: 4.5rem; margin-bottom: 20px; color: var(--color-green);"></i>
            <h3 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--font-heading);">Contract Inquiry Registered!</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">Your question has been broadcast to the Player agent. Fabrizio Romano is preparing the 'Here We Go' announcement.</p>
            <button id="reset-form-btn" class="btn btn-primary" style="margin: 0 auto; display: inline-flex;"><i class="fa-solid fa-arrow-rotate-left"></i> Submit Another Inquiry</button>
        </div>
    `;
    
    // Add reset button action
    document.getElementById('reset-form-btn').addEventListener('click', () => {
        formContainer.innerHTML = originalContent;
        // Re-bind submit listener since HTML was replaced
        const newForm = document.getElementById('scout-contact-form');
        newForm.addEventListener('submit', arguments.callee);
        
        // Need to re-cache elements if needed, or simply reload page behavior or manual reset.
        // Easiest is to bind the listener:
        bindForm(newForm);
    });
});

// Helper function to bind contact form action in case of reset
function bindForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('scout-name').value;
        const orgVal = document.getElementById('scout-org').value;
        const emailVal = document.getElementById('scout-email').value;
        const msgVal = document.getElementById('scout-msg').value;
        
        whistleSound.currentTime = 0;
        whistleSound.play().catch(e => console.log(e));
        
        addTickerItem("BREAKING NEWS", `Scout **${nameVal}** representing **${orgVal}** has officially entered the press room! Direct inquiry submitted: "${msgVal.substring(0, 50)}..."`);
        
        form.reset();
        
        const formContainer = document.querySelector('.press-form-container');
        formContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--color-green); animation: slideIn 0.4s ease-out;">
                <i class="fa-solid fa-circle-check" style="font-size: 4.5rem; margin-bottom: 20px; color: var(--color-green);"></i>
                <h3 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--font-heading);">Contract Inquiry Registered!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">Your question has been broadcast to the Player agent. Fabrizio Romano is preparing the 'Here We Go' announcement.</p>
                <button id="reset-form-btn-2" class="btn btn-primary" style="margin: 0 auto; display: inline-flex;"><i class="fa-solid fa-arrow-rotate-left"></i> Submit Another Inquiry</button>
            </div>
        `;
        document.getElementById('reset-form-btn-2').addEventListener('click', () => {
            location.reload(); // Simple, clean reload to reset everything
        });
    });
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

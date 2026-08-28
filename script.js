// ==========================================
// KASCORE CONTENT DATA
// EDIT THIS SECTION TO UPDATE THE WEBSITE
// ==========================================

const challenges = [
    {
        id: "cf-01",
        number: "01",
        name: "Bellingcat Challenges",
        focus: ["Image Investigation", "Geolocation", "Verification"],
        description: "Practice identifying locations, verifying images and solving visual investigation challenges. Perfect for developing a critical eye for visual clues.",
        difficulty: "Beginner → Intermediate",
        levelScore: 35, // For UI progress bar
        url: "https://challenge.bellingcat.com/",
        category: "image",
        status: "AVAILABLE"
    },
    {
        id: "cf-02",
        number: "02",
        name: "OSINT Dojo",
        focus: ["Open-Web Research", "Digital Footprints", "Investigation"],
        description: "Work through structured OSINT challenges with progressive difficulty. The rank system guides you from novice to advanced methodologies.",
        difficulty: "Beginner → Advanced",
        levelScore: 60,
        url: "https://www.osintdojo.com/",
        category: "beginner",
        status: "AVAILABLE"
    },
    {
        id: "cf-03",
        number: "03",
        name: "OSINT Industries CTF",
        focus: ["Scenario Investigation", "Clue Analysis", "OSINT CTF"],
        description: "Practice scenario-based OSINT investigations and connect clues to reach the answer. Tests your ability to chain public data points together.",
        difficulty: "Beginner → Advanced",
        levelScore: 75,
        url: "https://ctf.osint.industries/",
        category: "ctf",
        status: "AVAILABLE"
    },
    {
        id: "cf-04",
        number: "04",
        name: "Trace Labs",
        focus: ["Search Party", "Open-Source Research", "Investigation"],
        description: "Practice real-world-style OSINT investigations through Search Party events. High stakes, real scenarios focusing on missing persons intelligence.",
        difficulty: "Intermediate → Advanced",
        levelScore: 90,
        url: "https://www.tracelabs.org/",
        category: "advanced",
        status: "SCHEDULED"
    },
    {
        id: "cf-05",
        number: "05",
        name: "UK OSINT Community",
        focus: ["Passive OSINT", "Open-Web Research", "Verification"],
        description: "A monthly OSINT investigation where participants search, connect and verify publicly available information in a collaborative community.",
        difficulty: "Beginner → Advanced",
        levelScore: 65,
        url: "https://ctf.osint.uk/",
        category: "ctf",
        status: "AVAILABLE"
    }
];

const resources = [
    {
        id: "res-001",
        name: "Bellingcat Guides",
        helpsWith: "Visual verification, geolocation, and advanced OSINT methodologies.",
        type: "DOCUMENTATION",
        url: "https://www.bellingcat.com/category/resources/"
    },
    {
        id: "res-002",
        name: "Trace Labs Documentation",
        helpsWith: "Tools and methodologies for missing persons OSINT investigations.",
        type: "TRAINING",
        url: "https://www.tracelabs.org/resources"
    },
    {
        id: "res-003",
        name: "OSINT Dojo Resources",
        helpsWith: "Rank-based learning paths and curated open-source tools.",
        type: "DATABASE",
        url: "https://www.osintdojo.com/resources/"
    },
    {
        id: "res-004",
        name: "OSINT Industries Platform",
        helpsWith: "Real-time verification engines and practical OSINT labs.",
        type: "PLATFORM",
        url: "https://osint.industries/"
    },
    {
        id: "res-005",
        name: "UK OSINT Community",
        helpsWith: "Networking, monthly challenges, and collaborative learning.",
        type: "COMMUNITY",
        url: "https://osint.uk/"
    }
];

// ==========================================
// SYSTEM LOGIC & INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initSystemLoader();
    initScrollNav();
    initMobileMenu();
    
    renderMissions(challenges);
    initFilters();
    initModal();
    
    initDecisionMatrix();
    
    renderResources(resources);
    initResourceSearch();
    
    initRadarInteractions();
    initScrollAnimations();
    initThreadAnimation();
});

// 1. System Loader
function initSystemLoader() {
    const loader = document.getElementById('sys-loader');
    // Short artificial delay for system initialization feel
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scroll
            // Trigger first reveals
            document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('active'));
        }, 500);
    }, 600); // 600ms load as per requirements
}

// 2. Scroll Nav & Animations
function initScrollNav() {
    const sections = document.querySelectorAll('.observe-section');
    const navDots = document.querySelectorAll('.scroll-dot');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update side nav
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('href') === `#${entry.target.id}`) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(sec => observer.observe(sec));
    
    // Navbar background blur on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.style.background = 'rgba(7, 2, 2, 0.9)';
            navbar.style.borderBottomColor = 'var(--accent-red)';
        } else {
            navbar.style.background = 'rgba(7, 2, 2, 0.7)';
            navbar.style.borderBottomColor = 'var(--border)';
        }
    });
}

// Reveal Animations
function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));
}

// Investigation Thread Animation
function initThreadAnimation() {
    const thread = document.getElementById('main-thread');
    if(!thread) return;
    window.addEventListener('scroll', () => {
        const scrolled = document.documentElement.scrollTop;
        const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const fraction = scrolled / max;
        thread.style.height = `${fraction * 100}%`;
    });
}

// 3. Mobile Menu
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (toggleBtn && navbar) {
        toggleBtn.addEventListener('click', () => navbar.classList.toggle('menu-open'));
        navLinks.forEach(link => {
            link.addEventListener('click', () => navbar.classList.remove('menu-open'));
        });
    }
}

// 4. Missions / Challenges Render & Filters
function renderMissions(data) {
    const grid = document.getElementById("missions-grid");
    if (!grid) return;

    grid.innerHTML = data.map(mission => `
        <div class="mission-card interactive">
            <div class="mc-header">
                <div class="mc-sys">
                    <span>CASE_${mission.number}</span>
                    <span class="accent-alert">${mission.status}</span>
                </div>
                <h3 class="mc-title">${mission.name}</h3>
                <div class="mc-tags">
                    ${mission.focus.map(tag => `<span class="mc-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="mc-body">
                <div class="mc-stat">
                    <span class="mc-stat-lbl">DIFFICULTY</span>
                    <span>${mission.difficulty.split('→')[0].trim()}</span>
                </div>
                <div class="mc-diff-bar">
                    <div class="mc-diff-fill" style="width: ${mission.levelScore}%;"></div>
                </div>
            </div>
            <div class="mc-footer">
                <button class="btn-mission open-case-btn interactive" data-id="${mission.id}">ACCESS FILE &rarr;</button>
            </div>
        </div>
    `).join('');

    // Re-attach listeners to new buttons
    attachModalListeners();
}

function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // UI Update
            btns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Logic Update
            const filter = e.target.getAttribute('data-filter');
            if(filter === 'all') {
                renderMissions(challenges);
            } else {
                const filtered = challenges.filter(c => c.category === filter || (filter === 'advanced' && c.difficulty.includes('Advanced')));
                renderMissions(filtered);
            }
        });
    });
}

// 5. Case File Modal
function initModal() {
    const modal = document.getElementById('case-modal');
    const closeBtn = document.getElementById('modal-close');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

function attachModalListeners() {
    const btns = document.querySelectorAll('.open-case-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const mission = challenges.find(c => c.id === id);
            if(mission) openModal(mission);
        });
    });
}

function openModal(mission) {
    document.getElementById('cf-title').textContent = mission.name;
    document.getElementById('cf-diff').textContent = mission.difficulty;
    document.getElementById('cf-focus').textContent = mission.focus.join(', ');
    document.getElementById('cf-desc').textContent = mission.description;
    document.getElementById('cf-link').href = mission.url;
    
    document.getElementById('case-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('case-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 6. Decision Interface
function initDecisionMatrix() {
    const btns = document.querySelectorAll('.di-btn');
    const resultPanel = document.getElementById('di-result');
    
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const targetIdx = e.target.getAttribute('data-target');
            const rec = challenges[targetIdx];
            
            // Render Result
            resultPanel.innerHTML = `
                <div class="di-rec">
                    <span class="di-rec-lbl">RECOMMENDED STARTING POINT</span>
                    <h3 class="di-rec-title">${rec.name}</h3>
                    <p class="di-rec-desc">${rec.description}</p>
                    <a href="${rec.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary interactive">
                        <span class="btn-scanline"></span>
                        INITIALIZE MISSION &rarr;
                    </a>
                </div>
            `;
        });
    });
}

// 7. Resource Database Search
function renderResources(data) {
    const list = document.getElementById("resources-list");
    const count = document.getElementById("resource-count");
    if (!list) return;

    count.textContent = `${data.length < 10 ? '0'+data.length : data.length} RESULTS`;

    if(data.length === 0) {
        list.innerHTML = `<div class="res-empty">SYS.WARNING: NO RECORDS FOUND MATCHING QUERY.</div>`;
        return;
    }

    list.innerHTML = data.map(res => `
        <div class="res-record interactive" onclick="window.open('${res.url}', '_blank')">
            <div class="res-info">
                <span class="res-meta">TYPE // ${res.type}</span>
                <h4 class="res-title">${res.name}</h4>
                <p class="res-desc">${res.helpsWith}</p>
            </div>
            <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="res-action interactive" onclick="event.stopPropagation()">ACCESS ↗</a>
        </div>
    `).join('');
}

function initResourceSearch() {
    const input = document.getElementById('resource-search');
    if(!input) return;
    
    input.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = resources.filter(r => 
            r.name.toLowerCase().includes(term) || 
            r.helpsWith.toLowerCase().includes(term) ||
            r.type.toLowerCase().includes(term)
        );
        renderResources(filtered);
    });
}

// 8. Radar Interactions
function initRadarInteractions() {
    const nodes = document.querySelectorAll('.radar-node');
    const infoPanel = document.querySelector('.radar-info-panel');
    const title = infoPanel?.querySelector('.ri-title');
    const desc = infoPanel?.querySelector('.ri-desc');
    
    if(!nodes || !infoPanel) return;

    nodes.forEach(node => {
        node.addEventListener('mouseenter', (e) => {
            const label = node.querySelector('.rn-label').textContent;
            const description = node.getAttribute('data-desc');
            
            title.textContent = `PHASE: ${label}`;
            desc.textContent = description;
            infoPanel.style.borderColor = 'var(--accent-red)';
            infoPanel.style.boxShadow = '0 0 15px rgba(255,42,42,0.1)';
        });
        
        node.addEventListener('mouseleave', () => {
            title.textContent = 'SYSTEM LOOP';
            desc.textContent = 'Hover over a node to analyze the investigation phase.';
            infoPanel.style.borderColor = 'var(--border)';
            infoPanel.style.boxShadow = 'none';
        });
    });
}
// Enhanced Projects Section with Smooth Animations
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectsSection();
});

function initializeProjectsSection() {
    // Replace the old projects section structure
    restructureProjectsHTML();
    
    // Initialize smooth animations
    initScrollAnimations();
    
    // Add interactive hover effects
    addInteractiveEffects();
    
    // Add performance optimizations
    optimizeAnimations();
    
    // Initialize accessibility features
    enhanceAccessibility();
}

function restructureProjectsHTML() {
    const projectsSection = document.querySelector('#projects');
    if (!projectsSection) return;
    
    // Get all existing project sections
    const existingProjects = projectsSection.querySelectorAll('section');
    
    // Create new structure
    const newHTML = `
        <div class="inner">
            <h2>Featured Projects Portfolio</h2>
            <p>Comprehensive showcase of clinical data management, AI/ML research, and enterprise application development</p>
            <div class="projects-container">
                <div class="projects-grid">
                    ${generateProjectCards(existingProjects)}
                </div>
            </div>
        </div>
    `;
    
    projectsSection.innerHTML = newHTML;
}

function generateProjectCards(existingProjects) {
    let cardsHTML = '';
    
    existingProjects.forEach((project, index) => {
        const content = project.querySelector('.content .inner');
        if (!content) return;
        
        const iconElement = content.querySelector('.icon');
        const titleElement = content.querySelector('h2');
        const metaElements = content.querySelectorAll('p strong');
        
        if (!iconElement || !titleElement) return;
        
        const iconClass = getIconClass(iconElement);
        const projectCategory = getProjectCategory(iconClass);
        const projectData = extractProjectData(content);
        
        cardsHTML += `
            <div class="project-card ${projectCategory}" data-category="${projectCategory}" style="animation-delay: ${index * 0.15}s">
                <div class="project-header">
                    <div class="project-icon">
                        <i class="${iconClass}"></i>
                    </div>
                    <div class="project-title-section">
                        <h2>${titleElement.textContent}</h2>
                        <div class="project-meta-info">
                            ${generateMetaItems(projectData.meta)}
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    ${generateProjectSections(projectData)}
                </div>
            </div>
        `;
    });
    
    return cardsHTML;
}

function getIconClass(iconElement) {
    const classes = Array.from(iconElement.classList);
    return classes.join(' ');
}

function getProjectCategory(iconClass) {
    const categoryMap = {
        'fa-database': 'clinical-project',
        'fa-chart-line': 'clinical-project',
        'fa-brain': 'ai-project',
        'fa-robot': 'ai-project',
        'fa-file-medical': 'clinical-project',
        'fa-file-medical-alt': 'clinical-project',
        'fa-shield-alt': 'infrastructure-project',
        'fa-shield-halved': 'infrastructure-project',
        'fa-heartbeat': 'healthcare-project',
        'fa-heart-pulse': 'healthcare-project',
        'fa-server': 'infrastructure-project',
        'fa-eye': 'research-project',
        'fa-microscope': 'research-project',
        'fa-dna': 'research-project',
        'fa-cube': 'infrastructure-project',
        'fa-cubes': 'infrastructure-project',
        'fa-exchange-alt': 'automation-project',
        'fa-arrows-spin': 'automation-project',
        'fa-layer-group': 'infrastructure-project',
        'fa-rocket': 'automation-project',
        'fa-sitemap': 'integration-project',
        'fa-network-wired': 'integration-project',
        'fa-search': 'analytics-project',
        'fa-magnifying-glass-chart': 'analytics-project',
        'fa-camera': 'ai-project',
        'fa-camera-retro': 'ai-project',
        'fa-file-alt': 'automation-project',
        'fa-file-lines': 'automation-project',
        'fa-sync-alt': 'integration-project',
        'fa-rotate': 'integration-project',
        'fa-graduation-cap': 'infrastructure-project',
        'fa-user-graduate': 'infrastructure-project',
        'fa-comments': 'ai-project',
        'fa-message': 'ai-project'
    };
    
    for (const [key, value] of Object.entries(categoryMap)) {
        if (iconClass.includes(key)) {
            return value;
        }
    }
    
    return 'clinical-project';
}

function extractProjectData(content) {
    const data = {
        meta: {},
        overview: '',
        achievements: [],
        techStack: '',
        impact: ''
    };
    
    // Extract meta information
    const metaText = content.querySelector('p')?.textContent || '';
    const metaMatch = metaText.match(/Role:\s*([^|]+)\|?\s*Duration:\s*([^|]+)\|?\s*(.+)?/);
    if (metaMatch) {
        data.meta.role = metaMatch[1].trim();
        data.meta.duration = metaMatch[2].trim();
        if (metaMatch[3]) {
            data.meta.extra = metaMatch[3].trim();
        }
    }
    
    // Extract sections
    const paragraphs = content.querySelectorAll('p');
    paragraphs.forEach(p => {
        const text = p.textContent;
        if (text.includes('Project Overview:')) {
            data.overview = text.replace(/.*Project Overview:\s*/, '').trim();
        } else if (text.includes('Key Achievements:') || text.includes('Key Features:') || text.includes('Key Innovations:')) {
            const achievementsText = text.replace(/.*Key\s+(Achievements|Features|Innovations):\s*/, '');
            data.achievements = achievementsText.split('•').filter(item => item.trim()).map(item => item.trim());
        } else if (text.includes('Technical Architecture:') || text.includes('Technical Stack:') || text.includes('Tech Stack:')) {
            data.techStack = text.replace(/.*Technical\s+(Architecture|Stack):\s*|Tech Stack:\s*/, '').trim();
        } else if (text.includes('Impact:') || text.includes('Business Impact:') || text.includes('Industry Impact:')) {
            data.impact = text.replace(/.*Impact:\s*/, '').trim();
        }
    });
    
    return data;
}

function generateMetaItems(meta) {
    let items = '';
    if (meta.role) items += `<span class="meta-item">👤 ${meta.role}</span>`;
    if (meta.duration) items += `<span class="meta-item">⏱️ ${meta.duration}</span>`;
    if (meta.extra) items += `<span class="meta-item">📊 ${meta.extra}</span>`;
    return items;
}

function generateProjectSections(data) {
    let sectionsHTML = '';
    
    if (data.overview) {
        sectionsHTML += `
            <div class="project-section">
                <div class="section-title">Project Overview</div>
                <div class="section-content">${data.overview}</div>
            </div>
        `;
    }
    
    if (data.achievements.length > 0) {
        sectionsHTML += `
            <div class="project-section">
                <div class="section-title">Key Achievements</div>
                <ul class="achievements-list">
                    ${data.achievements.map(achievement => `
                        <li class="achievement-item">
                            <span class="achievement-icon">✨</span>
                            <span class="achievement-text">${achievement}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    if (data.techStack) {
        sectionsHTML += `
            <div class="project-section">
                <div class="section-title">Technology Stack</div>
                <div class="tech-stack">${data.techStack}</div>
            </div>
        `;
    }
    
    if (data.impact) {
        sectionsHTML += `
            <div class="project-section">
                <div class="section-title">Impact & Results</div>
                <div class="impact-metric">${data.impact}</div>
            </div>
        `;
    }
    
    return sectionsHTML;
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger section animations
                const sections = entry.target.querySelectorAll('.project-section');
                sections.forEach((section, index) => {
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);
    
    // Observe project cards after a short delay to ensure DOM is ready
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
}

function addInteractiveEffects() {
    // Add click effects
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            createAdvancedRipple(e, card);
        }
    });
}


function createAdvancedRipple(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: advancedRipple 0.8s ease-out;
        z-index: 1000;
    `;
    
    // Add advanced ripple animation
    if (!document.querySelector('#advanced-ripple-style')) {
        const style = document.createElement('style');
        style.id = 'advanced-ripple-style';
        style.textContent = `
            @keyframes advancedRipple {
                0% {
                    transform: scale(0);
                    opacity: 0.6;
                }
                50% {
                    opacity: 0.3;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

function optimizeAnimations() {
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    
    function updateAnimations() {
        // Update any continuous animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    // Throttle scroll events
    window.addEventListener('scroll', requestTick, { passive: true });
}

function enhanceAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.project-card')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        }
    });
    
    // Add ARIA labels
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            const title = card.querySelector('h2')?.textContent || `Project ${index + 1}`;
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', title);
            card.setAttribute('tabindex', '0');
        });
    }, 200);
    
    // Add focus management
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('focus', () => {
            card.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5), ' + getComputedStyle(card).boxShadow;
        });
        
        card.addEventListener('blur', () => {
            card.style.boxShadow = '';
        });
    });
}

// Initialize loading state management
function initLoadingStates() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.classList.add('project-loading');
        
        setTimeout(() => {
            card.classList.remove('project-loading');
        }, 500 + (index * 100));
    });
}

// Call loading states after DOM restructure
setTimeout(() => {
    initLoadingStates();
}, 100);
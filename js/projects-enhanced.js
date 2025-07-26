// Enhanced Projects Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize project animations
    initProjectAnimations();
    
    // Add scroll-triggered animations
    addScrollAnimations();
    
    // Add interactive hover effects
    addHoverEffects();
    
    // Add loading animations
    addLoadingAnimations();
    
    // Add smooth transitions
    addSmoothTransitions();
});

function initProjectAnimations() {
    const projects = document.querySelectorAll('#projects section');
    
    projects.forEach((project, index) => {
        // Add stagger delay based on index
        project.style.animationDelay = `${index * 0.1}s`;
        
        // Add category class for styling
        const icon = project.querySelector('.icon');
        if (icon) {
            const iconClass = icon.classList[icon.classList.length - 1];
            const categoryClass = getCategoryClass(iconClass);
            project.classList.add(categoryClass);
        }
    });
}

function getCategoryClass(iconClass) {
    const categoryMap = {
        'fa-database': 'clinical-project',
        'fa-brain': 'ai-project',
        'fa-file-medical': 'clinical-project',
        'fa-shield-alt': 'infrastructure-project',
        'fa-heartbeat': 'healthcare-project',
        'fa-server': 'infrastructure-project',
        'fa-eye': 'research-project',
        'fa-dna': 'research-project',
        'fa-cube': 'infrastructure-project',
        'fa-exchange-alt': 'automation-project',
        'fa-layer-group': 'infrastructure-project',
        'fa-rocket': 'automation-project',
        'fa-sitemap': 'integration-project',
        'fa-robot': 'ai-project',
        'fa-search': 'analytics-project',
        'fa-camera': 'ai-project',
        'fa-file-alt': 'automation-project',
        'fa-sync-alt': 'integration-project',
        'fa-graduation-cap': 'infrastructure-project',
        'fa-comments': 'ai-project'
    };
    
    return categoryMap[iconClass] || 'clinical-project';
}

function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation to child elements
                const elements = entry.target.querySelectorAll('.project-meta, .project-overview, .project-achievements, .project-tech-stack, .project-impact');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all project sections
    document.querySelectorAll('#projects section').forEach(section => {
        section.classList.add('project-animate');
        observer.observe(section);
    });
    
    // Add initial styles to animated elements
    document.querySelectorAll('.project-meta, .project-overview, .project-achievements, .project-tech-stack, .project-impact').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
    });
}

function addHoverEffects() {
    const projectCards = document.querySelectorAll('#projects .content');
    
    projectCards.forEach(card => {
        // Add mouse move effect for subtle interactivity
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        
        // Add click ripple effect
        card.addEventListener('click', (e) => {
            createRippleEffect(e, card);
        });
    });
}

function createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        z-index: 10;
    `;
    
    // Add ripple animation keyframes if not already added
    if (!document.querySelector('#ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addLoadingAnimations() {
    // Add loading shimmer effect during page load
    const projectCards = document.querySelectorAll('#projects .content');
    
    projectCards.forEach((card, index) => {
        card.classList.add('project-loading');
        
        setTimeout(() => {
            card.classList.remove('project-loading');
        }, 1000 + (index * 200));
    });
}

function addSmoothTransitions() {
    // Add smooth scrolling to project navigation if any
    document.querySelectorAll('a[href^="#projects"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            scrollToNextProject();
        } else if (e.key === 'ArrowUp' && e.ctrlKey) {
            scrollToPrevProject();
        }
    });
}

function scrollToNextProject() {
    const projects = document.querySelectorAll('#projects section');
    const currentScroll = window.pageYOffset;
    
    for (let project of projects) {
        const rect = project.getBoundingClientRect();
        if (rect.top > 100) {
            project.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

function scrollToPrevProject() {
    const projects = Array.from(document.querySelectorAll('#projects section')).reverse();
    const currentScroll = window.pageYOffset;
    
    for (let project of projects) {
        const rect = project.getBoundingClientRect();
        if (rect.top < -100) {
            project.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

// Add performance monitoring
function addPerformanceMonitoring() {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
                console.log(`${entry.name}: ${entry.startTime}ms`);
            }
        }
    });
    
    observer.observe({ entryTypes: ['paint'] });
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    addPerformanceMonitoring();
}

// Add accessibility improvements
function addAccessibilityFeatures() {
    // Add ARIA labels for better screen reader support
    document.querySelectorAll('#projects .project-icon-header').forEach((header, index) => {
        const title = header.querySelector('h2').textContent;
        header.setAttribute('aria-label', `Project ${index + 1}: ${title}`);
    });
    
    // Add focus management
    document.querySelectorAll('#projects .content').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        card.addEventListener('focus', () => {
            card.style.outline = '3px solid #4CAF50';
            card.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', () => {
            card.style.outline = '';
            card.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility features
addAccessibilityFeatures();
/* ==========================================================================
   BetBoom Streamers Battle 2026 - Advanced Animations
   ========================================================================== */

class PageTransitions {
    constructor() {
        this.overlay = document.getElementById('pageTransition');
        this.init();
    }
    
    init() {
        // Initial page load animation
        window.addEventListener('load', () => {
            this.revealPage();
        });
    }
    
    revealPage() {
        document.body.classList.add('loaded');
        
        // Stagger reveal of hero elements
        const heroElements = document.querySelectorAll('.magic-reveal');
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${0.2 + index * 0.15}s`;
        });
    }
    
    transitionTo(url) {
        this.overlay.classList.add('active');
        
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
}

class VesselAnimations {
    constructor() {
        this.vessels = document.querySelectorAll('.vessel-container');
        this.init();
    }
    
    init() {
        this.vessels.forEach((vessel, index) => {
            this.setupVessel(vessel, index);
        });
        
        // Add intersection observer for reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateVessels();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        const showcase = document.querySelector('.vessels-showcase');
        if (showcase) {
            observer.observe(showcase);
        }
    }
    
    setupVessel(vessel, index) {
        const sand = vessel.querySelector('.magic-sand');
        
        if (sand) {
            // Store original height
            const height = sand.style.getPropertyValue('--sand-height');
            sand.dataset.targetHeight = height;
            sand.style.setProperty('--sand-height', '0%');
        }
        
        // Hover effects
        vessel.addEventListener('mouseenter', () => {
            this.highlightVessel(vessel);
        });
        
        vessel.addEventListener('mouseleave', () => {
            this.unhighlightVessel(vessel);
        });
    }
    
    animateVessels() {
        this.vessels.forEach((vessel, index) => {
            setTimeout(() => {
                const sand = vessel.querySelector('.magic-sand');
                if (sand) {
                    sand.style.setProperty('--sand-height', sand.dataset.targetHeight);
                }
            }, index * 150);
        });
    }
    
    highlightVessel(vessel) {
        const glass = vessel.querySelector('.vessel-glass');
        const particles = vessel.querySelector('.vessel-particles');
        
        if (glass) {
            glass.style.boxShadow = `
                inset 0 0 30px rgba(255, 255, 255, 0.2),
                0 0 40px rgba(212, 175, 55, 0.5)
            `;
        }
        
        if (particles) {
            particles.style.opacity = '1';
        }
    }
    
    unhighlightVessel(vessel) {
        const glass = vessel.querySelector('.vessel-glass');
        const particles = vessel.querySelector('.vessel-particles');
        
        if (glass) {
            glass.style.boxShadow = '';
        }
        
        if (particles) {
            particles.style.opacity = '';
        }
    }
    
    // Update vessel with new score
    updateVessel(faculty, newScore, maxScore) {
        const vessel = document.querySelector(`.vessel-container[data-faculty="${faculty}"]`);
        
        if (vessel) {
            const sand = vessel.querySelector('.magic-sand');
            const scoreEl = vessel.querySelector('.faculty-score');
            const percentage = (newScore / maxScore) * 100;
            
            if (sand) {
                sand.style.setProperty('--sand-height', `${percentage}%`);
                sand.classList.add('updating');
                
                setTimeout(() => {
                    sand.classList.remove('updating');
                }, 1000);
            }
            
            if (scoreEl) {
                this.animateNumber(scoreEl, newScore);
            }
        }
    }
    
    animateNumber(element, target) {
        const current = parseInt(element.textContent.replace(/\D/g, ''));
        const diff = target - current;
        const duration = 1000;
        const steps = 30;
        let step = 0;
        
        const interval = setInterval(() => {
            step++;
            const value = Math.round(current + (diff * step / steps));
            element.textContent = value.toLocaleString('ru-RU') + ' очков';
            
            if (step >= steps) {
                clearInterval(interval);
                element.textContent = target.toLocaleString('ru-RU') + ' очков';
            }
        }, duration / steps);
    }
}

class CardAnimations {
    constructor() {
        this.cards = document.querySelectorAll('.bet-card, .streamer-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            this.setupCard(card);
        });
    }
    
    setupCard(card) {
        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        
        // Shine effect
        const shine = document.createElement('div');
        shine.className = 'card-shine';
        shine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent
            );
            pointer-events: none;
            z-index: 10;
        `;
        card.style.overflow = 'hidden';
        card.appendChild(shine);
        
        card.addEventListener('mouseenter', () => {
            shine.style.animation = 'cardShine 0.8s ease-out';
        });
        
        card.addEventListener('mouseleave', () => {
            shine.style.animation = '';
            shine.style.left = '-100%';
        });
    }
}

class TableAnimations {
    constructor() {
        this.table = document.querySelector('.results-table');
        this.rows = document.querySelectorAll('.result-row');
        this.init();
    }
    
    init() {
        if (!this.table) return;
        
        this.rows.forEach((row, index) => {
            this.setupRow(row, index);
        });
    }
    
    setupRow(row, index) {
        // Hover glow
        row.addEventListener('mouseenter', () => {
            const facultyColor = row.querySelector('.faculty-cell')?.style.getPropertyValue('--faculty-color');
            
            if (facultyColor) {
                row.style.background = `linear-gradient(90deg, ${facultyColor}15 0%, transparent 100%)`;
                row.style.boxShadow = `inset 0 0 30px ${facultyColor}10`;
            }
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.background = '';
            row.style.boxShadow = '';
        });
    }
    
    // Animate score update with magic flash
    updateScore(faculty, newScore) {
        const row = document.querySelector(`.result-row[data-faculty="${faculty}"]`);
        
        if (row) {
            const scoreEl = row.querySelector('.score-value');
            const currentScore = parseInt(scoreEl.dataset.score);
            
            // Add flash effect
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
                pointer-events: none;
                animation: magicFlash 0.5s ease-out;
            `;
            row.style.position = 'relative';
            row.appendChild(flash);
            
            setTimeout(() => flash.remove(), 500);
            
            // Animate number
            this.animateNumber(scoreEl, currentScore, newScore);
        }
    }
    
    animateNumber(element, from, to) {
        const duration = 1000;
        const steps = 30;
        const increment = (to - from) / steps;
        let step = 0;
        
        element.classList.add('score-updating');
        
        const interval = setInterval(() => {
            step++;
            const value = Math.round(from + increment * step);
            element.textContent = value.toLocaleString('ru-RU');
            
            if (step >= steps) {
                clearInterval(interval);
                element.textContent = to.toLocaleString('ru-RU');
                element.dataset.score = to;
                element.classList.remove('score-updating');
            }
        }, duration / steps);
    }
    
    // Reorder rows with animation
    reorderRows(newOrder) {
        const tbody = this.table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('.result-row'));
        
        // Store current positions
        rows.forEach(row => {
            const rect = row.getBoundingClientRect();
            row.dataset.currentY = rect.top;
        });
        
        // Reorder in DOM
        newOrder.forEach((faculty, index) => {
            const row = rows.find(r => r.dataset.faculty === faculty);
            if (row) {
                tbody.appendChild(row);
            }
        });
        
        // Animate to new positions
        const newRows = Array.from(tbody.querySelectorAll('.result-row'));
        newRows.forEach((row, index) => {
            const newRect = row.getBoundingClientRect();
            const oldY = parseFloat(row.dataset.currentY);
            const deltaY = oldY - newRect.top;
            
            if (deltaY !== 0) {
                row.style.transform = `translateY(${deltaY}px)`;
                row.style.transition = 'none';
                
                requestAnimationFrame(() => {
                    row.style.transition = 'transform 0.5s ease-out';
                    row.style.transform = 'translateY(0)';
                    
                    // Update rank shield
                    const shield = row.querySelector('.rank-shield');
                    if (shield) {
                        shield.textContent = index + 1;
                        this.updateRankClass(shield, index + 1);
                    }
                });
            }
        });
    }
    
    updateRankClass(shield, rank) {
        shield.classList.remove('gold', 'silver', 'bronze');
        if (rank === 1) shield.classList.add('gold');
        else if (rank === 2) shield.classList.add('silver');
        else if (rank === 3) shield.classList.add('bronze');
    }
}

class PortraitAnimations {
    constructor() {
        this.portraits = document.querySelectorAll('.portrait-image img');
        this.init();
    }
    
    init() {
        this.portraits.forEach(portrait => {
            this.setupPortrait(portrait);
        });
    }
    
    setupPortrait(portrait) {
        // Subtle breathing animation
        portrait.style.animation = 'portraitBreath 8s ease-in-out infinite';
        
        // Random blink
        setInterval(() => {
            if (Math.random() > 0.9) {
                portrait.style.filter = 'brightness(0.95)';
                setTimeout(() => {
                    portrait.style.filter = '';
                }, 150);
            }
        }, 3000);
        
        // Hover - eyes follow cursor (simplified effect)
        portrait.parentElement.addEventListener('mousemove', (e) => {
            const rect = portrait.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            portrait.style.transform = `scale(1.05) translate(${x * 5}px, ${y * 5}px)`;
        });
        
        portrait.parentElement.addEventListener('mouseleave', () => {
            portrait.style.transform = '';
        });
    }
}

class FactionNodeAnimations {
    constructor() {
        this.nodes = document.querySelectorAll('.faculty-node');
        this.center = document.querySelector('.academy-emblem');
        this.init();
    }
    
    init() {
        if (!this.nodes.length) return;
        
        // Stagger reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealNodes();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        const visualization = document.querySelector('.factions-visualization');
        if (visualization) {
            observer.observe(visualization);
        }
        
        // Connection pulse
        this.nodes.forEach(node => {
            const connection = node.querySelector('.node-connection');
            if (connection) {
                connection.style.animation = `connectionPulse ${3 + Math.random() * 2}s ease-in-out infinite`;
            }
        });
    }
    
    revealNodes() {
        // Center emblem first
        if (this.center) {
            this.center.style.animation = 'scaleIn 0.6s ease-out forwards, softGlow 3s ease-in-out infinite 0.6s';
        }
        
        // Then nodes
        this.nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '1';
                node.style.animation = 'scaleIn 0.5s ease-out forwards';
            }, 200 + index * 100);
        });
    }
    
    highlightPath(faculty) {
        const node = document.querySelector(`.faculty-node[data-faculty="${faculty}"]`);
        const connection = node?.querySelector('.node-connection');
        
        if (connection) {
            connection.style.opacity = '1';
            connection.style.height = '3px';
            connection.style.background = `linear-gradient(90deg, ${node.style.getPropertyValue('--node-color')}, transparent)`;
        }
    }
}

class BarAnimations {
    constructor() {
        this.bars = document.querySelectorAll('.balance-bar');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateBars();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        const balance = document.querySelector('.power-balance');
        if (balance) {
            observer.observe(balance);
        }
    }
    
    animateBars() {
        this.bars.forEach((bar, index) => {
            const fill = bar.querySelector('.bar-fill');
            
            if (fill) {
                const width = fill.style.getPropertyValue('--bar-width');
                fill.style.width = '0';
                
                setTimeout(() => {
                    fill.style.width = width;
                }, index * 100);
            }
        });
    }
    
    updateBar(faculty, percentage) {
        const bar = document.querySelector(`.balance-bar[data-faculty="${faculty}"]`);
        const fill = bar?.querySelector('.bar-fill');
        const value = bar?.querySelector('.bar-value');
        
        if (fill) {
            fill.style.width = `${percentage}%`;
            fill.classList.add('updating');
            
            setTimeout(() => {
                fill.classList.remove('updating');
            }, 500);
        }
        
        if (value) {
            value.textContent = `${Math.round(percentage)}%`;
        }
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    new PageTransitions();
    new VesselAnimations();
    new CardAnimations();
    new TableAnimations();
    new PortraitAnimations();
    new FactionNodeAnimations();
    new BarAnimations();
});

// Add required animation keyframes
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes cardShine {
        0% { left: -100%; }
        100% { left: 200%; }
    }
    
    @keyframes magicFlash {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    
    body.loaded .magic-reveal {
        animation: magicReveal 0.8s ease-out forwards;
    }
`;
document.head.appendChild(animationStyles);

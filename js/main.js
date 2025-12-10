/* ==========================================================================
   BetBoom Streamers Battle 2026 - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initSectionReveal();
    initFilters();
    initFactionInteraction();
    initExport();
    initMobileResults();
    initTooltips();
});

/* ==========================================================================
   Header
   ========================================================================== */
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   Mobile Menu
   ========================================================================== */
function initMobileMenu() {
    const burger = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    function toggleMenu() {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMenu() {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

/* ==========================================================================
   Smooth Scroll
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================================================
   Section Reveal on Scroll
   ========================================================================== */
function initSectionReveal() {
    const sections = document.querySelectorAll('.section-reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/* ==========================================================================
   Filters
   ========================================================================== */
function initFilters() {
    // Results filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterResults(filter);
        });
    });
    
    // Streamers filter
    const filterChips = document.querySelectorAll('.filter-chip');
    const streamerCards = document.querySelectorAll('.streamer-card');
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const game = chip.dataset.game;
            
            streamerCards.forEach(card => {
                if (game === 'all') {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    const games = card.dataset.games.split(',');
                    if (games.includes(game)) {
                        card.style.display = '';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

function filterResults(filter) {
    const rows = document.querySelectorAll('.result-row');
    
    rows.forEach((row, index) => {
        row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        if (filter === 'all') {
            row.style.display = '';
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, index * 50);
        } else if (filter === 'leaders' && index < 3) {
            row.style.display = '';
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, index * 50);
        } else if (filter === 'rising') {
            const trend = row.querySelector('.trend-indicator');
            if (trend && trend.classList.contains('up')) {
                row.style.display = '';
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateX(0)';
                }, index * 50);
            } else {
                row.style.opacity = '0';
                row.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    row.style.display = 'none';
                }, 300);
            }
        } else if (filter === 'leaders' && index >= 3) {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                row.style.display = 'none';
            }, 300);
        }
    });
}

/* ==========================================================================
   Faction Interaction
   ========================================================================== */
function initFactionInteraction() {
    const nodes = document.querySelectorAll('.faculty-node');
    const bars = document.querySelectorAll('.balance-bar');
    const streamerCards = document.querySelectorAll('.streamer-card');
    
    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const faculty = node.dataset.faculty;
            highlightFaction(faculty);
        });
        
        node.addEventListener('mouseleave', () => {
            resetFactionHighlight();
        });
    });
    
    bars.forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            const faculty = bar.dataset.faculty;
            highlightFaction(faculty);
        });
        
        bar.addEventListener('mouseleave', () => {
            resetFactionHighlight();
        });
    });
    
    function highlightFaction(faculty) {
        // Highlight node
        nodes.forEach(n => {
            if (n.dataset.faculty === faculty) {
                n.style.opacity = '1';
                n.style.transform = `translate(-50%, -50%) rotate(${getComputedStyle(n).getPropertyValue('--angle')}) translateY(-230px) rotate(calc(-1 * ${getComputedStyle(n).getPropertyValue('--angle')})) scale(1.1)`;
            } else {
                n.style.opacity = '0.3';
            }
        });
        
        // Highlight bar
        bars.forEach(b => {
            if (b.dataset.faculty === faculty) {
                b.style.opacity = '1';
            } else {
                b.style.opacity = '0.3';
            }
        });
        
        // Highlight streamer cards
        streamerCards.forEach(card => {
            if (card.dataset.faculty === faculty) {
                card.style.opacity = '1';
                card.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
            } else {
                card.style.opacity = '0.3';
            }
        });
    }
    
    function resetFactionHighlight() {
        nodes.forEach(n => {
            n.style.opacity = '';
            n.style.transform = '';
        });
        
        bars.forEach(b => {
            b.style.opacity = '';
        });
        
        streamerCards.forEach(card => {
            card.style.opacity = '';
            card.style.boxShadow = '';
        });
    }
}

/* ==========================================================================
   Export Results
   ========================================================================== */
function initExport() {
    const exportBtn = document.getElementById('exportBtn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportResultsAsImage();
        });
    }
}

function exportResultsAsImage() {
    const table = document.querySelector('.parchment-scroll');
    
    if (!table) {
        alert('Таблица результатов не найдена');
        return;
    }
    
    // Create a simple text export for now
    const rows = document.querySelectorAll('.result-row');
    let text = 'BetBoom Streamers Battle 2026 - Результаты\n';
    text += '='.repeat(50) + '\n\n';
    
    rows.forEach(row => {
        const rank = row.querySelector('.rank-shield').textContent;
        const name = row.querySelector('.faculty-name').textContent;
        const score = row.querySelector('.score-value').textContent;
        const trend = row.querySelector('.trend-value').textContent;
        
        text += `${rank}. ${name} - ${score} очков (${trend})\n`;
    });
    
    // Download as text file
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'betboom-results-2026.txt';
    link.click();
    URL.revokeObjectURL(url);
    
    // Visual feedback
    const btn = document.getElementById('exportBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="btn-icon">✓</span><span>Сохранено!</span>';
    btn.style.background = 'rgba(0, 255, 136, 0.2)';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

/* ==========================================================================
   Mobile Results Cards
   ========================================================================== */
function initMobileResults() {
    const container = document.getElementById('resultsMobile');
    const rows = document.querySelectorAll('.result-row');
    
    if (!container) return;
    
    rows.forEach(row => {
        const card = document.createElement('div');
        card.className = 'result-card-mobile';
        card.dataset.faculty = row.dataset.faculty;
        
        const rankShield = row.querySelector('.rank-shield').cloneNode(true);
        const facultyCell = row.querySelector('.faculty-cell').cloneNode(true);
        const scoreValue = row.querySelector('.score-value').cloneNode(true);
        const trendIndicator = row.querySelector('.trend-indicator').cloneNode(true);
        const streamersAvatars = row.querySelector('.streamers-avatars').cloneNode(true);
        
        const facultyInfo = document.createElement('div');
        facultyInfo.className = 'faculty-info';
        facultyInfo.appendChild(facultyCell);
        
        const scoreSection = document.createElement('div');
        scoreSection.className = 'score-section';
        scoreSection.appendChild(scoreValue);
        scoreSection.appendChild(trendIndicator);
        
        card.appendChild(rankShield);
        card.appendChild(facultyInfo);
        card.appendChild(scoreSection);
        card.appendChild(streamersAvatars);
        
        container.appendChild(card);
    });
}

/* ==========================================================================
   Tooltips
   ========================================================================== */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(el => {
        const title = el.getAttribute('title');
        el.removeAttribute('title');
        el.dataset.tooltip = title;
        
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'magic-tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(10, 26, 42, 0.95);
        border: 1px solid var(--color-gold);
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 0.85rem;
        color: var(--text-primary);
        z-index: 10000;
        pointer-events: none;
        animation: tooltipAppear 0.2s ease-out;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top = rect.top - tooltipRect.height - 10;
    let left = rect.left + (rect.width - tooltipRect.width) / 2;
    
    if (top < 0) {
        top = rect.bottom + 10;
    }
    
    if (left < 0) {
        left = 10;
    } else if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
    
    e.target._tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        e.target._tooltip.remove();
        delete e.target._tooltip;
    }
}

/* ==========================================================================
   Score Update Animation (for future real-time updates)
   ========================================================================== */
function updateScore(element, newScore) {
    const currentScore = parseInt(element.dataset.score);
    const diff = newScore - currentScore;
    const duration = 1000;
    const steps = 30;
    const increment = diff / steps;
    let step = 0;
    
    element.classList.add('score-updating');
    element.closest('tr')?.classList.add('row-updating');
    
    const interval = setInterval(() => {
        step++;
        const current = Math.round(currentScore + (increment * step));
        element.textContent = current.toLocaleString('ru-RU');
        
        if (step >= steps) {
            clearInterval(interval);
            element.textContent = newScore.toLocaleString('ru-RU');
            element.dataset.score = newScore;
            
            setTimeout(() => {
                element.classList.remove('score-updating');
                element.closest('tr')?.classList.remove('row-updating');
            }, 500);
        }
    }, duration / steps);
}

/* ==========================================================================
   Vessel Sand Height Update (for future real-time updates)
   ========================================================================== */
function updateVesselHeight(faculty, percentage) {
    const vessel = document.querySelector(`.vessel-container[data-faculty="${faculty}"] .magic-sand`);
    
    if (vessel) {
        vessel.style.setProperty('--sand-height', `${percentage}%`);
    }
}

/* ==========================================================================
   Magic Cursor Trail (Optional Enhancement)
   ========================================================================== */
function initMagicCursor() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${10 - i}px;
            height: ${10 - i}px;
            background: rgba(212, 175, 55, ${0.5 - i * 0.05});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    let positions = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        positions.unshift({ x: mouseX, y: mouseY });
        
        if (positions.length > trailLength * 3) {
            positions.pop();
        }
        
        trail.forEach((dot, index) => {
            const pos = positions[index * 3] || positions[positions.length - 1];
            if (pos) {
                dot.style.left = pos.x + 'px';
                dot.style.top = pos.y + 'px';
            }
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

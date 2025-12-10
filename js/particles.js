/* ==========================================================================
   BetBoom Streamers Battle 2026 - Magic Particles System
   ========================================================================== */

class MagicParticles {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
        this.colors = [
            'rgba(212, 175, 55, 0.8)',   // Gold
            'rgba(116, 0, 1, 0.6)',       // Burgundy
            'rgba(93, 0, 255, 0.6)',      // Purple
            'rgba(0, 225, 255, 0.5)',     // Cyan
            'rgba(255, 255, 255, 0.8)'    // White
        ];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        // Create initial particles
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px ${color};
            filter: blur(${size / 4}px);
        `;
        
        const particleData = {
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -Math.random() * 0.5 - 0.2,
            size: size,
            life: Math.random() * 200 + 100,
            maxLife: 300,
            opacity: 1
        };
        
        particle.style.left = particleData.x + 'px';
        particle.style.top = particleData.y + 'px';
        
        this.container.appendChild(particle);
        this.particles.push(particleData);
    }
    
    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Fade out
        if (particle.life < 50) {
            particle.opacity = particle.life / 50;
        }
        
        // Reset if dead
        if (particle.life <= 0 || particle.y < -10) {
            particle.x = Math.random() * window.innerWidth;
            particle.y = window.innerHeight + 10;
            particle.life = Math.random() * 200 + 100;
            particle.opacity = 1;
            particle.vx = (Math.random() - 0.5) * 0.5;
            particle.vy = -Math.random() * 0.5 - 0.2;
        }
        
        // Wrap horizontally
        if (particle.x < -10) particle.x = window.innerWidth + 10;
        if (particle.x > window.innerWidth + 10) particle.x = -10;
        
        // Apply position
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        particle.element.style.opacity = particle.opacity;
    }
    
    animate() {
        this.particles.forEach(particle => this.updateParticle(particle));
        requestAnimationFrame(() => this.animate());
    }
}

class SparkleEffect {
    constructor() {
        this.sparkles = [];
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.9) {
                this.createSparkle(e.clientX, e.clientY);
            }
        });
    }
    
    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        
        sparkle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(212, 175, 55, 1) 0%, rgba(212, 175, 55, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            animation: sparkle 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }
}

class FloatingCandles {
    constructor(container) {
        this.container = container;
        this.candles = [];
        this.createCandles();
    }
    
    createCandles() {
        const positions = [
            { x: '5%', y: '60%' },
            { x: '10%', y: '70%' },
            { x: '85%', y: '55%' },
            { x: '92%', y: '65%' },
            { x: '3%', y: '80%' },
            { x: '95%', y: '75%' }
        ];
        
        positions.forEach((pos, index) => {
            this.createCandle(pos.x, pos.y, index);
        });
    }
    
    createCandle(x, y, index) {
        const candle = document.createElement('div');
        candle.className = 'floating-candle';
        
        candle.innerHTML = `
            <div class="candle-flame">
                <div class="flame-inner"></div>
                <div class="flame-glow"></div>
            </div>
            <div class="candle-body"></div>
        `;
        
        candle.style.cssText = `
            position: absolute;
            left: ${x};
            top: ${y};
            pointer-events: none;
            animation: candleFloat ${3 + index * 0.5}s ease-in-out infinite;
            animation-delay: ${index * 0.3}s;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .floating-candle {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .candle-flame {
                position: relative;
                width: 12px;
                height: 20px;
            }
            
            .flame-inner {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 8px;
                height: 16px;
                background: linear-gradient(to top, #ff6b00, #ffcc00, #fff);
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                animation: flameFlicker 0.3s ease-in-out infinite alternate;
            }
            
            .flame-glow {
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 30px;
                background: radial-gradient(circle, rgba(255, 200, 100, 0.6) 0%, transparent 70%);
                animation: glowPulse 2s ease-in-out infinite;
            }
            
            .candle-body {
                width: 10px;
                height: 30px;
                background: linear-gradient(to right, #e8d5a3, #f5e6c3, #e8d5a3);
                border-radius: 2px;
            }
            
            @keyframes candleFloat {
                0%, 100% {
                    transform: translateY(0) rotate(-2deg);
                }
                50% {
                    transform: translateY(-10px) rotate(2deg);
                }
            }
            
            @keyframes flameFlicker {
                0% {
                    transform: translateX(-50%) scaleX(1) scaleY(1);
                }
                100% {
                    transform: translateX(-50%) scaleX(0.9) scaleY(1.1);
                }
            }
        `;
        
        if (!document.querySelector('#candle-styles')) {
            style.id = 'candle-styles';
            document.head.appendChild(style);
        }
        
        this.container.appendChild(candle);
        this.candles.push(candle);
    }
}

class MagicDust {
    constructor() {
        this.dust = [];
        this.maxDust = 20;
        this.init();
    }
    
    init() {
        setInterval(() => {
            if (this.dust.length < this.maxDust) {
                this.createDust();
            }
        }, 500);
    }
    
    createDust() {
        const dust = document.createElement('div');
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 3 + 1;
        
        dust.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            z-index: 2;
            left: ${startX}px;
            top: ${window.innerHeight}px;
            box-shadow: 0 0 ${size * 2}px rgba(212, 175, 55, 0.5);
        `;
        
        document.body.appendChild(dust);
        this.dust.push(dust);
        
        this.animateDust(dust, startX);
    }
    
    animateDust(dust, startX) {
        let y = window.innerHeight;
        let x = startX;
        const speed = Math.random() * 2 + 1;
        const sway = Math.random() * 2;
        let angle = 0;
        
        const animate = () => {
            y -= speed;
            angle += 0.02;
            x = startX + Math.sin(angle) * sway * 20;
            
            dust.style.transform = `translate(${x - startX}px, ${y - window.innerHeight}px)`;
            dust.style.opacity = Math.min(1, (window.innerHeight - y) / 100);
            
            if (y > -10 && dust.parentNode) {
                requestAnimationFrame(animate);
            } else {
                dust.remove();
                const index = this.dust.indexOf(dust);
                if (index > -1) {
                    this.dust.splice(index, 1);
                }
            }
        };
        
        animate();
    }
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.getElementById('particles');
    
    if (particleContainer) {
        // Main floating particles
        new MagicParticles(particleContainer);
        
        // Sparkle effect on mouse move
        new SparkleEffect();
        
        // Magic dust rising effect
        new MagicDust();
    }
    
    // Add candles to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        new FloatingCandles(heroSection);
    }
});

// Add sparkle animation to stylesheet
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;
document.head.appendChild(sparkleStyle);

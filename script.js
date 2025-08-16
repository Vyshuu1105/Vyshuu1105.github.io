// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections and cards for reveal animation
document.querySelectorAll('section, .skill-card, .project-card').forEach(element => {
    element.classList.add('hidden');
    observer.observe(element);
});

// Progress bar animation for technical skills
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress-bar .progress');
    progressBars.forEach(progress => {
        const value = progress.getAttribute('data-value');
        progress.style.width = `${value}%`;
    });
}

// Circular progress animation with counter
function animateCircularProgress() {
    const circles = document.querySelectorAll('.progress-circle');
    
    const circleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const value = parseInt(circle.getAttribute('data-value'), 10);
                const progressElement = circle.querySelector('.progress');
                const valueDisplay = circle.querySelector('.progress-value');
                let currentValue = 0;
                
                const updateProgress = () => {
                    if (currentValue <= value) {
                        progressElement.style.setProperty('--progress', `${currentValue * 3.6}deg`);
                        if (valueDisplay) {
                            valueDisplay.textContent = `${currentValue}%`;
                        }
                        currentValue++;
                        requestAnimationFrame(updateProgress);
                    }
                };
                
                updateProgress();
                circleObserver.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });
    
    circles.forEach(circle => circleObserver.observe(circle));
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
    animateCircularProgress();
});
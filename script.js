// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Download functionality
document.addEventListener('DOMContentLoaded', function() {
    const androidDownloadBtn = document.getElementById('android-download');
    
    if (androidDownloadBtn) {
        androidDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show download modal or direct download
            showDownloadModal();
        });
    }
});

function showDownloadModal() {
    // Create modal for download options
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Download ColorWise APK</h3>
                <button class="modal-close" onclick="closeDownloadModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="download-options">
                    <div class="download-option">
                        <div class="option-icon">
                            <i class="fas fa-download"></i>
                        </div>
                        <div class="option-details">
                            <h4>Direct Download</h4>
                            <p>Opens Google Drive - click download button there</p>
                            <p class="file-info">ColorWise_v1.0.0.apk (45.2 MB)</p>
                        </div>
                        <button class="btn btn-primary" onclick="downloadAPK()">
                            <i class="fas fa-download"></i>
                            Download Now
                        </button>
                    </div>
                    
                    <div class="download-option">
                        <div class="option-icon">
                            <i class="fab fa-google-drive"></i>
                        </div>
                        <div class="option-details">
                            <h4>Google Drive</h4>
                            <p>View file details and download options</p>
                            <p class="file-info">Access original file and information</p>
                        </div>
                        <button class="btn btn-secondary" onclick="openGitHubReleases()">
                            <i class="fab fa-google-drive"></i>
                            View on Drive
                        </button>
                    </div>
                </div>
                
                <div class="security-notice">
                    <div class="notice-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="notice-text">
                        <strong>Security Notice:</strong> This APK is signed and verified. 
                        Always download from official sources to ensure your device's security.
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .download-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem;
                border-bottom: 1px solid #eee;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #333;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
                transition: color 0.3s ease;
            }
            
            .modal-close:hover {
                color: #333;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .download-options {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .download-option {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.5rem;
                border: 2px solid #eee;
                border-radius: 10px;
                transition: border-color 0.3s ease;
            }
            
            .download-option:hover {
                border-color: #667eea;
            }
            
            .option-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .option-details {
                flex: 1;
            }
            
            .option-details h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }
            
            .option-details p {
                margin: 0;
                color: #666;
            }
            
            .file-info {
                font-size: 0.875rem;
                color: #999;
                margin-top: 0.25rem !important;
            }
            
            .security-notice {
                display: flex;
                gap: 1rem;
                padding: 1rem;
                background: #f0f8ff;
                border: 1px solid #b3d9ff;
                border-radius: 8px;
                color: #0066cc;
            }
            
            .notice-icon {
                font-size: 1.25rem;
                flex-shrink: 0;
            }
            
            .notice-text {
                font-size: 0.875rem;
                line-height: 1.5;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .download-option {
                    flex-direction: column;
                    text-align: center;
                }
                
                .option-details {
                    margin-bottom: 1rem;
                }
                
                .modal-body {
                    padding: 1rem;
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

function closeDownloadModal() {
    const modal = document.querySelector('.download-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function downloadAPK() {
    // Open Google Drive file in new tab - this works from any domain
    const googleDriveUrl = 'https://drive.google.com/file/d/1cqwe0lwBylxct_URUgNVc8iCJJqC41Qt/view?usp=sharing';
    
    // Open the Google Drive link directly - users can download from there
    window.open(googleDriveUrl, '_blank');
    
    // Show instruction toast
    showToast('Redirected to Google Drive. Click the download button there.');
    
    closeDownloadModal();
}

function openGitHubReleases() {
    // Open Google Drive folder for releases
    window.open('https://drive.google.com/file/d/1cqwe0lwBylxct_URUgNVc8iCJJqC41Qt/view?usp=sharing', '_blank');
    closeDownloadModal();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .download-card, .metric');
    animatedElements.forEach(el => observer.observe(el));
});

// Performance metrics animation
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-fill');
    
    metrics.forEach(metric => {
        const width = metric.style.width;
        metric.style.width = '0';
        
        setTimeout(() => {
            metric.style.width = width;
        }, 500);
    });
}

// Trigger metrics animation when section is in view
const metricsSection = document.querySelector('.performance-metrics');
if (metricsSection) {
    const metricsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetrics();
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metricsObserver.observe(metricsSection);
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Handle broken images
            this.style.display = 'none';
        });
    });
});

// Copy to clipboard functionality (for sharing)
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showToast('Link copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Link copied to clipboard!');
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: toastSlide 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
    
    // Add toast animation if not present
    if (!document.querySelector('#toast-styles')) {
        const toastStyles = document.createElement('style');
        toastStyles.id = 'toast-styles';
        toastStyles.textContent = `
            @keyframes toastSlide {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(toastStyles);
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDownloadModal();
    }
});

// Add scroll-to-top functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 500) {
        if (!document.querySelector('.scroll-top')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-top';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
                animation: fadeInUp 0.3s ease;
            `;
            
            scrollBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            scrollBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
            });
            
            scrollBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            });
            
            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-top');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});

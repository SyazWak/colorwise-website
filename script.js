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
                <h3>Join ColorWise Beta Testing</h3>
                <button class="modal-close" onclick="closeDownloadModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="beta-info">
                    <div class="beta-notice">
                        <div class="notice-icon">
                            <i class="fas fa-flask"></i>
                        </div>
                        <div class="notice-text">
                            <strong>Beta Testing Program:</strong> ColorWise is currently in internal testing on Google Play. 
                            To access the app, we need to add your email to our testing group.
                        </div>
                    </div>
                    
                    <div class="email-form">
                        <h4>Request Beta Access</h4>
                        <p>Enter your email address to join our beta testing program:</p>
                        <form id="beta-signup-form" onsubmit="submitBetaRequest(event)">
                            <div class="form-group">
                                <label for="tester-email">Email Address:</label>
                                <input type="email" id="tester-email" name="email" required 
                                       placeholder="your.email@example.com" class="email-input">
                            </div>
                            <div class="form-group">
                                <label for="tester-reason">Why do you want to test ColorWise? (Optional):</label>
                                <textarea id="tester-reason" name="reason" rows="3" 
                                         placeholder="Tell us about your interest in color vision assistance..."
                                         class="reason-input"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary beta-submit-btn">
                                <i class="fas fa-paper-plane"></i>
                                Request Beta Access
                            </button>
                        </form>
                    </div>
                    
                    <div class="process-steps">
                        <h4>How it works:</h4>
                        <ol class="steps-list">
                            <li>Submit your email using the form above</li>
                            <li>We'll add you to our Google Play testing group (within 24 hours)</li>
                            <li>You'll receive an email invitation to join the beta</li>
                            <li>Accept the invitation and download from Google Play Store</li>
                        </ol>
                    </div>
                    
                    <div class="alternative-download">
                        <h4>Alternative: Direct APK Download</h4>
                        <p>Prefer to download the APK directly? You can also get it from Google Drive:</p>
                        <button class="btn btn-secondary" onclick="downloadFromGoogleDrive()">
                            <i class="fab fa-google-drive"></i>
                            Download from Google Drive
                        </button>
                    </div>
                </div>
                
                <div class="security-notice">
                    <div class="notice-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="notice-text">
                        <strong>Privacy Notice:</strong> Your email will only be used for beta testing purposes 
                        and will not be shared with third parties.
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
            
            .beta-info {
                margin-bottom: 2rem;
            }
            
            .beta-notice {
                display: flex;
                gap: 1rem;
                padding: 1rem;
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                color: #856404;
                margin-bottom: 2rem;
            }
            
            .email-form {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 10px;
                margin-bottom: 2rem;
            }
            
            .email-form h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }
            
            .email-form p {
                margin: 0 0 1rem 0;
                color: #666;
            }
            
            .form-group {
                margin-bottom: 1rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                color: #333;
                font-weight: 500;
            }
            
            .email-input, .reason-input {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
                box-sizing: border-box;
            }
            
            .email-input:focus, .reason-input:focus {
                outline: none;
                border-color: #667eea;
            }
            
            .beta-submit-btn {
                width: 100%;
                margin-top: 0.5rem;
            }
            
            .process-steps {
                background: #e8f4fd;
                padding: 1.5rem;
                border-radius: 10px;
                margin-bottom: 2rem;
            }
            
            .process-steps h4 {
                margin: 0 0 1rem 0;
                color: #333;
            }
            
            .steps-list {
                margin: 0;
                padding-left: 1.5rem;
                color: #666;
            }
            
            .steps-list li {
                margin-bottom: 0.5rem;
                line-height: 1.5;
            }
            
            .alternative-download {
                background: #f0f8ff;
                padding: 1.5rem;
                border-radius: 10px;
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .alternative-download h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }
            
            .alternative-download p {
                margin: 0 0 1rem 0;
                color: #666;
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

function submitBetaRequest(event) {
    event.preventDefault();
    
    const email = document.getElementById('tester-email').value;
    const reason = document.getElementById('tester-reason').value;
    
    // Here you would typically send this to your backend or email service
    // For now, we'll show instructions to manually add the tester
    
    // Create a mailto link for easy email composition
    const subject = encodeURIComponent('ColorWise Beta Testing Request');
    const body = encodeURIComponent(`
New Beta Testing Request:

Email: ${email}
Reason: ${reason || 'Not provided'}

Please add this email to the Google Play Console internal testing group for ColorWise.

---
This request was submitted via the ColorWise website.
    `);
    
    // You can replace this email with your actual email
    const mailtoLink = `mailto:colorwiseapp@gmail.com?subject=${subject}&body=${body}`;
    
    // Show success message first
    showSuccessMessage(email, mailtoLink);
    
    // Automatically open email client
    try {
        window.open(mailtoLink, '_blank');
    } catch (error) {
        console.log('Email client not available');
    }
}

function showSuccessMessage(email, mailtoLink) {
    const modal = document.querySelector('.download-modal .modal-body');
    modal.innerHTML = `
        <div class="success-message">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Beta Request Ready!</h3>
            <p>Your beta testing request has been prepared for:</p>
            <div class="submitted-email">${email}</div>
            
            <div class="email-actions">
                <h4>Send Your Request:</h4>
                <p>We've prepared an email for you. Choose how to send it:</p>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="window.open('${mailtoLink}', '_blank')">
                        <i class="fas fa-envelope"></i>
                        Open Email Client
                    </button>
                    <button class="btn btn-secondary" onclick="copyEmailDetails('${email}')">
                        <i class="fas fa-copy"></i>
                        Copy Email Details
                    </button>
                </div>
            </div>
            
            <div class="manual-email-info">
                <h4>Manual Email Option:</h4>
                <div class="email-details">
                    <p><strong>To:</strong> colorwiseapp@gmail.com</p>
                    <p><strong>Subject:</strong> ColorWise Beta Testing Request</p>
                    <p><strong>Message:</strong></p>
                    <div class="email-body">
                        New Beta Testing Request:<br><br>
                        Email: ${email}<br>
                        Reason: ${document.getElementById('tester-reason')?.value || 'Not provided'}<br><br>
                        Please add this email to the Google Play Console internal testing group for ColorWise.<br><br>
                        ---<br>
                        This request was submitted via the ColorWise website.
                    </div>
                </div>
            </div>
            
            <div class="next-steps">
                <h4>What happens next:</h4>
                <ol>
                    <li><strong>Send the email:</strong> Use one of the options above to send your request</li>
                    <li><strong>Processing:</strong> We'll add your email to our Google Play testing group within 24 hours</li>
                    <li><strong>Invitation:</strong> You'll receive an email from Google Play Console</li>
                    <li><strong>Accept:</strong> Click the invitation link to join the beta program</li>
                    <li><strong>Download:</strong> Install ColorWise directly from the Google Play Store</li>
                </ol>
            </div>
            
            <div class="contact-info">
                <p><strong>Questions?</strong> Contact us at: <a href="mailto:colorwiseapp@gmail.com">colorwiseapp@gmail.com</a></p>
            </div>
            
            <button class="btn btn-primary" onclick="closeDownloadModal()">
                <i class="fas fa-check"></i>
                Got it!
            </button>
        </div>
        
        <style>
            .success-message {
                text-align: center;
                padding: 2rem 1rem;
            }
            
            .success-icon {
                font-size: 4rem;
                color: #28a745;
                margin-bottom: 1rem;
            }
            
            .success-message h3 {
                color: #333;
                margin-bottom: 1rem;
            }
            
            .submitted-email {
                background: #e8f4fd;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                font-weight: 600;
                color: #0066cc;
                margin: 1rem 0;
                display: inline-block;
            }
            
            .email-actions {
                background: #fff3cd;
                padding: 1.5rem;
                border-radius: 10px;
                margin: 1.5rem 0;
            }
            
            .email-actions h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }
            
            .email-actions p {
                margin: 0 0 1rem 0;
                color: #666;
            }
            
            .action-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .manual-email-info {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 10px;
                margin: 1.5rem 0;
                text-align: left;
            }
            
            .manual-email-info h4 {
                margin: 0 0 1rem 0;
                color: #333;
                text-align: center;
            }
            
            .email-details p {
                margin: 0.5rem 0;
                color: #333;
            }
            
            .email-body {
                background: #e9ecef;
                padding: 1rem;
                border-radius: 5px;
                font-family: monospace;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                white-space: pre-line;
            }
            
            .next-steps {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 10px;
                margin: 1.5rem 0;
                text-align: left;
            }
            
            .next-steps h4 {
                margin: 0 0 1rem 0;
                color: #333;
                text-align: center;
            }
            
            .next-steps ol {
                margin: 0;
                padding-left: 1.5rem;
            }
            
            .next-steps li {
                margin-bottom: 0.75rem;
                line-height: 1.5;
            }
            
            .contact-info {
                margin: 1.5rem 0;
                padding: 1rem;
                background: #e8f4fd;
                border-radius: 8px;
            }
            
            .contact-info a {
                color: #0066cc;
                text-decoration: none;
            }
            
            .contact-info a:hover {
                text-decoration: underline;
            }
        </style>
    `;
}

function downloadFromGoogleDrive() {
    // Open Google Drive file in new tab
    const googleDriveUrl = 'https://drive.google.com/file/d/1cqwe0lwBylxct_URUgNVc8iCJJqC41Qt/view?usp=sharing';
    
    // Open the Google Drive link directly
    window.open(googleDriveUrl, '_blank');
    
    // Show instruction toast
    showToast('Redirected to Google Drive. Click the download button there.');
    
    closeDownloadModal();
}

function copyEmailDetails(email) {
    const reason = document.getElementById('tester-reason')?.value || 'Not provided';
    const emailContent = `To: colorwiseapp@gmail.com
Subject: ColorWise Beta Testing Request

New Beta Testing Request:

Email: ${email}
Reason: ${reason}

Please add this email to the Google Play Console internal testing group for ColorWise.

---
This request was submitted via the ColorWise website.`;

    copyToClipboard(emailContent);
    showToast('Email details copied! You can paste this into any email client.');
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

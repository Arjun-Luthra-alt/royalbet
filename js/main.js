/**
 * main.js — reads from js/config.js and populates site-wide values.
 * Handles theme toggle, dynamic modals, toast notifications, floating WhatsApp,
 * interactive betting slip, FAQ accordions, and credential copying.
 */
document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------
    // 1. Populate values from SITE_CONFIG
    // ----------------------------------------------------------
    if (typeof SITE_CONFIG !== 'undefined') {
        
        // Site name
        document.querySelectorAll('[data-config="siteName"]').forEach(el => {
            el.textContent = SITE_CONFIG.siteName;
        });

        // WhatsApp links
        document.querySelectorAll('[data-config="whatsappLink"]').forEach(el => {
            el.href = SITE_CONFIG.whatsappLink;
        });

        // WhatsApp display number
        document.querySelectorAll('[data-config="whatsapp"]').forEach(el => {
            el.textContent = SITE_CONFIG.whatsapp;
        });

        // Email
        document.querySelectorAll('[data-config="email"]').forEach(el => {
            el.textContent = SITE_CONFIG.email;
            if (el.tagName === 'A') el.href = 'mailto:' + SITE_CONFIG.email;
        });

        // Social links
        if (SITE_CONFIG.social) {
            const socials = ['facebook', 'instagram', 'telegram', 'twitter'];
            socials.forEach(platform => {
                const el = document.querySelector(`[data-config="${platform}"]`);
                if (el && SITE_CONFIG.social[platform]) el.href = SITE_CONFIG.social[platform];
            });
        }

        // Footer copyright & disclaimer
        document.querySelectorAll('[data-config="copyright"]').forEach(el => {
            el.textContent = SITE_CONFIG.copyright;
        });
        document.querySelectorAll('[data-config="footerDisclaimer"]').forEach(el => {
            el.textContent = SITE_CONFIG.footerDisclaimer;
        });

        // Stats
        if (SITE_CONFIG.stats) {
            ['users', 'withdrawalTime', 'yearsActive'].forEach(key => {
                document.querySelectorAll(`[data-config="${key}"]`).forEach(el => {
                    el.textContent = SITE_CONFIG.stats[key];
                });
            });
        }
    }

    // ----------------------------------------------------------
    // 2. Theme Toggle Logic
    // ----------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // ----------------------------------------------------------
    // 3. Mobile Navigation Menu Toggle
    // ----------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Sticky header shadow
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Update current year in footer
    const yearElem = document.getElementById('current-year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // ----------------------------------------------------------
    // 4. Inject Floating WhatsApp Quick Action Button
    // ----------------------------------------------------------
    if (!document.querySelector('.floating-whatsapp')) {
        const waBtn = document.createElement('a');
        waBtn.className = 'floating-whatsapp';
        waBtn.href = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappLink) ? SITE_CONFIG.whatsappLink : 'https://wa.me/911234567890';
        waBtn.target = '_blank';
        waBtn.setAttribute('title', 'Get Instant ID on WhatsApp');
        waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(waBtn);
    }

    // ----------------------------------------------------------
    // 5. Toast Notification Utility
    // ----------------------------------------------------------
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    window.showToast = function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
        toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 50);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    };

    // ----------------------------------------------------------
    // 6. Global Login / Signup Modal System
    // ----------------------------------------------------------
    const modalHTML = `
        <div class="modal-overlay" id="auth-modal">
            <div class="modal-container">
                <button class="modal-close" id="modal-close-btn">&times;</button>
                <div class="modal-tabs">
                    <button class="modal-tab active" data-tab="login">Member Login</button>
                    <button class="modal-tab" data-tab="signup">Get Instant ID</button>
                </div>
                
                <div class="tab-content" id="tab-login">
                    <h3 style="margin-bottom: 1rem; color: var(--color-gold-main);">Welcome Back</h3>
                    <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">Access your verified exchange account or try our free demo IDs.</p>
                    
                    <form id="auth-login-form">
                        <div class="form-group" style="margin-bottom: 1.2rem;">
                            <label style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 5px;">Username / Phone Number</label>
                            <input type="text" class="form-control" placeholder="e.g. demo123 or +91..." required>
                        </div>
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 5px;">Password</label>
                            <input type="password" class="form-control" placeholder="••••••••" required>
                        </div>
                        <button type="submit" class="btn btn-gold" style="width: 100%; font-size: 1rem;">Log In</button>
                    </form>
                    
                    <div style="margin-top: 1.5rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                        <p style="font-size: 0.85rem; color: var(--color-text-muted);">Don't have an ID yet?</p>
                        <a href="${typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.whatsappLink : '#'}" target="_blank" class="btn btn-primary" style="margin-top: 10px; width: 100%; font-size: 0.9rem;">
                            <i class="fab fa-whatsapp"></i> Get New ID on WhatsApp
                        </a>
                    </div>
                </div>

                <div class="tab-content" id="tab-signup" style="display: none;">
                    <h3 style="margin-bottom: 1rem; color: var(--color-gold-main);">Get New Betting ID</h3>
                    <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">Instant activation within 2 minutes via WhatsApp customer desk.</p>
                    
                    <div style="background: rgba(212, 168, 67, 0.1); border: 1px dashed var(--color-gold-main); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                        <ul style="font-size: 0.85rem; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 8px;">
                            <li><i class="fas fa-bolt text-gold"></i> Instant 2-Minute Deposit & Withdrawal</li>
                            <li><i class="fas fa-shield-alt text-gold"></i> 100% Safe & Confidential</li>
                            <li><i class="fas fa-gift text-red"></i> 10% Welcome Bonus on First Deposit</li>
                        </ul>
                    </div>

                    <a href="${typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.whatsappLink : '#'}" target="_blank" class="btn btn-primary" style="width: 100%; font-size: 1rem; padding: 1rem;">
                        <i class="fab fa-whatsapp"></i> Connect to WhatsApp Manager
                    </a>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const authModal = document.getElementById('auth-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    // Attach click triggers to all "Login / Sign Up" buttons
    document.querySelectorAll('a[href="#"], button').forEach(el => {
        if (el.textContent.includes('Login') || el.textContent.includes('Sign Up')) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                if (authModal) authModal.classList.add('active');
            });
        }
    });

    if (closeBtn && authModal) {
        closeBtn.addEventListener('click', () => authModal.classList.remove('active'));
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) authModal.classList.remove('active');
        });
    }

    // Modal Tabs toggle
    const tabs = document.querySelectorAll('.modal-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById('tab-login').style.display = target === 'login' ? 'block' : 'none';
            document.getElementById('tab-signup').style.display = target === 'signup' ? 'block' : 'none';
        });
    });

    // Handle Login Form Submit Simulation
    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            authModal.classList.remove('active');
            window.showToast('Login Successful! Welcome to RoyalBet', 'success');
        });
    }

    // ----------------------------------------------------------
    // 7. Copy Demo Credentials Functionality
    // ----------------------------------------------------------
    document.querySelectorAll('.copy-demo-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const pass = btn.getAttribute('data-pass');
            const textToCopy = `Demo ID: ${id} | Password: ${pass}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                window.showToast(`Credentials copied: ${id}`, 'success');
            }).catch(() => {
                window.showToast(`Demo ID: ${id} / Pass: ${pass}`, 'info');
            });
        });
    });

    // ----------------------------------------------------------
    // 8. FAQ Accordion Toggle
    // ----------------------------------------------------------
    document.querySelectorAll('.faq-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

});

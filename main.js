document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const enrollmentForm = document.getElementById('enrollmentForm');
    const formSuccess = document.getElementById('formSuccess');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form Submission Handling
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(enrollmentForm);
            const data = Object.fromEntries(formData.entries());

            // Animation for button
            const btn = enrollmentForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;

            // Simulate API call / Storage
            setTimeout(() => {
                console.log('Inscripción recibida:', data);

                // Success State
                enrollmentForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // OPTION: Save to LocalStorage for demonstration
                let leads = JSON.parse(localStorage.getItem('tov_leads') || '[]');
                leads.push({ ...data, date: new Date().toLocaleString() });
                localStorage.setItem('tov_leads', JSON.stringify(leads));
            }, 1500);
        });
    }

    // Mobile Menu Toggle (Basic)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Ideally toggle a class for a mobile menu overlay
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#fff';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    }
});

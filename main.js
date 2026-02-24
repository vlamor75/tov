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
        enrollmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(enrollmentForm);

            // Animation for button
            const btn = enrollmentForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;

            try {
                // URL DE GOOGLE SHEETS CONECTADA
                const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx0PyOLTc4EHB0BstWaQ1fBLKGDuYXOAujn95OHhe4zhel9k5XIzH6fyKnm-hYS3KPu/exec';

                await fetch(GOOGLE_SHEET_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });

                console.log('Inscripción enviada con éxito a Google Sheets');

                // Mostramos mensaje de éxito
                enrollmentForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Guardamos localmente también como respaldo
                const data = Object.fromEntries(formData.entries());
                let leads = JSON.parse(localStorage.getItem('tov_leads') || '[]');
                leads.push({ ...data, date: new Date().toLocaleString() });
                localStorage.setItem('tov_leads', JSON.stringify(leads));

            } catch (error) {
                console.error('Error al enviar:', error);
                alert('Hubo un problema al enviar tu inscripción. Por favor intenta de nuevo.');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
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

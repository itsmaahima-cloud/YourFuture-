// Set current year
    document.getElementById('year').textContent = new Date().getFullYear();

    (function(){
      // Pre-loader
      window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
          setTimeout(() => {
            preloader.classList.add('is-loaded');
          }, 200);
        }
      });

      // scroll animations
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));
      }

      // Responsive menu toggle
      const menuToggle = document.getElementById('menu-toggle');
      const mainNav = document.getElementById('main-nav');
      if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
          mainNav.classList.toggle('is-open');
          menuToggle.classList.toggle('is-open');
          const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
          menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
      }

      // form behaviour
      const form = document.getElementById('bookingForm');
      const formMsg = document.getElementById('formMsg');
      const clearBtn = document.getElementById('clearBtn');

      clearBtn.addEventListener('click', ()=> form.reset());

      form.addEventListener('submit', async function(e){
        e.preventDefault();
        formMsg.textContent = '';
        // honeypot
        if(form.website && form.website.value){ formMsg.textContent = 'Bot detected. Submission blocked.'; return; }
        // basic validation
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const service = form.service.value;
        const notes = form.notes.value.trim();
        if(!name || !email || !service || !notes){ formMsg.textContent = 'Please fill required fields.'; return; }
        formMsg.textContent = 'Sending...';
        try{
          // Replace URL with your serverless endpoint (Netlify/AWS/GCP). This is a placeholder.
          const res = await fetch('https://example.com/book', {
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({name,email,service,notes,dob:form.dob.value,phone:form.phone.value})
          });
          if(res.ok){ formMsg.textContent = 'Thanks — we received your booking. Check email for details.'; form.reset(); }
          else{ formMsg.textContent = 'Server error — please try again later.'; }
        }catch(err){ console.error(err); formMsg.textContent = 'Network error — please try again later.'; }
      });

      // accessibility: close menus with Escape in future (placeholder)
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ /* close menus if any */ } });
    })();
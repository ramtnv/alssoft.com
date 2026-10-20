// ==========================================================================
// Abacus Logistics Solutions (ALS) - Interactive Modern Script
// 100% Standalone Vanilla JavaScript - Zero build tools or npm dependencies
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // 2. Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 350) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Scroll Animation via IntersectionObserver
  const observers = document.querySelectorAll('.fade-in-up');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    );
    observers.forEach((el) => observer.observe(el));
  } else {
    observers.forEach((el) => el.classList.add('show'));
  }

  // 4. Auto-close mobile navbar on link click
  document.querySelectorAll('#mainNavbar a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const navCollapse = document.getElementById('mainNavbar');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const toggler = document.querySelector('[data-bs-target="#mainNavbar"]');
        if (toggler) toggler.click();
      }
    });
  });

  // 5. Back to Top Button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Interactive Hero Pipeline Step Cycler
  const pipelineSteps = document.querySelectorAll('.pipeline-step');
  if (pipelineSteps.length > 0 && !reduceMotion) {
    let currentStep = 1;
    setInterval(() => {
      pipelineSteps.forEach((s) => s.classList.remove('active'));
      currentStep = (currentStep + 1) % pipelineSteps.length;
      pipelineSteps[currentStep]?.classList.add('active');
    }, 3200);
  }

  // 7. Clientele Expand / Collapse Toggle
  const clientToggleBtn = document.getElementById('clientToggleBtn');
  const hiddenClients = document.querySelectorAll('.client-hidden-item');
  if (clientToggleBtn && hiddenClients.length > 0) {
    let isExpanded = false;
    clientToggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      hiddenClients.forEach((el) => {
        el.classList.toggle('d-none', !isExpanded);
      });
      clientToggleBtn.innerHTML = isExpanded
        ? 'Show Featured Clients (18) <span class="ms-1">↑</span>'
        : 'View All 67 Client Institutions <span class="ms-1">↓</span>';
    });
  }

  // 8. Contact Form Topic Pills Selection
  const topicPills = document.querySelectorAll('.topic-pill');
  const messageInput = document.getElementById('enquiryMessage');
  topicPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      topicPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const topic = pill.getAttribute('data-topic');
      if (messageInput && topic) {
        messageInput.placeholder = `Tell us about your requirements for ${topic}...`;
        messageInput.focus();
      }
    });
  });

  // 9. Contact Form Interactive Feedback (Mock Submission)
  const contactForm = document.getElementById('enquiryForm');
  const formSuccess = document.getElementById('formSuccessNotice');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeTopic = document.querySelector('.topic-pill.active')?.getAttribute('data-topic') || 'General';
      if (formSuccess) {
        formSuccess.classList.remove('d-none');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      contactForm.reset();
      topicPills.forEach((p) => p.classList.remove('active'));
      document.querySelector('.topic-pill')?.classList.add('active');
    });
  }
});

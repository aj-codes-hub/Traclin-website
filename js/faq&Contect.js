
  const faqs = [
    {
      id: 1,
      question: "Can my system be cloud-based?",
      answer: "We offer secure, 24/7 cloud recording options to help eliminate the need for additional hardware, and also provide access to live and recorded video clips.",
    },
    {
      id: 2,
      question: "What analytics features do your cameras have?",
      answer: "Our cameras feature advanced analytics including motion detection, facial recognition, object tracking, heat mapping, and people counting to give you deep insights into your space.",
    },
    {
      id: 3,
      question: "What are the different types of security cameras?",
      answer: "We offer a range of cameras including dome cameras, bullet cameras, PTZ cameras, fisheye cameras, and covert cameras — each suited to different environments and use cases.",
    },
    {
      id: 4,
      question: "Which is best security cameras for me?",
      answer: "The best camera depends on your environment, coverage needs, and budget. Our team can help recommend the right solution after a quick assessment of your property.",
    },
    {
      id: 5,
      question: "Can I use this template for commercial purposes?",
      answer: "Yes, our templates are available for commercial use. Once purchased, you can use them for any number of commercial projects without additional licensing fees.",
    },
    {
      id: 6,
      question: "Will there be updates related to the store?",
      answer: "Yes! We regularly update our templates and you'll receive all future updates for free. We also send newsletters about new additions and improvements.",
    },
  ];

  const chevronDown = `<svg xmlns="http://www.w3.org/2000/svg" class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
  const chevronRight = `<svg xmlns="http://www.w3.org/2000/svg" class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

  function createFaqCard(item) {
    const card = document.createElement('div');
    card.className = 'faq-card';
    card.innerHTML = `
      <div style="padding: 44px 32px 46px;">
        <div class="d-flex align-items-center text-start gap-3 faq-trigger" style="cursor: pointer; user-select: none;" role="button" aria-expanded="false">
          <span class="faq-icon-q d-lg-none" style="flex-shrink: 0;">?</span>
          <span class="faq-question" style="flex: 1;">${item.question}</span>
          <span class="chevron-icon" style="flex-shrink: 0;">${chevronRight}</span>
        </div>
        <div class="faq-answer">
          <p class="mb-0">${item.answer}</p>
        </div>
      </div>
    `;

    const answer = card.querySelector('.faq-answer');
    const chevron = card.querySelector('.chevron-icon');
    const trigger = card.querySelector('.faq-trigger');

    const toggleFaq = () => {
      const isOpen = answer.classList.contains('show');
      if (isOpen) {
        answer.classList.remove('show');
        chevron.innerHTML = chevronRight;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        answer.classList.add('show');
        chevron.innerHTML = chevronDown;
        trigger.setAttribute('aria-expanded', 'true');
      }
    };

    trigger.addEventListener('click', toggleFaq);

    return card;
  }

  function initFaq() {
    const mobileContainer = document.getElementById('faq-mobile');
    const leftCol = document.getElementById('faq-left');
    const rightCol = document.getElementById('faq-right');
    const desktopWrapper = document.getElementById('faq-desktop');

    faqs.forEach((item) => {
      mobileContainer.appendChild(createFaqCard(item));
    });

    faqs.forEach((item, i) => {
      const card = createFaqCard(item);
      card.classList.add('mb-4');
      if (i % 2 === 0) leftCol.appendChild(card);
      else rightCol.appendChild(card);
    });

    function toggleLayout() {
      const isDesktop = window.innerWidth >= 992;
      desktopWrapper.style.display = isDesktop ? 'block' : 'none';
      mobileContainer.style.display = isDesktop ? 'none' : 'flex';
    }

    toggleLayout();
    window.addEventListener('resize', toggleLayout);
  }


  function initContact() {
    const fields = ['firstName', 'lastName', 'email', 'message'];

    function getVal(id) {
      return document.getElementById(id).value.trim();
    }

    function setError(field, msg) {
      const input = document.getElementById(field);
      const err = document.getElementById('err-' + field);
      input.classList.add('is-error');
      err.textContent = msg;
      err.classList.remove('d-none');
    }

    function clearError(field) {
      const input = document.getElementById(field);
      const err = document.getElementById('err-' + field);
      input.classList.remove('is-error');
      err.classList.add('d-none');
    }

    function validate() {
      let valid = true;
      fields.forEach(f => clearError(f));

      if (!getVal('firstName')) { setError('firstName', 'First name is required.'); valid = false; }
      if (!getVal('lastName')) { setError('lastName', 'Last name is required.'); valid = false; }

      const email = getVal('email');
      if (!email) { setError('email', 'Email address is required.'); valid = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Please enter a valid email address.'); valid = false; }

      const msg = getVal('message');
      if (!msg) { setError('message', 'Message is required.'); valid = false; }
      else if (msg.length < 10) { setError('message', 'Message must be at least 10 characters.'); valid = false; }

      return valid;
    }

    fields.forEach(f => {
      document.getElementById(f).addEventListener('input', () => clearError(f));
    });

    document.getElementById('contact-submit').addEventListener('click', function () {
      if (!validate()) return;
      const btn = this;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Sending...';
      setTimeout(() => {
        document.getElementById('contact-form').classList.add('d-none');
        document.getElementById('contact-success').classList.remove('d-none');
        btn.disabled = false;
        btn.innerHTML = 'Send Message';
      }, 1200);
    });

    document.getElementById('contact-reset').addEventListener('click', () => {
      fields.forEach(f => {
        document.getElementById(f).value = '';
        clearError(f);
      });
      document.getElementById('contact-success').classList.add('d-none');
      document.getElementById('contact-form').classList.remove('d-none');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFaq();
    initContact();
  });
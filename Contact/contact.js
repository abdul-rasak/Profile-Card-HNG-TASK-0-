document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const fields = {
    name: {
      el: document.querySelector('[data-testid="test-contact-name"]'),
      err: document.querySelector('[data-testid="test-contact-error-name"]'),
      validate: v => v.trim() !== '' || 'Full name is required.'
    },
    email: {
      el: document.querySelector('[data-testid="test-contact-email"]'),
      err: document.querySelector('[data-testid="test-contact-error-email"]'),
      validate: v => {
        if (v.trim() === '') return 'Email is required.';
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(v) || 'Please enter a valid email (name@example.com).';
      }
    },
    subject: {
      el: document.querySelector('[data-testid="test-contact-subject"]'),
      err: document.querySelector('[data-testid="test-contact-error-subject"]'),
      validate: v => v.trim() !== '' || 'Subject is required.'
    },
    message: {
      el: document.querySelector('[data-testid="test-contact-message"]'),
      err: document.querySelector('[data-testid="test-contact-error-message"]'),
      validate: v => v.trim().length >= 10 || 'Message must be at least 10 characters.'
    }
  };

  const successEl = document.querySelector('[data-testid="test-contact-success"]');

  function clearErrors() {
    Object.values(fields).forEach(f => {
      f.err.textContent = '';
      f.el.removeAttribute('aria-invalid');
    });
    successEl.hidden = true;
  }

  function focusFirstInvalid() {
    for (const key in fields) {
      if (fields[key].el.getAttribute('aria-invalid') === 'true') {
        fields[key].el.focus();
        return;
      }
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let hasError = false;
    for (const key in fields) {
      const f = fields[key];
      const value = f.el.value;
      const result = f.validate(value);
      if (result !== true) {
        hasError = true;
        f.err.textContent = result;
        f.el.setAttribute('aria-invalid', 'true');
      }
    }

    if (hasError) {
      focusFirstInvalid();
      return;
    }

    // On success: show success message (no real network call here)
    successEl.hidden = false;
    successEl.textContent = 'Thank you — your message was sent.';
    form.reset();
    form.querySelector('[data-testid="test-contact-name"]').focus();
  });

  // Live validation (optional, keyboard accessible)
  Object.values(fields).forEach(f => {
    f.el.addEventListener('input', () => {
      const r = f.validate(f.el.value);
      if (r === true) {
        f.err.textContent = '';
        f.el.removeAttribute('aria-invalid');
      } else {
        f.err.textContent = r;
        f.el.setAttribute('aria-invalid', 'true');
      }
    });
  });
});
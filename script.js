/**
 * Placement Portfolio JavaScript - Harshitha M
 * Features:
 * - Dynamic Profile Photo Upload & LocalStorage Persistence
 * - Major Project Detailed Modal & Tab Switching
 * - Project Screenshot Uploader & Interactive Mockups
 * - Resume Download & Viewer Handlers
 * - Theme Switcher (Navy Dark / Professional Crisp Light)
 * - Navigation ScrollSpy & Mobile Drawer
 * - Contact Form & Copy-to-Clipboard Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------------
  // 1. THEME SWITCHER (NAVY DARK / CRISP LIGHT)
  // -----------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('portfolio_theme') || (prefersDark ? 'dark' : 'dark'); // Default to sleek Navy Dark

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'light' ? 'Light' : 'Navy Blue'} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'light' 
      ? '<i class="fa-solid fa-moon"></i>' 
      : '<i class="fa-solid fa-sun"></i>';
    themeToggleBtn.setAttribute('title', `Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`);
  }

  // -----------------------------------------------------------------
  // 2. STICKY NAVBAR & MOBILE MENU TOGGLE
  // -----------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggleBtn.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // -----------------------------------------------------------------
  // 3. SCROLLSPY (ACTIVE LINK HIGHLIGHTING)
  // -----------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  // -----------------------------------------------------------------
  // 4. PROFILE PHOTO UPLOADER & LOCAL STORAGE PERSISTENCE
  // -----------------------------------------------------------------
  const photoUploadInput = document.getElementById('photoUploadInput');
  const profileImages = document.querySelectorAll('.profile-img');
  const photoStatusBadge = document.getElementById('photoStatusBadge');
  const resetPhotoBtn = document.getElementById('resetPhotoBtn');

  // Load saved avatar on initial load
  const savedAvatar = localStorage.getItem('harshitha_portfolio_avatar');
  if (savedAvatar) {
    setProfileImages(savedAvatar);
    if (photoStatusBadge) {
      photoStatusBadge.innerHTML = '<i class="fa-solid fa-check"></i> Custom Photo';
      photoStatusBadge.style.color = 'var(--color-success)';
    }
  }

  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate image type
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
        return;
      }

      // Max size: 5MB
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size should be under 5MB.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setProfileImages(dataUrl);
        try {
          localStorage.setItem('harshitha_portfolio_avatar', dataUrl);
          if (photoStatusBadge) {
            photoStatusBadge.innerHTML = '<i class="fa-solid fa-check"></i> Photo Saved!';
            photoStatusBadge.style.color = 'var(--color-success)';
          }
          showToast('Profile photo updated and saved successfully! 🎉');
        } catch (err) {
          console.warn('Storage limit reached, photo displayed for current session:', err);
          showToast('Photo updated for current session!');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (resetPhotoBtn) {
    resetPhotoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('harshitha_portfolio_avatar');
      // Reset to default SVG avatar
      const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDQwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmdHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzBiMTkyYyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzEwMjQzZSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwNzBmMWUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImFjY2VudEdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMDI4NGM3Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzM4YmRmOCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYXZhdGFyR3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTNlNjIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMjMzNTU0Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGZpbHRlciBpZD0iZ2xvdyIgeD0iLTIwJSIgeT0iLTIwJSIgd2lkdGg9IjE0MCUiIGhlaWdodD0iMTQwJSI+CiAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEwIiByZXN1bHQ9ImJsdXIiLz4KICAgICAgPGZlQ29tcG9zaXRlIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImJsdXIiIG9wZXJhdG9yPSJvdmVyIi8+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CgogIDwhLS0gQmFja2dyb3VuZCAtLT4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQ0MCIgZmlsbD0idXJsKCNiZ0dyYWQpIi8+CiAgCiAgPCEtLSBTdWJ0bGUgR3JpZC9UZWNoIEFjY2VudHMgLS0+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTgwIiByPSIxNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM4YmRmOCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjYsNiIgb3BhY2l0eT0iMC4zIi8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTgwIiByPSIxMTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBlYTVlOSIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjQiLz4KICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxODAiIHI9IjEwMCIgZmlsbD0idXJsKCNhdmF0YXJHcmFkKSIgc3Ryb2tlPSJ1cmwoI2FjY2VudEdyYWQpIiBzdHJva2Utd2lkdGg9IjMiIGZpbHRlcj0idXJsKCNnbG93KSIvPgoKICA8IS0tIFN0eWxpemVkIE1vbm9ncmFtIFNpbGhvdWV0dGUgLS0+CiAgPCEtLSBIZWFkIFNpbGhvdWV0dGUgLS0+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSI0MiIgZmlsbD0iIzM4YmRmOCIgb3BhY2l0eT0iMC45Ii8+CiAgPCEtLSBTaG91bGRlciAvIEJvZHkgU2lsaG91ZXR0ZSAtLT4KICA8cGF0aCBkPSJNMTEwLDI5MCBDMTEwLDIzMCAxNDUsMjE1IDIwMCwyMTUgQzI1NSwyMTUgMjkwLDIzMCAyOTAsMjkwIEMyOTAsMzIwIDExMCwzMjAgMTEwLDI5MCBaIiBmaWxsPSIjMzhiZGY4IiBvcGFjaXR5PSIwLjg1Ii8+CgogIDwhLS0gQ2xlYW4gVGVjaCBFbWJsZW0gQmFkZ2UgLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMwLCAzNDApIj4KICAgIDxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMzQiIHJ4PSIxNyIgZmlsbD0iIzBiMTkyYyIgc3Ryb2tlPSIjMzhiZGY4IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHRleHQgeD0iNzAiIHk9IjIyIiBmb250LWZhbWlseT0iJ1BsdXMgSmFrYXJ0YSBTYW5zJywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2Y4ZmFmYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjEiPkhBUlNISVRIQSBNPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBDYW1lcmEgLyBVcGxvYWQgT3ZlcmxheSBJbmRpY2F0b3IgSWNvbiAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODIsIDM4OCkiPgogICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTgiIGZpbGw9IiMwMjg0YzciIG9wYWNpdHk9IjAuOSIvPgogICAgPHBhdGggZD0iTTEyLDEzIEwxNCwxMCBMMjIsMTAgTDI0LDEzIEwyNywxMyBDMjcuNSwxMyAyOCwxMy41IDI4LDE0IEwyOCwyNCBDMjgsMjQuNSAyNy41LDI1IDI3LDI1IEw5LDI1IEM4LjUsMjUgOCwyNC41IDgsMjQgTDgsMTQgQzgsMTMuNSA4LjUsMTMgOSwxMyBMMTIsMTMgWiBNMTgsMjMgQzIwLjIsMjMgMjIsMjEuMiAyMiwxOSBDMjIsMTYuOCAyMC4yLDE1IDE4LDE1IEMxNS44LDE1IDE0LDE2LjggMTQsMTkgQzE0LDIxLjIgMTUuOCwyMyAxOCwyMyBaIiBmaWxsPSIjZmZmZmZmIi8+CiAgPC9nPgo8L3N2Zz4K';
      setProfileImages(defaultAvatar);
      if (photoStatusBadge) {
        photoStatusBadge.innerHTML = '<i class="fa-solid fa-camera"></i> Upload Photo';
        photoStatusBadge.style.color = 'var(--color-primary-light)';
      }
      showToast('Profile photo reset to default avatar.');
    });
  }

  function setProfileImages(src) {
    profileImages.forEach(img => {
      img.src = src;
    });
  }

  // -----------------------------------------------------------------
  // 5. MAJOR PROJECT DETAILS MODAL & TAB ENGINE
  // -----------------------------------------------------------------
  const openProjectModalBtns = document.querySelectorAll('.open-project-modal-btn');
  const projectModalBackdrop = document.getElementById('projectModal');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  const modalTabContents = document.querySelectorAll('.modal-tab-content');

  // Open modal
  openProjectModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (projectModalBackdrop) {
        projectModalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    });
  });

  // Close modal function
  function closeProjectModal() {
    if (projectModalBackdrop) {
      projectModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) {
        closeProjectModal();
      }
    });
  }

  // Keyboard escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeResumeModal();
    }
  });

  // Modal tab switching
  modalTabBtns.forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const targetTabId = tabBtn.getAttribute('data-tab');

      modalTabBtns.forEach(b => b.classList.remove('active'));
      modalTabContents.forEach(c => c.classList.remove('active'));

      tabBtn.classList.add('active');
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // -----------------------------------------------------------------
  // 6. SCREENSHOT REPLACEMENT / UPLOAD HELPER
  // -----------------------------------------------------------------
  const screenshotInputs = document.querySelectorAll('.screenshot-file-input');
  screenshotInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const targetImgId = input.getAttribute('data-target-img');
      const targetImg = document.getElementById(targetImgId);
      if (!file || !targetImg) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        targetImg.src = event.target.result;
        showToast('Screenshot preview updated!');
      };
      reader.readAsDataURL(file);
    });
  });

  // -----------------------------------------------------------------
  // 7. RESUME DOWNLOAD & VIEWER SYSTEM
  // -----------------------------------------------------------------
  const resumeDownloadBtns = document.querySelectorAll('.btn-download-resume');
  const resumeViewBtns = document.querySelectorAll('.btn-view-resume');
  const resumeModalBackdrop = document.getElementById('resumeModal');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');

  resumeDownloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Downloading Harshitha M Resume (PDF)... 📄');
    });
  });

  resumeViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Opening Resume in new tab... 📄');
    });
  });

  function openResumeModal() {
    if (resumeModalBackdrop) {
      resumeModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModalBackdrop) {
      resumeModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModalBackdrop) {
    resumeModalBackdrop.addEventListener('click', (e) => {
      if (e.target === resumeModalBackdrop) {
        closeResumeModal();
      }
    });
  }

  // -----------------------------------------------------------------
  // 8. CONTACT FORM & FAST COPY HELPERS
  // -----------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Pre-fill mailto link for direct recruiter communication
      const mailtoUrl = `mailto:harshithabenadict@gmail.com?subject=${encodeURIComponent(subject || 'Campus Placement Opportunity')}&body=${encodeURIComponent(`Dear Harshitha,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
      window.location.href = mailtoUrl;

      showToast('Opening your email client to send message... ✉️');
      contactForm.reset();
    });
  }

  // Copy email to clipboard
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'harshithabenadict@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  });

  // -----------------------------------------------------------------
  // 9. TOAST NOTIFICATION UTILITY
  // -----------------------------------------------------------------
  function showToast(message, type = 'info') {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    const icon = type === 'error' 
      ? '<i class="fa-solid fa-triangle-exclamation" style="color:var(--color-danger)"></i>' 
      : '<i class="fa-solid fa-circle-check" style="color:var(--color-primary-light)"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }
});

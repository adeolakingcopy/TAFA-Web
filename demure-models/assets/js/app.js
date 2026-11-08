/**
 * DEMURE MODELS — Editorial Monograph Controller
 * Powers the split-pane navigation, scrollspy, model portfolio filtering,
 * comp-card sheets, and client/talent inquiry forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    category: 'All',
    activeSection: 'sec-roster'
  };

  const rosterContainer = document.getElementById('editorial-roster-grid');
  const catFilterButtons = document.querySelectorAll('.cat-filter-btn');
  const navLinks = document.querySelectorAll('.editorial-nav-link');
  const compCardModal = document.getElementById('comp-card-modal');
  const compCardBody = document.getElementById('comp-card-body');
  const bootcampModal = document.getElementById('bootcamp-modal');
  const toastContainer = document.getElementById('toast-container');

  // Initialize
  initIcons();
  renderRoster();
  bindEvents();
  initScrollspy();

  function initIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Toast notification
  window.showToast = function(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'editorial-toast';
    toast.textContent = msg;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // Render Roster
  function renderRoster() {
    if (!rosterContainer || !window.TALENT_ROSTER) return;

    const filtered = window.TALENT_ROSTER.filter(model => {
      if (state.category === 'All') return true;
      return model.primaryCategory === state.category || model.categories.includes(state.category);
    });

    if (filtered.length === 0) {
      rosterContainer.innerHTML = `
        <div class="col-span-full py-16 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
          No talent catalogued in this division.
        </div>
      `;
      return;
    }

    rosterContainer.innerHTML = filtered.map(model => `
      <div class="model-card group cursor-pointer" onclick="openCompCard('${model.id}')">
        <!-- Portrait Container (3:4 ratio) -->
        <div class="model-portrait-wrap aspect-[3/4] relative">
          <img 
            src="${model.image}" 
            alt="${model.name}" 
            loading="lazy" 
            class="model-portrait-img w-full h-full object-cover object-top"
          />
          <!-- Subtle corner code -->
          <div class="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-white/80 bg-black/60 px-2 py-0.5 uppercase">
            ${model.code}
          </div>
        </div>

        <!-- Metadata -->
        <div class="pt-3 pb-1 flex items-baseline justify-between border-b border-white/5 pb-2">
          <div>
            <h3 class="text-sm font-semibold tracking-wide uppercase text-white group-hover:text-orange-400 transition-colors">
              ${model.name}
            </h3>
            <p class="text-[10px] text-zinc-500 tracking-editorial uppercase mt-0.5">
              ${model.primaryCategory}
            </p>
          </div>
          <div class="text-[11px] font-mono text-zinc-400">
            ${model.height}
          </div>
        </div>
      </div>
    `).join('');

    initIcons();
  }

  // Open Comp Card
  window.openCompCard = function(id) {
    const model = window.TALENT_ROSTER.find(m => m.id === id);
    if (!model || !compCardModal || !compCardBody) return;

    compCardBody.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        <!-- Imagery Left -->
        <div class="md:col-span-6 space-y-3">
          <div class="aspect-[3/4] bg-zinc-900 overflow-hidden relative">
            <img id="comp-hero-img" src="${model.image}" alt="${model.name}" class="w-full h-full object-cover object-top" />
          </div>
          ${model.lookbook && model.lookbook.length > 1 ? `
            <div class="grid grid-cols-3 gap-2">
              ${model.lookbook.map((img, i) => `
                <div 
                  onclick="document.getElementById('comp-hero-img').src='${img}'"
                  class="aspect-[3/4] bg-zinc-900 overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity border border-transparent hover:border-white/40"
                >
                  <img src="${img}" alt="Look ${i+1}" class="w-full h-full object-cover object-top" />
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Specifications Right -->
        <div class="md:col-span-6 space-y-6">
          <div>
            <span class="text-[10px] font-mono tracking-wide-editorial text-orange-500 uppercase block">${model.code}</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white mt-1">${model.name}</h2>
            <div class="text-[11px] font-mono tracking-editorial text-zinc-400 uppercase mt-0.5">${model.primaryCategory}</div>
            <p class="text-xs text-zinc-400 mt-4 leading-relaxed font-light">${model.bio}</p>
          </div>

          <!-- Specs Table -->
          <div class="border-t border-b border-white/10 py-4">
            <div class="text-[10px] font-mono tracking-wide-editorial uppercase text-zinc-500 mb-3">Model Measurements</div>
            <div class="grid grid-cols-2 gap-y-2.5 text-xs font-mono">
              <div class="text-zinc-500">HEIGHT: <span class="text-white ml-1">${model.height}</span></div>
              <div class="text-zinc-500">BUST/CHEST: <span class="text-white ml-1">${model.bust}</span></div>
              <div class="text-zinc-500">WAIST: <span class="text-white ml-1">${model.waist}</span></div>
              <div class="text-zinc-500">HIPS: <span class="text-white ml-1">${model.hips}</span></div>
              <div class="text-zinc-500">SHOES: <span class="text-white ml-1">${model.shoes}</span></div>
              <div class="text-zinc-500">EYES: <span class="text-white ml-1">${model.eyes}</span></div>
              <div class="text-zinc-500">HAIR: <span class="text-white ml-1">${model.hair}</span></div>
              <div class="text-zinc-500">LOCATION: <span class="text-white ml-1">${model.location}</span></div>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-2 pt-2">
            <button 
              onclick="selectModelForBooking('${model.name}', '${model.code}')" 
              class="w-full btn-editorial-primary text-xs"
            >
              Request Direct Booking For ${model.name}
            </button>
            <button 
              onclick="closeCompCard()" 
              class="w-full btn-editorial-outline text-xs text-zinc-400 hover:text-white"
            >
              Return to Catalog
            </button>
          </div>

        </div>

      </div>
    `;

    compCardModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    initIcons();
  };

  window.closeCompCard = function() {
    if (compCardModal) {
      compCardModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Pre-fill model into booking form
  window.selectModelForBooking = function(name, code) {
    closeCompCard();
    const deskSection = document.getElementById('sec-desk');
    if (deskSection) {
      deskSection.scrollIntoView({ behavior: 'smooth' });
    }
    const talentInput = document.getElementById('booking-model-name');
    if (talentInput) {
      talentInput.value = `${name} (${code})`;
      showToast(`Selected ${name} for casting brief.`);
    }
  };

  // Bootcamp Modal
  window.openBootcampModal = function() {
    if (bootcampModal) {
      bootcampModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeBootcampModal = function() {
    if (bootcampModal) {
      bootcampModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Scrollspy for left sticky nav
  function initScrollspy() {
    const sections = document.querySelectorAll('.editorial-section');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          state.activeSection = id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  // Event bindings
  function bindEvents() {
    // Category Filter Buttons
    catFilterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        catFilterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.category = btn.dataset.category;
        renderRoster();
      });
    });

    // Age Guardian Check
    const ageInput = document.getElementById('applicant-age');
    const guardianSection = document.getElementById('guardian-consent-wrap');
    if (ageInput && guardianSection) {
      ageInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (val && val < 18) {
          guardianSection.classList.remove('hidden');
        } else {
          guardianSection.classList.add('hidden');
        }
      });
    }

    // Photo input feedback
    const photoInput = document.getElementById('polaroid-files');
    const photoFeedback = document.getElementById('polaroid-feedback');
    if (photoInput && photoFeedback) {
      photoInput.addEventListener('change', (e) => {
        const count = e.target.files.length;
        if (count > 0) {
          photoFeedback.textContent = `${count} photograph${count > 1 ? 's' : ''} staged for review.`;
          photoFeedback.classList.remove('hidden');
        }
      });
    }

    // Client Booking Form
    const bookingForm = document.getElementById('client-booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Your project brief has been recorded. Agency coordinators will reply within 4 hours.');
        bookingForm.reset();
      });
    }

    // Model Application Form
    const applyForm = document.getElementById('talent-application-form');
    if (applyForm) {
      applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Application received. The DEMURE scouting board evaluates intakes weekly.');
        applyForm.reset();
        if (guardianSection) guardianSection.classList.add('hidden');
        if (photoFeedback) photoFeedback.classList.add('hidden');
      });
    }

    // Bootcamp Form
    const bootcampForm = document.getElementById('bootcamp-waitlist-form');
    if (bootcampForm) {
      bootcampForm.addEventListener('submit', (e) => {
        e.preventDefault();
        closeBootcampModal();
        showToast('Priority waitlist confirmed for DEMURE Bootcamp Cohort 01.');
        bootcampForm.reset();
      });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCompCard();
        closeBootcampModal();
      }
    });
  }
});

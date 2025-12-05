/**
 * Research Section Functionality
 */

class ResearchSection {
  constructor() {
    this.researchContainer = document.querySelector('.research-container');
    this.dataLoaded = false;
    this.researchData = null;
  }

  init() {
    this.loadResearchData();
  }

  async loadResearchData() {
    try {
      const response = await fetch('data/research.json');
      if (!response.ok) {
        throw new Error('Failed to load research data');
      }
      
      this.researchData = await response.json();
      this.renderResearchSection();
      this.dataLoaded = true;
      
      // Initialize filters and modals after content is loaded
      this.filterButtons = document.querySelectorAll('.filter-btn');
      this.researchCards = document.querySelectorAll('.research-card');
      this.detailButtons = document.querySelectorAll('.view-details');
      this.modal = document.querySelector('.research-modal');
      this.modalContent = document.querySelector('.modal-content');
      this.closeModalBtn = document.querySelector('.close-modal');
      
      this.setupFilters();
      this.setupModalEvents();
    } catch (error) {
      console.error('Error loading research data:', error);
      this.researchContainer.innerHTML = `
        <div class="error-message">
          <p>Unable to load research projects. Please try again later.</p>
        </div>
      `;
    }
  }

  renderResearchSection() {
    if (!this.researchData) return;
    
    const { categories, projects } = this.researchData;
    let html = '';
    
    // Render filter buttons
    html += `
      <div class="research-filters">
        ${categories.map(category => `
          <button class="filter-btn ${category.id === 'all' ? 'active' : ''}" data-filter="${category.id}">
            ${category.name}
          </button>
        `).join('')}
      </div>
    `;
    
    // Render research grid
    html += `
      <div class="research-grid">
        ${projects.map(project => this.renderProjectCard(project)).join('')}
      </div>
      
      <!-- Research Details Modal -->
      <div class="research-modal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <div class="modal-body"></div>
        </div>
      </div>
      
      <!-- Research Details Templates -->
      ${projects.map(project => this.renderProjectTemplate(project)).join('')}
    `;
    
    this.researchContainer.innerHTML = html;
  }
  
  renderProjectCard(project) {
    return `
      <div class="research-card" data-category="${project.category}">
        <div class="research-image">
          <img src="${project.thumbnail}" alt="${project.title}" onerror="this.src='imgs/placeholder-research.jpg'">
        </div>
        <div class="research-content">
          <h3>${project.title}</h3>
          <p class="research-date">${project.date}</p>
          <p>${project.description}</p>
          <div class="research-actions">
            <a href="#" class="research-btn view-details" data-id="${project.id}">View Details</a>
            ${project.links.map(link => `
              <a href="${link.url}" class="research-btn" target="_blank">${link.text}</a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  renderProjectTemplate(project) {
    const details = project.details;
    
    return `
      <template id="${project.id}-details">
        <h2>${project.title}</h2>
        <div class="modal-image">
          <img src="${project.thumbnail}" alt="${project.title}" onerror="this.src='imgs/placeholder-research.jpg'">
        </div>
        <div class="modal-info">
          <p><strong>Timeline:</strong> ${project.date}</p>
          ${details.collaborators ? `<p><strong>Collaborators:</strong> ${details.collaborators}</p>` : ''}
          ${details.funding ? `<p><strong>Funding:</strong> ${details.funding}</p>` : ''}
          ${details.publication ? `<p><strong>Publication:</strong> ${details.publication}</p>` : ''}
          ${details.repository ? `<p><strong>Repository:</strong> <a href="${details.repository}" target="_blank">GitHub</a></p>` : ''}
        </div>
        <div class="modal-description">
          <h3>Abstract</h3>
          <p>${details.abstract}</p>
          
          ${details.sections.map(section => `
            <h3>${section.title}</h3>
            ${section.content}
          `).join('')}
        </div>
      </template>
    `;
  }

  setupFilters() {
    if (!this.filterButtons.length) return;

    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and add to current
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Get filter category
        const filterValue = button.getAttribute('data-filter');
        
        // Filter cards
        this.filterCards(filterValue);
      });
    });
  }

  filterCards(category) {
    this.researchCards.forEach(card => {
      // Remove existing animation classes
      card.classList.remove('show');
      card.classList.remove('hide');
      
      // Force a reflow to restart animations
      void card.offsetWidth;
      
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.classList.add('show');
      } else {
        card.classList.add('hide');
      }
    });
  }

  setupModalEvents() {
    if (!this.detailButtons.length) return;

    // Open modal with correct content
    this.detailButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const detailId = button.getAttribute('data-id');
        this.openModal(detailId);
      });
    });

    // Close modal on close button click
    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }

    // Close modal when clicking outside content
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'block') {
        this.closeModal();
      }
    });
  }

  openModal(detailId) {
    const template = document.getElementById(`${detailId}-details`);
    if (!template) return;

    const modalBody = this.modal.querySelector('.modal-body');
    modalBody.innerHTML = template.innerHTML;

    // Show modal with animation
    this.modal.style.display = 'block';
    setTimeout(() => {
      this.modal.classList.add('active');
    }, 10);

    // Disable body scroll
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.classList.remove('active');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      this.modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
}

// Initialize when the section is loaded
document.addEventListener('DOMContentLoaded', () => {
  const researchSection = document.getElementById('research');
  if (researchSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const research = new ResearchSection();
          research.init();
          observer.disconnect();
        }
      });
    });
    
    observer.observe(researchSection);
  }
});

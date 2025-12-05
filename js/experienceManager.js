/**
 * Experience Manager - Handles experience data loading, filtering and rendering
 */
const ExperienceManager = {
    data: null,
    isInitialized: false,
    debugMode: true, // Enable debug logging
    
    init() {
        if (this.debugMode) console.log('ExperienceManager: Initializing');
        
        // Listen for experiences section being loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Check if the experiences section exists yet
            if (this.debugMode) console.log('ExperienceManager: DOMContentLoaded fired');
            this.checkAndSetupExperiences();
        });

        // Also try to initialize when the experiences content is dynamically loaded
        document.addEventListener('experiencesLoaded', () => {
            if (this.debugMode) console.log('ExperienceManager: experiencesLoaded event received');
            this.setupExperiences();
        });
        
        // Add a mutation observer to detect when the experiences container is added to the DOM
        this.observeDOMChanges();
        
        // Fallback - try to initialize after a delay (in case other methods fail)
        setTimeout(() => {
            if (!this.isInitialized) {
                if (this.debugMode) console.log('ExperienceManager: Attempting initialization via timeout');
                this.checkAndSetupExperiences();
            }
        }, 2000);
    },

    observeDOMChanges() {
        if (this.debugMode) console.log('ExperienceManager: Setting up mutation observer');
        
        // Create a mutation observer to watch for the experiences container being added to the DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    // Check if any of the added nodes contains our target elements
                    const experiencesContainer = document.querySelector('#experiences .experiences-container');
                    if (experiencesContainer && !this.isInitialized) {
                        if (this.debugMode) console.log('ExperienceManager: Found #experiences .experiences-container via observer');
                        this.setupExperiences();
                    }
                }
            });
        });

        // Start observing the document body for DOM changes
        observer.observe(document.body, { childList: true, subtree: true });
    },

    checkAndSetupExperiences() {
        // Check if experiences section exists in the DOM
        const experiencesSection = document.getElementById('experiences');
        if (this.debugMode) console.log('ExperienceManager: Checking for #experiences element:', experiencesSection ? 'Found' : 'Not found');
        
        if (experiencesSection && !this.isInitialized) {
            // If it exists, check if the container is ready
            const container = experiencesSection.querySelector('.experiences-container');
            if (this.debugMode) console.log('ExperienceManager: Checking for .experiences-container:', container ? 'Found' : 'Not found');
            
            if (container) {
                this.setupExperiences();
            } else {
                // If container doesn't exist, create it
                if (this.debugMode) console.log('ExperienceManager: Creating missing .experiences-container');
                const filterContainer = document.createElement('div');
                filterContainer.className = 'experience-filters';
                
                const experienceContainer = document.createElement('div');
                experienceContainer.className = 'experiences-container';
                
                experiencesSection.appendChild(filterContainer);
                experiencesSection.appendChild(experienceContainer);
                
                this.setupExperiences();
            }
        }
    },
    
    async loadExperienceData() {
        if (this.data) return this.data;
        
        if (this.debugMode) console.log('ExperienceManager: Loading experience data');
        
        try {
            const response = await fetch('/data/experiences.json');
            if (!response.ok) {
                throw new Error(`Failed to load experiences data: ${response.status} ${response.statusText}`);
            }
            
            this.data = await response.json();
            if (this.debugMode) console.log('ExperienceManager: Data loaded successfully', this.data);
            return this.data;
        } catch (error) {
            console.error('Error loading experience data:', error);
            
            // Check if the error is related to the file not being found
            if (error.message.includes('404')) {
                console.error('The experiences.json file was not found. Make sure it exists at /data/experiences.json');
                
                // Try an alternative path as a fallback
                try {
                    if (this.debugMode) console.log('ExperienceManager: Trying alternative data path');
                    const altResponse = await fetch('data/experiences.json'); // No leading slash
                    if (altResponse.ok) {
                        this.data = await altResponse.json();
                        if (this.debugMode) console.log('ExperienceManager: Data loaded from alternative path');
                        return this.data;
                    }
                } catch (altError) {
                    console.error('Alternative data path also failed:', altError);
                }
            }
            
            // Return empty data structure
            return { categories: [{ id: 'all', name: 'All' }], experiences: [] };
        }
    },
    
    async setupExperiences() {
        // Prevent multiple initializations
        if (this.isInitialized) {
            if (this.debugMode) console.log('ExperienceManager: Already initialized, skipping setup');
            return;
        }
        
        if (this.debugMode) console.log('ExperienceManager: Setting up experiences');
        
        try {
            const data = await this.loadExperienceData();
            
            // Check if containers exist, if not create them
            let filterContainer = document.querySelector('.experience-filters');
            let cardsContainer = document.querySelector('.experiences-container');
            
            const experiencesSection = document.getElementById('experiences');
            if (!experiencesSection) {
                console.error('Experience section (#experiences) not found in the DOM');
                return;
            }
            
            if (!filterContainer) {
                if (this.debugMode) console.log('ExperienceManager: Creating missing filter container');
                filterContainer = document.createElement('div');
                filterContainer.className = 'experience-filters';
                experiencesSection.appendChild(filterContainer);
            }
            
            if (!cardsContainer) {
                if (this.debugMode) console.log('ExperienceManager: Creating missing cards container');
                cardsContainer = document.createElement('div');
                cardsContainer.className = 'experiences-container';
                experiencesSection.appendChild(cardsContainer);
            }
            
            // Clear loading message if it exists
            const loadingMsg = experiencesSection.querySelector('.loading-message');
            if (loadingMsg) {
                if (this.debugMode) console.log('ExperienceManager: Removing loading message');
                loadingMsg.remove();
            }
            
            // Ensure we have at least the "All" category
            if (!data.categories || data.categories.length === 0) {
                data.categories = [{ id: 'all', name: 'All' }];
            }
            
            // Create filter buttons
            this.createFilterButtons(data.categories);
            
            // Render experience cards
            this.renderExperienceCards(data.experiences || []);
            
            // Mark as initialized
            this.isInitialized = true;
            if (this.debugMode) console.log('ExperienceManager: Successfully initialized');
            
            // Dispatch event to notify that experiences are ready
            document.dispatchEvent(new Event('experiencesRendered'));
            
        } catch (error) {
            console.error('Error setting up experiences:', error);
            
            // Show error message in the UI
            const experiencesSection = document.getElementById('experiences');
            if (experiencesSection) {
                experiencesSection.innerHTML = `
                    <div class="error-message">
                        <p>Sorry, there was an error loading the experiences data.</p>
                        <p>Error details: ${error.message}</p>
                    </div>
                `;
            }
        }
    },
    
    createFilterButtons(categories) {
        const filterContainer = document.querySelector('.experience-filters');
        if (!filterContainer) {
            console.warn('Experience filter container not found');
            return;
        }
        
        // Clear existing buttons
        filterContainer.innerHTML = '';
        
        // Create category filter buttons
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'exp-filter-btn';
            button.setAttribute('data-category', category.id);
            button.textContent = category.name;
            
            if (category.id === 'all') {
                button.classList.add('active');
            }
            
            button.addEventListener('click', () => this.filterExperiences(category.id));
            filterContainer.appendChild(button);
        });
    },
    
    renderExperienceCards(experiences) {
        const container = document.querySelector('.experiences-container');
        if (!container) {
            console.warn('Experience container not found');
            return;
        }
        
        // Clear existing cards
        container.innerHTML = '';
        
        // If there are no experiences, show a message
        if (!experiences || experiences.length === 0) {
            container.innerHTML = '<p class="no-experiences">No experiences found.</p>';
            return;
        }
        
        // Create experience cards
        experiences.forEach(exp => {
            const card = document.createElement('div');
            card.className = 'experience-card';
            card.setAttribute('data-category', exp.category);
            
            // Use safer HTML construction with defensive checks for missing data
            const logo = exp.logo || '';
            const company = exp.company || 'Unknown Company';
            const role = exp.role || 'Unknown Role';
            const location = exp.location || 'Unknown Location';
            const startDate = exp.startDate || '';
            const endDate = exp.endDate || 'Present';
            const description = exp.description || 'No description available';
            const achievements = Array.isArray(exp.achievements) ? exp.achievements : [];
            const tags = Array.isArray(exp.tags) ? exp.tags : [];
            const technologies = Array.isArray(exp.technologies) ? exp.technologies : [];
            
            card.innerHTML = `
                <div class="exp-header">
                    <div class="exp-logo">
                        <img src="${logo}" alt="${company} logo" onerror="this.onerror=null;this.src='img/placeholder-logo.png';">
                    </div>
                    <div class="exp-title">
                        <h3>${role}</h3>
                        <h4>${company} • ${location}</h4>
                        <p class="exp-date">${startDate} - ${endDate}</p>
                    </div>
                </div>
                <div class="exp-body">
                    <p class="exp-description">${description}</p>
                    ${achievements.length > 0 ? `
                    <div class="exp-achievements">
                        <h5>Key Achievements:</h5>
                        <ul>
                            ${achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
                <div class="exp-footer">
                    ${tags.length > 0 ? `
                    <div class="exp-tags">
                        ${tags.map(tag => `<span class="exp-tag">${tag}</span>`).join('')}
                    </div>
                    ` : ''}
                    ${technologies.length > 0 ? `
                    <div class="exp-tech">
                        <h5>Technologies:</h5>
                        <div class="tech-list">
                            ${technologies.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            `;
            
            container.appendChild(card);
        });
    },
    
    filterExperiences(category) {
        // Update active button state
        document.querySelectorAll('.exp-filter-btn').forEach(btn => {
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Filter cards
        document.querySelectorAll('.experience-card').forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                // Add animation for smooth transition
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300); // Transition duration
            }
        });
    }
};

// Initialize the experience manager
document.addEventListener('DOMContentLoaded', () => {
    ExperienceManager.init();
});

// Fallback initialization in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    ExperienceManager.init();
}

export default ExperienceManager;

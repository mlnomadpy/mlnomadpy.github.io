/**
 * Experiences Section - Creates the experience section structure and initializes the experience manager
 */
const ExperienceSection = {
    init() {
        // Check if we're on a page with the experiences section
        if (document.getElementById('experiences')) {
            this.ensureExperiencesStructure();
            this.loadExperiencesData();
        }
    },
    
    ensureExperiencesStructure() {
        const experiencesSection = document.getElementById('experiences');
        if (!experiencesSection) return;
        
        // Check if the section already has the required structure
        if (experiencesSection.querySelector('.experiences-container')) {
            return; // Structure already exists
        }
        
        // Create the basic structure for experiences if it doesn't exist
        const template = `
            <div class="experiences-header">
                <h2>Professional Experience</h2>
                <div class="experience-filters"></div>
            </div>
            <div class="experiences-container">
                <div class="loading-spinner">Loading experiences...</div>
            </div>
        `;
        
        experiencesSection.innerHTML = template;
        
        // Add the loading spinner CSS if not already in document
        if (!document.getElementById('loading-spinner-style')) {
            const style = document.createElement('style');
            style.id = 'loading-spinner-style';
            style.textContent = `
                .loading-spinner {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    font-style: italic;
                    color: #888;
                }
                .loading-spinner::after {
                    content: '';
                    width: 20px;
                    height: 20px;
                    margin-left: 10px;
                    border: 2px solid #ddd;
                    border-top: 2px solid #888;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    async loadExperiencesData() {
        try {
            // Import the ExperienceManager dynamically
            const module = await import('./experienceManager.js');
            const ExperienceManager = module.default;
            
            // Dispatch event to notify that experiences section is loaded and ready
            const event = new CustomEvent('experiencesLoaded');
            document.dispatchEvent(event);
        } catch (error) {
            console.error('Error loading experiences module:', error);
            // Show error in the container
            const container = document.querySelector('.experiences-container');
            if (container) {
                container.innerHTML = `
                    <div class="error-message">
                        <p>Sorry, there was an error loading the experiences data.</p>
                        <button onclick="window.location.reload()">Retry</button>
                    </div>
                `;
            }
        }
    }
};

// Initialize the section
document.addEventListener('DOMContentLoaded', () => {
    ExperienceSection.init();
});

export default ExperienceSection;

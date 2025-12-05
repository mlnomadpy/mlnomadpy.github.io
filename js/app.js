// Create a simple Store pattern for state management
const Store = {
    state: {
        activeSection: null,
        sectionData: {},
        isHeroDimmed: false,
        isMobileMenuOpen: false,
        loadedSections: new Set()
    },
    
    listeners: {},
    
    // Subscribe to state changes
    subscribe(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        return () => this.unsubscribe(event, callback);
    },
    
    // Unsubscribe from state changes
    unsubscribe(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    },
    
    // Dispatch state changes
    dispatch(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    },
    
    // Update state and notify subscribers
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.dispatch('stateChanged', this.state);
    },
    
    // Get current state
    getState() {
        return { ...this.state };
    }
};

const Portfolio = {
    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.initializeStore();
            this.setupEventListeners();
            this.loadSections();
            this.setupObservers();
        });
    },

    initializeStore() {
        // Initialize store with default values
        Store.setState({
            activeSection: null,
            sectionData: {},
            isHeroDimmed: false,
            isMobileMenuOpen: false,
            loadedSections: new Set()
        });
        
        // Subscribe to state changes
        Store.subscribe('stateChanged', this.handleStateChange.bind(this));
        Store.subscribe('sectionActivated', this.handleSectionActivation.bind(this));
    },

    handleStateChange(state) {
        // Update UI based on state changes
        const heroSection = document.querySelector(".hero-sec");
        if (heroSection) {
            if (state.isHeroDimmed) {
                heroSection.classList.add("dim");
            } else {
                heroSection.classList.remove("dim");
            }
        }
        
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            if (state.isMobileMenuOpen) {
                navbar.classList.add("responsive");
            } else {
                navbar.classList.remove("responsive");
            }
        }
    },

    handleSectionActivation(sectionId) {
        const sectionElements = document.querySelectorAll(".section");
        const navLinks = document.querySelectorAll(".nav-link");
        
        // Update navigation styles
        navLinks.forEach(link => {
            if (link.getAttribute("data-section") === sectionId || (sectionId === null && link.id === "home-link")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
        
        // Update section visibility
        if (sectionId === null) {
            this.hideAllSections(sectionElements);
            Store.setState({ isHeroDimmed: false });
            return;
        }
        
        this.hideAllSections(sectionElements);
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = "block";
            // Force a reflow
            targetSection.offsetHeight;
            targetSection.classList.add("active");
            Store.setState({ isHeroDimmed: true });
            
            // Load content if not already loaded
            if (!Store.getState().loadedSections.has(sectionId)) {
                this.loadSectionContent(sectionId);
            }
        }
    },

    setupEventListeners() {
        // Setup navigation
        this.setupNavigation();
        
        // Toggle mobile menu
        const menuToggle = document.querySelector(".menu-toggle");
        if (menuToggle) {
            menuToggle.addEventListener("click", () => {
                const currentState = Store.getState();
                Store.setState({ isMobileMenuOpen: !currentState.isMobileMenuOpen });
            });
        }
    },

    loadSections() {
        const sections = ['aboutme', 'life', 'poetry', 'experiences', 'talks', 'research'];
        sections.forEach(section => {
            // Defer loading section content until needed
            this.setupSectionToggle(section);
        });
    },

    loadSectionContent(section) {
        // Check if this section is already loaded
        const currentState = Store.getState();
        if (currentState.loadedSections.has(section)) {
            return Promise.resolve();
        }
        
        return fetch(`${section}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${section}.html: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(section).innerHTML = data;
                
                // Add to loaded sections
                const loadedSections = new Set(Store.getState().loadedSections);
                loadedSections.add(section);
                Store.setState({ loadedSections });
                
                // Dispatch event that content was loaded
                Store.dispatch(`${section}Loaded`, true);
            })
            .catch(error => {
                console.error(`Error loading ${section}.html:`, error);
                document.getElementById(section).innerHTML = "<p>Error loading content</p>";
            });
    },

    setupNavigation() {
        const navLinks = document.querySelectorAll(".nav-link");
        const homeLink = document.getElementById("home-link");

        // Handle home link click
        homeLink?.addEventListener("click", (e) => {
            e.preventDefault();
            Store.setState({ activeSection: null });
            Store.dispatch('sectionActivated', null);
            Store.setState({ isMobileMenuOpen: false });
        });

        // Handle other nav links
        navLinks.forEach(link => {
            if (link.id !== "home-link") {
                link.addEventListener("click", e => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const sectionId = link.getAttribute("data-section");
                    Store.setState({ activeSection: sectionId });
                    Store.dispatch('sectionActivated', sectionId);
                    Store.setState({ isMobileMenuOpen: false });
                });
            }
        });
    },

    hideAllSections(sections) {
        sections.forEach(section => {
            section.classList.remove("active");
            section.style.display = "none";
        });
    },

    setupSectionToggle(section) {
        document.getElementById(section)?.addEventListener("click", e => {
            if (e.target.tagName === "H2") {
                const content = e.target.parentElement;
                content.classList.toggle("collapsed");
                e.target.classList.toggle("collapsed");
            }
        });
    },

    setupObservers() {
        // Setup lazy loading observers
        this.setupIntersectionObservers([
            { id: 'talks', callback: this.handleTalksVisible.bind(this) },
            { id: 'research', callback: this.handleResearchVisible.bind(this) },
            { id: 'experiences', callback: this.handleExperiencesVisible.bind(this) }
        ]);
        
        // Setup scroll animations
        this.setupScrollEffects();
        
        // Setup experiences observer
        this.setupExperiencesObserver();
    },
    
    setupIntersectionObservers(configs) {
        configs.forEach(config => {
            const element = document.getElementById(config.id);
            if (!element) return;
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        config.callback();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    },
    
    handleTalksVisible() {
        // Load talks data when the section becomes visible
        if (window.loadTalks && typeof window.loadTalks === 'function') {
            window.loadTalks();
        } else {
            this.loadSectionContent('talks');
        }
    },
    
    handleResearchVisible() {
        this.loadSectionContent('research');
    },
    
    handleExperiencesVisible() {
        this.loadSectionContent('experiences')
            .then(() => {
                // Initialize experience filtering if needed
                this.initializeExperienceFilters();
            });
    },
    
    initializeExperienceFilters() {
        const filterButtons = document.querySelectorAll('.exp-filter-btn');
        if (filterButtons.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                // Update UI for active filter
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter experiences
                const experiences = document.querySelectorAll('.experience-card');
                experiences.forEach(exp => {
                    if (category === 'all' || exp.getAttribute('data-category') === category) {
                        exp.style.display = 'block';
                    } else {
                        exp.style.display = 'none';
                    }
                });
            });
        });
    },

    setupScrollEffects() {
        // Add observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe all content sections
        document.querySelectorAll('.content').forEach(section => {
            observer.observe(section);
        });
    },

    setupExperiencesObserver() {
        const experiencesSection = document.getElementById('experiences');
        if (!experiencesSection) return;

        const observer = new IntersectionObserver(async entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Load the experiences module dynamically when section becomes visible
                    import('./experiences.js')
                        .then(module => {
                            const ExperienceSection = module.default;
                            ExperienceSection.init();
                        })
                        .catch(error => {
                            console.error('Error loading experiences module:', error);
                            // Fallback to basic content loading
                            this.loadSectionContent('experiences');
                        });
                    observer.disconnect();
                }
            });
        });
        observer.observe(experiencesSection);
    }
};

export default Portfolio;
<template>
  <nav 
    class="mlnomadpy-navbar" 
    :class="{ 'scrolled': isScrolled }"
    role="navigation"
    aria-label="Main navigation"
  >
    <!-- Dynamic Section Title -->
    <div class="section-title-bar" v-if="pageTitle">
      <span class="current-title">{{ pageTitle }}</span>
    </div>

    <div class="navbar-container">
      <!-- Navigation links wrapper -->
      <div id="nav-links" class="nav-links">
        <!-- First half of navigation links -->
        <router-link to="/aboutme" @click="closeMenuIfOpen" class="nav-item" title="About Me">
          <div class="nav-icon">
            <i class="fas fa-user" aria-hidden="true"></i>
          </div>
          <span class="sr-only">About Me</span>
        </router-link>
        
        <router-link to="/research" @click="closeMenuIfOpen" class="nav-item" title="Research">
          <div class="nav-icon">
            <i class="fas fa-flask" aria-hidden="true"></i>
          </div>
          <span class="sr-only">Research</span>
        </router-link>
        
        <router-link to="/talks" @click="closeMenuIfOpen" class="nav-item" title="Talks">
          <div class="nav-icon">
            <i class="fas fa-microphone" aria-hidden="true"></i>
          </div>
          <span class="sr-only">Talks</span>
        </router-link>
        
        <!-- Home link in the middle with logo -->
        <router-link to="/" id="home-link" class="home nav-item" @click="closeMenuIfOpen" title="Home">
          <div class="home-icon-container">
            <i class="fas fa-home" aria-hidden="true"></i>
          </div>
          <span class="sr-only">Home</span>
        </router-link>
        
        <!-- Second half of navigation links -->
        <router-link to="/poetry" @click="closeMenuIfOpen" class="nav-item" title="Poetry">
          <div class="nav-icon">
            <i class="fas fa-feather-alt" aria-hidden="true"></i>
          </div>
          <span class="sr-only">Poetry</span>
        </router-link>
        
        <router-link to="/blogs" @click="closeMenuIfOpen" class="nav-item" title="Blogs">
          <div class="nav-icon">
            <i class="fas fa-pen-nib" aria-hidden="true"></i>
          </div>
          <span class="sr-only">Blogs</span>
        </router-link>
        
        <router-link to="/life" @click="closeMenuIfOpen" class="nav-item" title="Life">
          <div class="nav-icon">
            <i class="fas fa-heart" aria-hidden="true"></i>
          </div>
          <span class="sr-only">Life</span>
        </router-link>
      </div>
    </div>
    
    <!-- Progress indicator for scrolling -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  data() {
    return {
      isScrolled: false,
      scrollProgress: 0
    }
  },
  computed: {
    pageTitle() {
      const routeName = this.$route.name;
      const path = this.$route.path;
      
      // Map route names to display titles
      const titleMap = {
        'aboutme': 'About Me',
        'research': 'Research',
        'ResearchDetails': 'Research',
        'talks': 'Talks',
        'TalkDetails': 'Talks',
        'poetry': 'Poetry',
        'PoetryDetails': 'Poetry',
        'blogs': 'Blogs',
        'BlogDetails': 'Blogs',
        'life': 'Life',
        'home': 'Home'
      };
      
      return titleMap[routeName] || '';
    }
  },
  methods: {
    closeMenuIfOpen() {
      // Method kept for compatibility but no longer needed
    },
    handleScroll() {
      // Track scroll position for navbar styling changes
      this.isScrolled = window.scrollY > 50;
      
      // Calculate scroll progress for progress bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.scrollProgress = (winScroll / height) * 100;
    }
  },
  mounted() {
    // Add scroll event listener for scroll-triggered effects
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
/* Base navbar styles - using unique class name to avoid conflicts */
.mlnomadpy-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  position: relative;
  z-index: 1000;
  background-color: var(--primary-bg);
  opacity: 0.95;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  flex-direction: column; /* Keep column for stacking context, but adjust internal layout */
  width: 100%;
  height: 70px; /* Restore unified height */
}

/* Title Bar - Desktop: Absolute Left */
.section-title-bar {
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  text-align: left;
  margin: 0;
  z-index: 1002;
  pointer-events: none;
  opacity: 0;
  animation: fadeIn 0.5s 0.2s forwards; /* Slight delay */
  display: flex;
  align-items: center;
}

.current-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem; /* Smaller, subtler */
  color: var(--accent-color, rgb(244, 165, 96));
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  background: rgba(0,0,0,0.3); /* Legibility bg */
  padding: 4px 10px;
  border-radius: 4px;
  border-left: 2px solid var(--accent-color);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 1100px) {
  /* On medium screens, title might overlap icons. Move to top or hide? 
     Let's move to top center nicely overlapping or just stack tightly */
  
  .mlnomadpy-navbar {
     height: auto;
     min-height: 70px;
     padding-top: 25px; /* Make space for title on top */
  }

  .section-title-bar {
    position: absolute;
    left: 50%;
    top: 5px;
    transform: translateX(-50%);
    width: auto;
    text-align: center;
  }
  
  .current-title {
    font-size: 0.75rem;
    padding: 2px 8px;
    background: none;
    border: none;
    border-bottom: 2px solid var(--accent-color);
  }
}

@media (max-width: 480px) {
   .mlnomadpy-navbar {
      height: auto;
      min-height: 80px; /* Needs slightly more for touch targets + title */
   }
}

.mlnomadpy-navbar.scrolled {
  padding: 10px 5px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
  background-color: var(--primary-bg-dark);
}

.mlnomadpy-navbar .navbar-container {
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

/* Decorative lines */
.mlnomadpy-navbar::after,
.mlnomadpy-navbar::before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  width: 50%;
  transform: scaleX(0);
  transition: transform 0.6s ease;
}

.mlnomadpy-navbar.scrolled::after,
.mlnomadpy-navbar.scrolled::before {
  transform: scaleX(0.7);
}

.mlnomadpy-navbar::before {
  left: 0;
  transform-origin: left;
}

.mlnomadpy-navbar::after {
  right: 0;
  transform-origin: right;
}

/* Navigation links container */
.mlnomadpy-navbar .nav-links {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

/* Individual navigation items */
.mlnomadpy-navbar a.nav-item {
  color: white;
  text-decoration: none;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  text-align: center;
  margin: 0;
}

/* Icon containers */
.mlnomadpy-navbar .nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 46px;
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.1);
}

.mlnomadpy-navbar a:hover .nav-icon {
  background-color: rgba(244, 165, 96, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Animated underlines for nav links */
.mlnomadpy-navbar a.nav-item:not(.home)::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--accent-color);
  transition: width 0.3s ease, left 0.3s ease;
}

.mlnomadpy-navbar a.nav-item:not(.home):hover::after {
  width: 70%;
  left: 15%;
}

/* Icons within navigation */
.mlnomadpy-navbar a i {
  font-size: 22px;
  transition: transform 0.3s ease;
}

/* Accessibility - Hide text visually but keep for screen readers */
.mlnomadpy-navbar .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Hover effects for navigation items */
.mlnomadpy-navbar a.nav-item:hover {
  background-color: rgba(244, 165, 96, 0.1);
  color: rgb(244, 165, 96);
  transform: translateY(-2px);
}

.mlnomadpy-navbar a:hover i {
  transform: scale(1.2);
}

/* Special home button styling */
.mlnomadpy-navbar .home {
  padding: 0 15px;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: scale(1.2);
}

.mlnomadpy-navbar .home-icon-container {
  background: linear-gradient(145deg, rgba(244, 165, 96, 0.8), rgba(244, 165, 96, 0.9));
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.mlnomadpy-navbar .home:hover .home-icon-container {
  transform: translateY(-5px) rotate(5deg);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  background: linear-gradient(145deg, rgb(244, 165, 96), rgb(255, 190, 120));
}

.mlnomadpy-navbar .home i {
  font-size: 28px;
  color: #2d0f41;
}

.mlnomadpy-navbar #home-link {
  margin: 0;
}

/* Style active links */
.mlnomadpy-navbar .router-link-active.nav-item:not(.home) {
  color: var(--accent-color) !important;
}

.mlnomadpy-navbar .router-link-active.nav-item:not(.home)::after {
  width: 100%;
  left: 0;
  height: 2px;
  background-color: rgb(244, 165, 96);
}

.mlnomadpy-navbar .router-link-active.nav-item:not(.home) .nav-icon {
  background-color: rgba(244, 165, 96, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(244, 165, 96, 0.3);
}

/* Active Home link styling */
.mlnomadpy-navbar .router-link-exact-active.home .home-icon-container {
  background: linear-gradient(145deg, rgb(244, 165, 96), rgb(255, 190, 120));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Add icon styles for each link */
.mlnomadpy-navbar a.nav-item:nth-child(1) i {
  color: #77aaff;
}

.mlnomadpy-navbar a.nav-item:nth-child(2) i {
  color: #66ddbb;
}

.mlnomadpy-navbar a.nav-item:nth-child(3) i {
  color: #ff88aa;
}

.mlnomadpy-navbar a.nav-item:nth-child(5) i {
  color: #ddaaff;
}

.mlnomadpy-navbar a.nav-item:nth-child(6) i {
  color: #ffcc66;
}

.mlnomadpy-navbar a.nav-item:nth-child(7) i {
  color: #ff6677;
}

/* Scroll progress indicator */
.mlnomadpy-navbar .scroll-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, rgb(244, 165, 96), rgb(255, 190, 120));
  width: 0%;
  transition: width 0.1s ease-out;
}

/* Mobile responsive styling */
@media (max-width: 992px) {
  .mlnomadpy-navbar {
    padding: 30px 5px 10px; /* Top padding reserved for title */
  }
  
  .mlnomadpy-navbar a.nav-item {
    padding: 8px 6px;
  }
  
  .mlnomadpy-navbar .nav-icon {
    height: 42px;
    width: 42px;
  }
  
  .mlnomadpy-navbar .home {
    transform: scale(1.1);
  }
  
  .mlnomadpy-navbar .home-icon-container {
    width: 50px;
    height: 50px;
  }
  
  .mlnomadpy-navbar .home i {
    font-size: 24px;
  }
  
  .mlnomadpy-navbar .scroll-progress {
    height: 2px;
  }
}

@media (max-width: 768px) {
  .mlnomadpy-navbar {
    padding: 30px 5px 10px;
  }
  
  /* Adjust icon size and margins */
  .mlnomadpy-navbar .nav-icon {
    height: 42px;
    width: 42px;
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  .mlnomadpy-navbar .home {
    transform: none;
  }
  
  .mlnomadpy-navbar .home-icon-container {
    width: 46px;
    height: 46px;
  }
  
  /* Adjust spacing for mobile */
  .mlnomadpy-navbar a.nav-item {
    padding: 8px 4px;
  }
  
  /* Enhance active indication */
  .mlnomadpy-navbar .router-link-active .nav-icon {
    background-color: rgba(244, 165, 96, 0.25);
    border: 1px solid rgba(244, 165, 96, 0.5);
    transform: scale(1.1);
  }
  
  .mlnomadpy-navbar a i {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .mlnomadpy-navbar {
    padding: 30px 2px 8px;
  }
  
  .mlnomadpy-navbar .nav-icon {
    height: 40px;
    width: 40px;
  }
  
  .mlnomadpy-navbar .home-icon-container {
    width: 44px;
    height: 44px;
  }
  
  .mlnomadpy-navbar .home i {
    font-size: 20px;
  }
  
  .mlnomadpy-navbar a.nav-item {
    padding: 5px 3px;
  }
  
  .mlnomadpy-navbar a i {
    font-size: 18px;
  }
  
  /* Improve tooltip visibility */
  .mlnomadpy-navbar a.nav-item:hover::before {
    font-size: 14px;
    padding: 6px 12px;
  }
}

@media (max-width: 360px) {
  .mlnomadpy-navbar .nav-icon {
    height: 38px;
    width: 38px;
    margin: 0 1px;
  }
  
  .mlnomadpy-navbar .home-icon-container {
    width: 42px;
    height: 42px;
  }
  
  .mlnomadpy-navbar a i {
    font-size: 17px;
  }
}

/* Enhance focus styles for accessibility */
.mlnomadpy-navbar a:focus {
  outline: 2px solid var(--accent-color, rgb(244, 165, 96));
  outline-offset: 2px;
}

/* Custom tooltip styling for browsers that don't support title attribute well */
.mlnomadpy-navbar a.nav-item:hover::before {
  content: attr(title);
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
  z-index: 1001;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Reduce motion settings for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .mlnomadpy-navbar a,
  .mlnomadpy-navbar .nav-icon,
  .mlnomadpy-navbar .nav-links,
  .mlnomadpy-navbar .home-icon-container {
    transition-duration: 0.1s;
  }
  
  .mlnomadpy-navbar a.nav-item:hover::before {
    animation: none;
    opacity: 1;
  }
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .mlnomadpy-navbar {
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
  }
  
  .mlnomadpy-navbar a.nav-item:hover::before {
    background-color: rgba(30, 30, 30, 0.95);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
}
</style> 
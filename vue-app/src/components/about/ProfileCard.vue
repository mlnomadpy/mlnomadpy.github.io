<template>
  <div class="profile-card">
    <div class="profile-image-container">
      <div class="profile-background"></div>
      <div class="profile-image">
        <img src="https://i.imgur.com/ScjU4Xr.png" alt="Taha Bouhsine" class="hover-effect">
      </div>
    </div>
    
    <div class="profile-info">
      <h2 class="profile-name">{{ name }}</h2>
      <h3 class="profile-title">{{ nativeTitle }}</h3>
      <p class="profile-tagline">{{ tagline }}</p>
      
      <div class="profile-quote">
        <blockquote>
          {{ quote }}
        </blockquote>
      </div>
      
      <div class="social-links">
        <a v-for="link in socialLinks" :key="link.name" 
           :href="link.url" 
           :target="link.external ? '_blank' : undefined" 
           :rel="link.external ? 'noopener noreferrer' : undefined"
           :aria-label="link.name" 
           :title="link.name">
          <i :class="link.icon" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    name: {
      type: String,
      default: 'Taha Bouhsine'
    },
    nativeTitle: {
      type: String,
      default: 'ⵉⵙⴽⴰⵏⵎⴰⴳⴰⵔ'
    },
    tagline: {
      type: String,
      default: 'ML Researcher & Engineer | Google Developer Expert in AI/ML | CEO of MLNomads'
    },
    quote: {
      type: String,
      default: 'I build bridges between mathematical foundations of machine learning and their practical applications, between black-box neural networks and cosmos-inspired safe and interpretable AI models'
    },
    socialLinks: {
      type: Array,
      default: () => [
        { 
          name: 'Google Scholar', 
          url: 'https://scholar.google.com/', 
          icon: 'fas fa-graduation-cap',
          external: true 
        },
        { 
          name: 'GitHub', 
          url: 'https://github.com/mlnomadpy', 
          icon: 'fab fa-github',
          external: true 
        },
        { 
          name: 'LinkedIn', 
          url: 'https://linkedin.com/in/Tahabsn', 
          icon: 'fab fa-linkedin',
          external: true 
        },
        { 
          name: 'Email', 
          url: 'mailto:tahabhs14@gmail.com', 
          icon: 'fas fa-envelope',
          external: false 
        },
        { 
          name: 'Personal Website', 
          url: 'https://www.tahabouhsine.com', 
          icon: 'fas fa-globe',
          external: true 
        }
      ]
    }
  },
  mounted() {
    // Apply animations to social links
    this.$nextTick(() => {
      const socialLinks = this.$el.querySelectorAll('.social-links a');
      socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          link.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          link.style.opacity = '1';
          link.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
      });
    });
  }
}
</script>

<style scoped>
/* Profile card styling */
.profile-card {
  width: 100%;
  height: 100%;
  /* Remove component-level background/shadow/border as parent handles it */
  background: transparent; 
  box-shadow: none;
  border: none;
  border-radius: 0;
  margin: 0;
  
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Image Section */
.profile-image-container {
  position: relative;
  height: 280px; /* Taller for sidebar look */
  flex-shrink: 0;
  overflow: hidden;
}

.profile-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(65, 44, 15, 0.8) 0%, rgba(90, 66, 28, 0.2) 100%);
  z-index: 1;
}

.profile-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 160px;
  height: 160px;
  border: 4px solid rgba(244, 165, 96, 0.5);
  border-radius: 50%; /* Circle */
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.profile-image:hover {
  transform: translate(-50%, -50%) scale(1.05);
  border-color: rgba(244, 165, 96, 0.9);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info Section */
.profile-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  z-index: 2;
  text-align: center; /* Center align for sidebar */
}

.profile-name {
  margin: 0;
  color: var(--accent-color, rgb(244, 165, 96));
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.profile-title {
  margin: 5px 0 15px;
  color: #ccc;
  font-size: 1.1rem;
  font-weight: 400;
  font-family: 'Space Mono', monospace;
}

.profile-tagline {
  margin: 0 0 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
}

.profile-quote {
  background: rgba(255, 165, 0, 0.05);
  border-left: 2px solid rgba(244, 165, 96, 0.5);
  padding: 15px;
  margin: auto 0 20px; /* Push to bottom if space permits, or just margin */
  border-radius: 0 8px 8px 0;
  text-align: left;
}

.profile-quote blockquote {
  margin: 0;
  font-style: italic;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #bbb;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: auto; /* Push to bottom of sidebar */
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(244, 165, 96, 0.8);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.social-links a:hover {
  background: rgba(244, 165, 96, 0.2);
  color: rgb(244, 165, 96);
  transform: translateY(-3px);
}

/* Responsive Styles */
/* Mobile Styles */
@media (max-width: 768px) {
  .profile-image-container {
    height: 220px;
  }
}

@media (max-width: 600px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }

  /* Restore Avatar Look for Mobile */
  .profile-image-container {
    width: 160px;
    height: 160px;
    margin: 0 auto 20px;
    border-radius: 50%;
    overflow: visible; /* Allow shadow */
  }

  .profile-background {
    display: none;
  }

  .profile-image {
    position: static;
    transform: none;
    width: 100%;
    height: 100%;
    border-width: 3px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .profile-image:hover {
    transform: scale(1.05);
  }

  .profile-info {
    text-align: center;
    padding: 0;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
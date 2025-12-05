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
  background: rgba(30, 30, 30, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  margin-bottom: 3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(244, 165, 96, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 100%;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.profile-image-container {
  position: relative;
  height: 200px;
  overflow: visible;
}

.profile-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #412c0f 0%, #5a421c 100%);
  z-index: 1;
}

.profile-image {
  position: absolute;
  bottom: -40px;
  left: 50px;
  z-index: 3;
  border: 4px solid rgba(244, 165, 96, 0.7);
  border-radius: 50%;
  overflow: hidden;
  width: 120px;
  height: 120px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-image:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  position: relative;
  padding: 30px 30px 30px 180px;
  z-index: 2;
}

.profile-name {
  margin: 0;
  color: var(--accent-color, rgb(244, 165, 96));
  font-size: 1.8rem;
}

.profile-title {
  margin: 5px 0;
  color: #ccc;
  font-size: 1.2rem;
  font-weight: normal;
}

.profile-tagline {
  margin: 10px 0 20px;
  color: #fff;
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.8;
}

.profile-quote {
  background: rgba(20, 20, 20, 0.3);
  border-left: 3px solid var(--accent-color, rgb(244, 165, 96));
  padding: 15px;
  margin: 20px 0;
  border-radius: 4px;
}

.profile-quote blockquote {
  margin: 0;
  font-style: italic;
  line-height: 1.5;
  color: #eee;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 25px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(244, 165, 96, 0.1);
  color: var(--accent-color, rgb(244, 165, 96));
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: rgba(244, 165, 96, 0.9);
  color: #222;
  transform: translateY(-3px);
}

@media (min-width: 768px) {
  .profile-card {
    flex-direction: row;
    align-items: stretch;
  }
  
  .profile-image-container {
    width: 30%;
    height: auto;
    overflow: hidden;
  }
  
  .profile-background {
    background: linear-gradient(90deg, #412c0f 0%, #5a421c 100%);
  }
  
  .profile-image {
    top: 50%;
    left: 50%;
    bottom: auto;
    transform: translate(-50%, -50%);
    width: 160px;
    height: 160px;
  }
  
  .profile-image:hover {
    transform: translate(-50%, -50%) scale(1.05);
  }
  
  .profile-info {
    width: 70%;
    padding: 30px;
  }
}

@media (max-width: 767px) {
  .profile-image-container {
    margin-bottom: 50px;
  }

  .profile-card {
    margin-bottom: 2rem;
    margin-left: 4px;
    margin-right: 4px;
    width: calc(100% - 8px);
  }
  
  .profile-info {
    padding: 60px 15px 20px;
  }
  
  .profile-tagline {
    font-size: 1rem;
    white-space: normal;
    word-wrap: break-word;
  }
  
  .profile-quote {
    padding: 12px;
  }
  
  .profile-quote blockquote {
    font-size: 0.95rem;
  }
  
  .social-links {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .profile-card {
    margin-left: 2px;
    margin-right: 2px;
    width: calc(100% - 4px);
    border-radius: 12px;
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
    left: 20px;
  }
  
  .profile-name {
    font-size: 1.6rem;
  }
  
  .profile-title {
    font-size: 1.1rem;
  }
  
  .profile-info {
    padding: 60px 10px 20px;
  }
  
  .profile-tagline {
    font-size: 0.95rem;
  }
}
</style>
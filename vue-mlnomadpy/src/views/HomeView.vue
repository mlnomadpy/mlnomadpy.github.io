<template>
  <div class="home">
    <div class="hero-sec">
      <video autoplay muted loop>
        <source src="@/assets/background-video.mp4" type="video/mp4" onerror="this.parentElement.remove()">
      </video>
      <div class="circle-container">
        <img src="@/assets/mlnomads-main-hero.png" alt="MLNomads Logo" onerror="this.src='https://i.imgur.com/TwYAtdu.png'" class="hero-logo">
        <div class="circle-text">
          <h1>Taha Bouhsine</h1>
          <p>ML Researcher & Engineer</p>
          <a href="https://linkedin.com/in/Tahabsn" target="_blank" class="join-btn">Connect</a>
        </div>
      </div>
      <SandStorm />
      <div class="social-icons">
        <a href="https://scholar.google.com/" target="_blank" aria-label="Google Scholar"><i class="fas fa-graduation-cap"></i></a>
        <a href="https://github.com/mlnomadpy" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/Tahabsn" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="mailto:tahabhs14@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
        <a href="https://www.tahabouhsine.com" target="_blank" aria-label="Personal Website"><i class="fas fa-globe"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import SandStorm from '@/components/SandStorm.vue'

export default {
  name: 'HomeView',
  components: {
    SandStorm
  }
}
</script>

<style scoped>
.hero-sec {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-sec video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.hero-sec::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-sec * {
  position: relative;
  z-index: 2;
}

.circle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 40px;
}

.hero-logo {
  width: 200px;
  margin-bottom: 20px;
}

.circle-text h1 {
  margin: 10px 0;
  font-size: 2.5rem;
  animation: blink 1s infinite;
  border-right: 10px solid #fff;
  display: inline-block;
  padding-right: 5px;
}

.circle-text p {
  margin: 10px 0;
  font-size: 1.2rem;
}

.join-btn {
  display: block;
  width: 100px;
  margin: 20px auto;
  padding: 10px;
  background-color: rgba(2, 2, 2, 0.273);
  color: rgb(255, 255, 255);
  border: 2px solid white;
  border-radius: 0;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.join-btn:hover {
  background-color: rgb(244, 165, 96);
  color: #41230f;
}

.social-icons {
  margin-top: 30px;
  text-align: center;
}

.social-icons a {
  margin: 0 10px;
  color: white;
  font-size: 24px;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: rgb(244, 165, 96);
}

@keyframes blink {
  0% {
    border-right-color: transparent;
  }
  50% {
    border-right-color: transparent;
  }
  51% {
    border-right-color: #fff;
  }
  100% {
    border-right-color: #fff;
  }
}

@media (max-width: 768px) {
  .circle-text h1 {
    font-size: 2rem;
    border-right: 4px solid #fff;
  }
  
  .hero-logo {
    width: 150px;
  }
  
  .social-icons a {
    font-size: 20px;
    margin: 0 8px;
  }
}

@media (max-width: 480px) {
  .circle-text h1 {
    font-size: 1.5rem;
  }
  
  .circle-text p {
    font-size: 1rem;
  }
  
  .hero-logo {
    width: 120px;
  }
}
</style> 
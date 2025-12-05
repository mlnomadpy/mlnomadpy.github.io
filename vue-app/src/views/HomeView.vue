<template>
  <div class="home">
    <div class="hero-sec">
      <video autoplay muted loop playsinline>
        <source src="@/assets/background-video.mp4" type="video/mp4" onerror="this.parentElement.remove()">
      </video>
      
      <div class="center-content">
        <div class="circle-text">
          <h1>Taha Bouhsine</h1>
          <p>ML Researcher &amp; Engineer</p>
          <a href="https://linkedin.com/in/Tahabsn" target="_blank" class="join-btn">Connect</a>
          
          <div class="social-icons">
            <a href="https://scholar.google.com/citations?hl=en&user=IsBjb3EAAAAJ" target="_blank" aria-label="Google Scholar" class="social-link"><i class="fas fa-graduation-cap"></i></a>
            <a href="https://github.com/mlnomadpy" target="_blank" aria-label="GitHub" class="social-link"><i class="fab fa-github"></i></a>
            <a href="https://linkedin.com/in/Tahabsn" target="_blank" aria-label="LinkedIn" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="mailto:contact@tahabouhsine.com" aria-label="Email" class="social-link"><i class="fas fa-envelope"></i></a>
            <a href="https://www.tahabouhsine.com" target="_blank" aria-label="Personal Website" class="social-link"><i class="fas fa-globe"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.hero-sec {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.hero-sec video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.center-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-text {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 1s ease-in-out;
  padding: 0 20px;
  transform: translateY(-5vh); /* Slight adjustment to visually center */
}

.circle-text h1,
.circle-text p {
  margin: 10px 0;
  text-align: center;
  width: 100%;
}

.circle-text h1 {
  font-size: 3rem;
  animation: blink 1s infinite;
  border-right: 8px solid #fff;
  padding-right: 5px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  white-space: nowrap;
  width: fit-content;
}

.circle-text p {
  font-size: 1.4rem;
  opacity: 0.9;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  margin: 15px 0;
  text-align: center;
  align-self: center;
  width: auto;
}

.hero-logo {
  width: 200px;
  margin-bottom: 20px;
  max-width: 100%;
  height: auto;
}

.join-btn {
  display: block;
  width: 140px;
  margin: 25px auto 0;
  padding: 12px 20px;
  background-color: rgba(2, 2, 2, 0.273);
  color: rgb(255, 255, 255);
  border: 2px solid white;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.join-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.5s ease;
}

.join-btn:hover::before {
  left: 100%;
}

.join-btn:hover {
  background-color: rgb(244, 165, 96);
  color: #41230f;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.join-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.social-icons {
  margin-top: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
  color: white;
  font-size: 18px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
}

.social-link:hover {
  color: rgb(244, 165, 96);
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-color: rgba(244, 165, 96, 0.4);
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 992px) {
  .circle-text h1 {
    font-size: 2.5rem;
  }
  
  .circle-text p {
    font-size: 1.3rem;
  }
  
  .social-link {
    width: 44px;
    height: 44px;
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .circle-text h1 {
    font-size: 2.2rem;
    border-right: 6px solid #fff;
  }
  
  .circle-text p {
    font-size: 1.25rem;
  }
  
  .hero-logo {
    width: 150px;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 18px;
    margin: 0 6px;
  }
  
  .join-btn {
    width: 140px;
    padding: 12px 15px;
    font-size: 1.1rem;
  }
  
  .social-icons {
    margin-top: 30px;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .circle-text h1 {
    font-size: 1.9rem;
    border-right: 4px solid #fff;
  }
  
  .circle-text p {
    font-size: 1.15rem;
    margin: 12px 0;
  }
  
  .hero-logo {
    width: 120px;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
  
  .social-icons {
    margin-top: 25px;
    gap: 12px;
  }
  
  .join-btn {
    width: 140px;
    padding: 12px 15px;
    margin-top: 20px;
    font-size: 1.05rem;
  }
}

@media (max-width: 360px) {
  .circle-text h1 {
    font-size: 1.8rem;
  }
  
  .circle-text p {
    font-size: 1.1rem;
    margin: 10px 0;
  }
  
  .social-link {
    width: 38px;
    height: 38px;
    font-size: 16px;
  }
  
  .social-icons {
    margin-top: 20px;
    gap: 12px;
  }
  
  .join-btn {
    width: 130px;
    padding: 12px 15px;
  }
}

@media (max-height: 600px) {
  .social-icons {
    margin-top: 20px;
    gap: 12px;
  }
  
  .social-link {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
  
  .join-btn {
    margin: 15px auto 0;
    padding: 12px 15px;
  }
}
</style> 
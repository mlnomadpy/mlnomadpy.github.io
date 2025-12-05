<template>
  <div class="social-icons">
    <a href="https://scholar.google.com/citations?hl=en&user=IsBjb3EAAAAJ" target="_blank" aria-label="Google Scholar" class="social-link"><i class="fas fa-graduation-cap"></i></a>
    <a href="https://github.com/mlnomadpy" target="_blank" aria-label="GitHub" class="social-link"><i class="fab fa-github"></i></a>
    <a href="https://linkedin.com/in/Tahabsn" target="_blank" aria-label="LinkedIn" class="social-link"><i class="fab fa-linkedin"></i></a>
    <a href="mailto:contact@tahabouhsine.com" aria-label="Email" class="social-link"><i class="fas fa-envelope"></i></a>
    <a href="https://www.tahabouhsine.com" target="_blank" aria-label="Personal Website" class="social-link"><i class="fas fa-globe"></i></a>
  </div>
</template>

<script>
export default {
  name: 'SocialLinks'
}
</script>

<style scoped>
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

@media (max-width: 992px) {
  .social-link {
    width: 44px;
    height: 44px;
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 18px;
    margin: 0 6px;
  }
  
  .social-icons {
    margin-top: 30px;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
  
  .social-icons {
    margin-top: 25px;
    gap: 12px;
  }
}

@media (max-width: 360px) {
  .social-link {
    width: 38px;
    height: 38px;
    font-size: 16px;
  }
  
  .social-icons {
    margin-top: 20px;
    gap: 12px;
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
}
</style>

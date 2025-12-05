<template>
  <div class="construction-message glass-panel">
    <div class="icon-container">
      <i class="fas fa-pen-fancy"></i>
    </div>
    <h2>Thoughts in Progress</h2>
    <p>I'm currently curating a collection of articles on Machine Learning, AI ethics, and software engineering. Check back soon for deep dives and tutorials.</p>
    
    <div class="newsletter-signup">
      <p>Want to be notified when I publish?</p>
      <div class="input-group">
        <input type="email" placeholder="Enter your email" disabled aria-label="Email address for newsletter subscription">
        <button class="btn-primary" disabled>Subscribe</button>
      </div>
      <span class="coming-soon-badge">Coming Soon</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConstructionMessage'
}
</script>

<style scoped>
.construction-message {
  text-align: center;
  padding: 50px;
  border-radius: 20px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}

.icon-container {
  font-size: 4rem;
  color: var(--accent-color);
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

.construction-message h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: var(--primary-text);
}

.construction-message p {
  color: var(--secondary-text);
  margin-bottom: 30px;
  line-height: 1.6;
  font-size: 1.1rem;
}

.newsletter-signup {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--glass-border);
  position: relative;
}

.input-group {
  display: flex;
  gap: 10px;
  max-width: 400px;
  margin: 20px auto 0;
  opacity: 0.6; /* Disabled look */
}

.input-group input {
  flex: 1;
  padding: 12px 20px;
  border-radius: 30px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--primary-text);
}

.coming-soon-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-5deg);
  background: var(--accent-color);
  color: var(--primary-bg);
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }
  
  .construction-message {
    padding: 30px 20px;
  }
}
</style>

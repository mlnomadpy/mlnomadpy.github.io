<template>
  <div class="coming-soon">
    <div class="coming-soon-hero">
      <div class="icon-container">
        <i class="fas fa-pen-fancy" aria-hidden="true"></i>
      </div>
      <h2>Coming Soon</h2>
      <p class="subtitle">Deep dives into Machine Learning, AI ethics, and software engineering.</p>
    </div>

    <div class="topics-preview">
      <h3>Upcoming Topics</h3>
      <div class="topic-cards">
        <div class="topic-card" v-for="topic in topics" :key="topic.icon">
          <i :class="topic.icon" aria-hidden="true"></i>
          <span>{{ topic.label }}</span>
        </div>
      </div>
    </div>

    <div class="explore-instead">
      <p>In the meantime, explore:</p>
      <div class="alt-links">
        <router-link to="/talks" class="alt-link">
          <i class="fas fa-microphone" aria-hidden="true"></i>
          Talks & Workshops
        </router-link>
        <router-link to="/poetry" class="alt-link">
          <i class="fas fa-feather-alt" aria-hidden="true"></i>
          Poetry
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConstructionMessage',
  data() {
    return {
      topics: [
        { icon: 'fas fa-brain', label: 'Interpretable AI' },
        { icon: 'fas fa-network-wired', label: 'Representation Learning' },
        { icon: 'fas fa-balance-scale', label: 'AI Ethics' },
        { icon: 'fas fa-code', label: 'Engineering Practices' }
      ]
    }
  }
}
</script>

<style scoped>
.coming-soon {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.coming-soon-hero {
  text-align: center;
  padding: 40px 30px;
  background: var(--card-bg, linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8)));
  border-radius: var(--card-radius, 12px);
  border: var(--card-border, 1px solid rgba(244, 165, 96, 0.1));
}

.icon-container {
  font-size: 3rem;
  color: var(--accent-color);
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;
}

.coming-soon-hero h2 {
  font-size: 1.8rem;
  margin: 0 0 12px;
  color: var(--primary-text);
}

.subtitle {
  color: var(--secondary-text);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.topics-preview h3 {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent-color);
  margin: 0 0 16px;
  text-align: center;
}

.topic-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.topic-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  color: var(--secondary-text);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.topic-card i {
  color: var(--accent-color);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.topic-card:hover {
  border-color: rgba(244, 165, 96, 0.2);
  background: rgba(244, 165, 96, 0.05);
}

.explore-instead {
  text-align: center;
}

.explore-instead p {
  color: var(--secondary-text);
  font-size: 0.95rem;
  margin: 0 0 16px;
}

.alt-links {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.alt-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid rgba(244, 165, 96, 0.3);
  border-radius: 8px;
  color: var(--accent-color);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.alt-link:hover {
  background: rgba(244, 165, 96, 0.1);
  transform: translateY(-2px);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 480px) {
  .coming-soon-hero { padding: 30px 20px; }
  .topic-cards { grid-template-columns: 1fr 1fr; }
  .alt-links { flex-direction: column; align-items: center; }
}
</style>

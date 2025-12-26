<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-content" role="dialog" aria-modal="true">
        <button class="close-btn" @click="$emit('close')" aria-label="Close details">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-header">
          <div class="header-main">
            <h2 class="modal-title">{{ item.title }}</h2>
            <div class="modal-meta">
              <span v-if="item.period" class="meta-tag date">
                <i class="far fa-calendar-alt"></i> {{ item.period }}
              </span>
              <span v-if="item.location" class="meta-tag location">
                <i class="fas fa-map-marker-alt"></i> {{ item.location }}
              </span>
            </div>
          </div>
          <h3 v-if="item.subtitle || item.company" class="modal-subtitle">
            {{ item.subtitle || item.company }}
          </h3>
        </div>

        <div class="modal-body scrollable-custom">
          <p v-if="item.description" class="description">{{ item.description }}</p>

          <!-- List of simple details -->
          <div v-if="item.details && item.details.length" class="details-list">
            <h4>Key Highlights</h4>
            <ul>
              <li v-for="(detail, i) in item.details" :key="i">{{ detail }}</li>
            </ul>
          </div>

          <!-- Sectioned details (e.g. for Experience) -->
          <div v-if="item.sections && item.sections.length" class="sections-list">
            <div v-for="(section, sIndex) in item.sections" :key="sIndex" class="detail-section">
              <h4>{{ section.title }}</h4>
              <ul>
                <li v-for="(detail, dIndex) in section.details" :key="dIndex">{{ detail }}</li>
              </ul>
            </div>
          </div>
          
          <!-- Skills / Tags -->
          <div v-if="item.skills || (item.tags && item.tags.length)" class="skills-section">
            <h4>{{ item.skills ? 'Skills' : 'Tags' }}</h4>
            <div class="skills-tags">
              <span v-if="item.skills" class="skill-tag">{{ item.skills }}</span>
              <span v-for="tag in item.tags" :key="tag" class="skill-tag">{{ tag }}</span>
            </div>
          </div>

          <!-- Links/Actions -->
          <div v-if="item.links || item.url || item.link" class="modal-actions">
            <!-- Single Link -->
            <a v-if="item.url || item.link" :href="item.url || item.link" target="_blank" rel="noopener noreferrer" class="action-btn">
              Visit Link <i class="fas fa-external-link-alt"></i>
            </a>
            <!-- Array of Links -->
            <template v-if="item.links">
              <a 
                v-for="(linkItem, lIndex) in item.links" 
                :key="lIndex"
                :href="linkItem.url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="action-btn"
              >
                {{ linkItem.text }} <i class="fas fa-external-link-alt"></i>
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DetailModal',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  mounted() {
    document.body.style.overflow = 'hidden'; // Lock body scroll
  },
  beforeUnmount() {
    document.body.style.overflow = ''; // Unlock body scroll
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  background: #1e1e1e;
  width: 100%;
  max-width: 700px;
  max-height: 85vh;
  border-radius: 16px;
  border: 1px solid rgba(244, 165, 96, 0.2);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(244, 165, 96, 0.8);
  color: #000;
  transform: rotate(90deg);
}

.modal-header {
  padding: 2rem 2rem 1.5rem;
  background: linear-gradient(to bottom, rgba(30, 30, 30, 1), rgba(30, 30, 30, 0.95));
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.header-main {
  margin-bottom: 0.5rem;
}

.modal-title {
  font-size: 1.8rem;
  color: var(--accent-color, rgb(244, 165, 96));
  margin: 0 0 0.5rem;
  line-height: 1.2;
}

.modal-subtitle {
  font-size: 1.2rem;
  color: #ddd;
  font-weight: 500;
  margin: 0;
}

.modal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.meta-tag {
  font-size: 0.9rem;
  color: #aaa;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 10px;
  border-radius: 12px;
}

.meta-tag i {
  color: var(--accent-color, rgb(244, 165, 96));
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
  flex-grow: 1;
}

.description {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #eee;
  margin-bottom: 2rem;
}

h4 {
  color: var(--accent-color, rgb(244, 165, 96));
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.details-list ul,
.sections-list ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.details-list li,
.sections-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.8rem;
  color: #ccc;
  line-height: 1.5;
}

.details-list li::before,
.sections-list li::before {
  content: "•";
  color: var(--accent-color, rgb(244, 165, 96));
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: -4px;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.skills-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  background: rgba(244, 165, 96, 0.1);
  color: var(--accent-color, rgb(244, 165, 96));
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  display: inline-block;
}

.modal-actions {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 20px;
  border-radius: 25px;
  background: var(--accent-color, rgb(244, 165, 96));
  color: #1e1e1e;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(244, 165, 96, 0.3);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(244, 165, 96, 0.4);
  background: #fff;
}

/* Scrollbar */
.scrollable-custom::-webkit-scrollbar {
  width: 6px;
}
.scrollable-custom::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
}
.scrollable-custom::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

/* Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content {
  animation: modalSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-fade-leave-active .modal-content {
  animation: modalSlideIn 0.3s reverse;
}

@keyframes modalSlideIn {
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (max-width: 600px) {
  .modal-content {
    height: 100%;
    max-height: 100%;
    border-radius: 0;
    border: none;
  }
  
  .modal-header {
    padding: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
}
</style>

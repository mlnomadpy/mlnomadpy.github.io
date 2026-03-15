<template>
  <div class="about-me view-container">
    <div class="about-layout">
      <!-- Tab Navigation -->
      <div class="tabs-strip">
        <tab-navigation
          :activeTab="activeTab"
          :tabs="tabs"
          @tab-change="setActiveTab"
        />
      </div>

      <!-- Tab Content -->
      <div class="tab-content-area">
        <transition name="fade-slide" mode="out-in">
          <!-- Identity -->
          <div v-if="activeTab === 'identity'" class="tab-panel" key="identity">
            <div class="identity-layout">
              <!-- Profile Hero -->
              <div class="profile-hero">
                <div class="profile-avatar">
                  <img src="https://i.imgur.com/ScjU4Xr.png" alt="Taha Bouhsine">
                </div>
                <div class="profile-details">
                  <h1 class="profile-name">{{ profileData.name }}</h1>
                  <p class="profile-native">{{ profileData.nativeTitle }}</p>
                  <p class="profile-tagline">{{ profileData.tagline }}</p>
                  <div class="profile-socials">
                    <a v-for="link in profileData.socialLinks" :key="link.name"
                       :href="link.url"
                       :target="link.external ? '_blank' : undefined"
                       :rel="link.external ? 'noopener noreferrer' : undefined"
                       :aria-label="link.name"
                       :title="link.name"
                       class="social-btn"
                    >
                      <i :class="link.icon" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Quote -->
              <blockquote class="profile-quote">
                <i class="fas fa-quote-left quote-icon" aria-hidden="true"></i>
                {{ profileData.quote }}
              </blockquote>

              <!-- Stats -->
              <div class="stats-grid">
                <div v-for="stat in statsHighlights" :key="stat.label" class="stat-card">
                  <i :class="stat.icon" aria-hidden="true"></i>
                  <span class="stat-value">{{ stat.value }}</span>
                  <span class="stat-label">{{ stat.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Story -->
          <div v-else-if="activeTab === 'story'" class="tab-panel story-panel" key="story">
            <story-tab :storyItems="storyItems" />
          </div>

          <!-- Education -->
          <div v-else-if="activeTab === 'education'" class="tab-panel" key="education">
            <transition name="fade" mode="out-in">
              <compact-list
                v-if="viewMode === 'list'"
                title="Education"
                icon="fas fa-graduation-cap"
                :items="educationItems"
                @item-click="openDetail"
              >
                <template #controls>
                  <button class="view-toggle-btn" @click="toggleViewMode" title="Switch to Timeline View">
                    <i class="fas fa-stream"></i> Timeline
                  </button>
                </template>
              </compact-list>
              <timeline-list
                v-else
                title="Education"
                icon="fas fa-graduation-cap"
                :items="educationItems"
              >
                <template #before-list>
                  <div class="list-controls-bar">
                    <button class="view-toggle-btn active" @click="toggleViewMode" title="Switch to List View">
                      <i class="fas fa-list"></i> Compact List
                    </button>
                  </div>
                </template>
              </timeline-list>
            </transition>
          </div>

          <!-- Experience -->
          <div v-else-if="activeTab === 'experience'" class="tab-panel" key="experience">
            <transition name="fade" mode="out-in">
              <compact-list
                v-if="viewMode === 'list'"
                title="Experience"
                icon="fas fa-briefcase"
                :items="experienceItems"
                @item-click="openDetail"
              >
                <template #controls>
                  <button class="view-toggle-btn" @click="toggleViewMode" title="Switch to Timeline View">
                    <i class="fas fa-stream"></i> Timeline
                  </button>
                </template>
              </compact-list>
              <timeline-list
                v-else
                title="Experience"
                icon="fas fa-briefcase"
                :items="experienceItems"
              >
                <template #before-list>
                  <div class="list-controls-bar">
                    <button class="view-toggle-btn active" @click="toggleViewMode" title="Switch to List View">
                      <i class="fas fa-list"></i> Compact List
                    </button>
                  </div>
                </template>
                <template v-slot:item="{ item }">
                  <ExperienceItem :item="item" />
                </template>
              </timeline-list>
            </transition>
          </div>

          <!-- Awards -->
          <div v-else-if="activeTab === 'awards'" class="tab-panel" key="awards">
            <transition name="fade" mode="out-in">
              <compact-list
                v-if="viewMode === 'list'"
                title="Honors & Awards"
                icon="fas fa-trophy"
                :items="awardItems"
                @item-click="openDetail"
              >
                <template #controls>
                  <button class="view-toggle-btn" @click="toggleViewMode" title="Switch to Timeline View">
                    <i class="fas fa-stream"></i> Timeline
                  </button>
                </template>
              </compact-list>
              <timeline-list
                v-else
                title="Honors & Awards"
                icon="fas fa-trophy"
                :items="awardItems"
              >
                <template #before-list>
                  <div class="list-controls-bar">
                    <button class="view-toggle-btn active" @click="toggleViewMode" title="Switch to List View">
                      <i class="fas fa-list"></i> Compact List
                    </button>
                  </div>
                </template>
              </timeline-list>
            </transition>
          </div>

          <!-- Skills -->
          <div v-else-if="activeTab === 'skills'" class="tab-panel" key="skills">
            <div class="skills-section">
              <div class="section-header">
                <i class="fas fa-code"></i>
                <h2>Skills & Technologies</h2>
              </div>
              <div class="skill-groups">
                <div v-for="group in skillGroups" :key="group.title" class="skill-group">
                  <div class="skill-group-header">
                    <i :class="group.icon" aria-hidden="true"></i>
                    <h3>{{ group.title }}</h3>
                  </div>
                  <div class="skill-bars">
                    <div v-for="(skill, i) in group.skills" :key="skill.name" class="skill-bar-item"
                         :style="{ '--delay': i * 0.08 + 's' }">
                      <div class="skill-bar-header">
                        <span class="skill-name">{{ skill.name }}</span>
                        <span class="skill-pct">{{ skill.level }}%</span>
                      </div>
                      <div class="skill-bar-track">
                        <div class="skill-bar-fill" :style="{ '--target-width': skill.level + '%' }"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div v-else-if="activeTab === 'certifications'" class="tab-panel" key="certifications">
            <transition name="fade" mode="out-in">
              <compact-list
                v-if="viewMode === 'list'"
                title="Certifications"
                icon="fas fa-certificate"
                :items="certificates"
                @item-click="openDetail"
              >
                <template #controls>
                  <button class="view-toggle-btn" @click="toggleViewMode" title="Switch to Grid View">
                    <i class="fas fa-th-large"></i> Grid
                  </button>
                </template>
              </compact-list>
              <card-grid
                v-else
                title="Certifications"
                icon="fas fa-certificate"
                :items="certificates"
                type="certification"
              >
                <template #before-grid>
                  <div class="list-controls-bar">
                    <button class="view-toggle-btn active" @click="toggleViewMode" title="Switch to List View">
                      <i class="fas fa-list"></i> Compact List
                    </button>
                  </div>
                </template>
              </card-grid>
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <!-- Detail Modal -->
    <detail-modal
      v-if="selectedItem"
      :item="selectedItem"
      @close="closeDetail"
    />
  </div>
</template>

<script>
import TabNavigation from '@/components/about/TabNavigation.vue';
import StoryTab from '@/components/about/StoryTab.vue';
import TimelineList from '@/components/about/TimelineList.vue';
import CompactList from '@/components/about/CompactList.vue';
import CardGrid from '@/components/about/CardGrid.vue';
import ExperienceItem from '@/components/about/ExperienceItem.vue';
import DetailModal from '@/components/about/DetailModal.vue';

import {
  tabs,
  storyItems,
  skillGroups,
  certificates,
  educationItems,
  awardItems,
  experienceItems,
  profileData,
  statsHighlights
} from '@/data/about-me-data';

import { useHead } from '@vueuse/head';

export default {
  name: 'AboutMeView',
  components: {
    TabNavigation,
    StoryTab,
    TimelineList,
    CompactList,
    CardGrid,
    ExperienceItem,
    DetailModal
  },
  setup() {
    useHead({
      title: 'About Taha Bouhsine | ML Researcher & Engineer',
      meta: [
        { name: 'description', content: 'Learn about Taha Bouhsine, his story, experience, and skills in Machine Learning and AI.' },
        { property: 'og:title', content: 'About Taha Bouhsine' },
        { property: 'og:description', content: 'ML Researcher & Engineer | Google Developer Expert in AI/ML' },
        { rel: 'canonical', href: 'https://www.tahabouhsine.com/aboutme' }
      ]
    });

    return {
      tabs, storyItems, skillGroups, certificates,
      educationItems, awardItems, experienceItems,
      profileData, statsHighlights
    }
  },
  data() {
    return {
      activeTab: 'identity',
      viewMode: 'list',
      selectedItem: null
    }
  },
  methods: {
    setActiveTab(tab) {
      if (this.activeTab !== tab) {
        this.activeTab = tab;
        this.selectedItem = null;
        if (window.innerWidth < 768) {
          const area = this.$el.querySelector('.tab-content-area');
          if (area) setTimeout(() => area.scrollTo({ top: 0, behavior: 'smooth' }), 100);
        }
      }
    },
    toggleViewMode() {
      this.viewMode = this.viewMode === 'list' ? 'timeline' : 'list';
    },
    openDetail(item) {
      this.selectedItem = item;
    },
    closeDetail() {
      this.selectedItem = null;
    }
  }
}
</script>

<style scoped>
/* === Layout === */
.view-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.about-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tabs-strip {
  flex-shrink: 0;
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 10;
}

.tab-content-area {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  height: 0;
}

.tab-panel {
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
}

.story-panel {
  max-width: 100%;
  height: 100%;
}

/* === Identity Layout === */
.identity-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-hero {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.profile-avatar {
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(244, 165, 96, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 6px rgba(244, 165, 96, 0.08);
  transition: all 0.4s ease;
}

.profile-avatar:hover {
  border-color: rgba(244, 165, 96, 0.8);
  transform: scale(1.04);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-details {
  flex: 1;
  min-width: 0;
}

.profile-name {
  margin: 0 0 0.25rem;
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
}

.profile-native {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: var(--accent-color, rgb(244, 165, 96));
  font-family: 'Space Mono', monospace;
  opacity: 0.8;
}

.profile-tagline {
  margin: 0 0 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.5;
}

.profile-socials {
  display: flex;
  gap: 10px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  transition: all 0.25s ease;
}

.social-btn:hover {
  background: rgba(244, 165, 96, 0.15);
  border-color: rgba(244, 165, 96, 0.4);
  color: var(--accent-color, rgb(244, 165, 96));
  transform: translateY(-3px);
}

/* Quote */
.profile-quote {
  margin: 0;
  padding: 1.25rem 1.5rem;
  background: rgba(244, 165, 96, 0.04);
  border-left: 3px solid rgba(244, 165, 96, 0.5);
  border-radius: 0 12px 12px 0;
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
}

.quote-icon {
  color: rgba(244, 165, 96, 0.3);
  font-size: 0.9rem;
  margin-right: 8px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 1.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(244, 165, 96, 0.06);
  border-color: rgba(244, 165, 96, 0.2);
  transform: translateY(-4px);
}

.stat-card i {
  font-size: 1.3rem;
  color: var(--accent-color, rgb(244, 165, 96));
  opacity: 0.7;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* === Section Header === */
.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(244, 165, 96, 0.15);
}

.section-header i {
  font-size: 1.5rem;
  color: var(--accent-color, rgb(244, 165, 96));
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

/* === Skills === */
.skills-section { width: 100%; }

.skill-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.skill-group {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.skill-group-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}

.skill-group-header i {
  font-size: 1.1rem;
  color: var(--accent-color, rgb(244, 165, 96));
}

.skill-group-header h3 {
  margin: 0;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

.skill-bars {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.skill-bar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.skill-name {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
}

.skill-pct {
  font-size: 0.75rem;
  color: var(--accent-color, rgb(244, 165, 96));
  font-weight: 600;
  font-family: 'Space Mono', monospace;
}

.skill-bar-track {
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 100px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--accent-color, rgb(244, 165, 96)), rgba(244, 165, 96, 0.5));
  border-radius: 100px;
  animation: fillBar 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes fillBar {
  to { width: var(--target-width); }
}

/* === View Toggle === */
.view-toggle-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.view-toggle-btn:hover {
  background: rgba(244, 165, 96, 0.12);
  color: var(--accent-color, rgb(244, 165, 96));
  border-color: rgba(244, 165, 96, 0.3);
}

.view-toggle-btn.active {
  background: rgba(244, 165, 96, 0.1);
  color: var(--accent-color, rgb(244, 165, 96));
  border-color: rgba(244, 165, 96, 0.25);
}

.list-controls-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

/* === Transitions === */
.fade-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* === Responsive === */
@media (max-width: 768px) {
  .tab-content-area { padding: 1.25rem; }

  .profile-hero {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .profile-avatar {
    width: 130px;
    height: 130px;
  }

  .profile-name { font-size: 1.8rem; }

  .profile-socials { justify-content: center; }

  .profile-quote { text-align: center; border-left: none; border-top: 3px solid rgba(244, 165, 96, 0.5); border-radius: 0 0 12px 12px; }

  .stats-grid { grid-template-columns: repeat(2, 1fr); }

  .stat-value { font-size: 1.5rem; }

  .skill-groups { grid-template-columns: 1fr; }

  .section-header h2 { font-size: 1.3rem; }
  .section-header i { font-size: 1.3rem; }
}

@media (max-width: 480px) {
  .tab-content-area { padding: 1rem; }
  .profile-avatar { width: 110px; height: 110px; }
  .profile-name { font-size: 1.5rem; }
  .stat-card { padding: 1rem 0.5rem; }
  .stat-value { font-size: 1.3rem; }
}
</style>

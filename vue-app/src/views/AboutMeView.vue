<template>
  <div class="about-me view-container">
    <div class="section-content scrollable-content smooth-scroll">

      
      <div class="unified-card">
        <!-- Main Content Section (Now containing everything including Identity) -->
        <main class="content-section">
          <div class="tabs-container">
            <tab-navigation 
              :activeTab="activeTab"
              :tabs="tabs"
              @tab-change="setActiveTab"
            />
          </div>
          
          <div class="tab-content-area">
          <transition name="fade-slide" mode="out-in">
            <!-- Identity Tab Panel -->
            <div v-if="activeTab === 'identity'" class="tab-panel identity-panel" key="identity">
              <profile-card v-bind="profileData" />
            </div>

            <!-- Story Tab Panel -->
            <div v-else-if="activeTab === 'story'" class="tab-panel" key="story">
              <story-tab :storyItems="storyItems" />
            </div>
            
            <!-- Education Tab Panel -->
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
            
            <!-- Experience Tab Panel -->
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
            
            <!-- Awards Tab Panel -->
            <div v-else-if="activeTab === 'awards'" class="tab-panel" key="awards">
              <timeline-list title="Honors & Awards" icon="fas fa-trophy" :items="awardItems" />
            </div>
            
            <!-- Skills Tab Panel -->
            <div v-else-if="activeTab === 'skills'" class="tab-panel" key="skills">
              <card-grid title="Skills & Technologies" icon="fas fa-code" :items="skillGroups" type="skill" />
            </div>
            
            <!-- Certificates Tab Panel -->
            <div v-else-if="activeTab === 'certifications'" class="tab-panel" key="certifications">
              <card-grid title="Certifications" icon="fas fa-certificate" :items="certificates" type="certification" />
            </div>
          </transition>
          </div>
        </main>
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
import ProfileCard from '@/components/about/ProfileCard.vue';
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
  profileData 
} from '@/data/about-me-data';

import { useHead } from '@vueuse/head';

export default {
  name: 'AboutMeView',
  components: {
    ProfileCard,
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
        { rel: 'canonical', href: 'https://mlnomadpy.github.io/about' }
      ]
    });

    return {
      tabs,
      storyItems,
      skillGroups,
      certificates,
      educationItems,
      awardItems,
      experienceItems,
      profileData
    }
  },
  data() {
    return {
      activeTab: 'identity',
      viewMode: 'list', // 'list' or 'timeline'
      selectedItem: null
    }
  },
  methods: {
    setActiveTab(tab) {
      if (this.activeTab !== tab) {
        this.activeTab = tab;
        this.selectedItem = null; // Close modal on tab change
        // Reset view mode on tab change if desired, or keep it persistent? 
        // Let's keep it persistent for now or reset to 'list'
        // this.viewMode = 'list'; 
        
        // On mobile, scroll to content when tab changes
        if (window.innerWidth < 768) {
          const contentArea = this.$el.querySelector('.tab-content-area');
          if (contentArea) {
            setTimeout(() => {
              contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
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
/* Main Layout */
.view-container {
  height: 100%; /* Fill available space (nav bar is handled by App.vue) */
  width: 100%;
  position: relative;
  overflow: hidden; /* No outer scroll */
  display: flex;
  flex-direction: column;
}

.section-content {
  height: 100%;
  width: 100%;
  padding: 1.5rem; /* Reduced padding for more space */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* No scroll here */
}

/* Unified Card Container */
.unified-card {
  display: flex;
  flex-direction: column;
  background: rgba(30, 30, 30, 0.4);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  flex-grow: 1; /* Fill remaining space */
  height: 100%; /* Ensure it takes height */
  margin: 0;
  position: relative;
}

/* Content Section */
.content-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: rgba(30, 30, 30, 0.2);
  height: 100%;
}

.tabs-container {
  z-index: 10;
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0; /* Keep valid height */
}

.tab-content-area {
  flex-grow: 1;
  overflow-y: auto; /* INNER SCROLLING */
  padding: 2rem;
  position: relative;
  height: 0; /* Important for flex child scroll */
  scrollbar-width: thin;
  scrollbar-color: rgba(244, 165, 96, 0.3) transparent;
}

.tab-content-area::-webkit-scrollbar {
  width: 6px;
}

.tab-content-area::-webkit-scrollbar-track {
  background: transparent;
}

.tab-content-area::-webkit-scrollbar-thumb {
  background-color: rgba(244, 165, 96, 0.3);
  border-radius: 20px;
}

.tab-panel {
  /* animation handled by transition wrapper */
}

.identity-panel {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%; /* Ensure full height for centering */
}

/* Transitions */
.fade-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  filter: blur(5px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
  filter: blur(5px);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .section-content {
    padding: 0.5rem; /* Tiny padding on mobile */
  }
  
  .unified-card {
    border-radius: 12px;
  }
  
  .tab-content-area {
    padding: 1rem;
  }
}

/* View Toggle Styles */
.view-toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ddd;
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
  background: rgba(244, 165, 96, 0.2);
  color: var(--accent-color, rgb(244, 165, 96));
  border-color: rgba(244, 165, 96, 0.4);
}

.view-toggle-btn.active {
  background: rgba(244, 165, 96, 0.15);
  color: var(--accent-color, rgb(244, 165, 96));
  border-color: rgba(244, 165, 96, 0.3);
}

.list-controls-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
</style>
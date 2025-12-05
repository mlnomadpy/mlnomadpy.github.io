<template>
  <div class="about-me view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <h1>about me</h1>
      
      <div class="story-wrapper">
        <!-- Profile Card Component -->
        <profile-card v-bind="profileData" />
        
        <!-- Content Sections - Tabbed Navigation -->
        <div class="content-tabs">
          <div class="tab-navigation-wrapper">
            <tab-navigation 
              :activeTab="activeTab"
              :tabs="tabs"
              @tab-change="setActiveTab"
            />
          </div>
          
          <!-- Tab Content Panels -->
          <div class="tab-content">
            <!-- Story Tab Panel -->
            <div class="tab-panel" v-show="activeTab === 'story'">
              <story-tab :storyItems="storyItems" />
            </div>
            
            <!-- Education Tab Panel -->
            <div class="tab-panel" v-show="activeTab === 'education'">
              <timeline-list :items="educationItems" type="education" />
            </div>
            
            <!-- Certifications Tab Panel -->
            <div class="tab-panel" v-show="activeTab === 'certifications'">
              <card-grid :items="certificationItems" type="certification" />
            </div>
            
            <!-- Awards Tab Panel -->
            <div class="tab-panel" v-show="activeTab === 'awards'">
              <card-grid :items="awardItems" type="award" />
            </div>
            
            <!-- Experience Tab Panel -->
            <div class="tab-panel" v-show="activeTab === 'experience'">
              <timeline-list :items="experienceItems" type="experience">
                <template v-slot:item="{ item }">
                  <ExperienceItem :item="item" />
                </template>
              </timeline-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from '@/components/about/ProfileCard.vue';
import TabNavigation from '@/components/about/TabNavigation.vue';
import StoryTab from '@/components/about/StoryTab.vue';
import TimelineList from '@/components/about/TimelineList.vue';
import CardGrid from '@/components/about/CardGrid.vue';
import ExperienceItem from '@/components/about/ExperienceItem.vue';
import { useHead } from '@vueuse/head';
import { 
  tabs, 
  storyItems, 
  educationItems, 
  certificationItems, 
  awardItems, 
  experienceItems, 
  profileData 
} from '@/data/about-me-data';

export default {
  name: 'AboutMeView',
  components: {
    ProfileCard,
    TabNavigation,
    StoryTab,
    TimelineList,
    CardGrid,
    ExperienceItem
  },
  setup() {
    useHead({
      title: 'About Me | Taha Bouhsine',
      meta: [
        { name: 'description', content: 'ML Researcher & Google Developer Expert in AI/ML. Building bridges between mathematical foundations of machine learning and their practical applications, between black-box neural networks and cosmos-inspired safe and interpretable AI models.' },
        { property: 'og:title', content: 'About Taha Bouhsine | ML Researcher & Google Developer Expert' },
        { property: 'og:description', content: 'Learn about Taha Bouhsine, ML Researcher & Google Developer Expert in AI/ML, CEO of MLNomads, focused on interpretable AI models and safe AI systems.' },
        { property: 'twitter:title', content: 'About Taha Bouhsine | ML Researcher & Google Developer Expert' },
        { property: 'twitter:description', content: 'Learn about Taha Bouhsine, ML Researcher & Google Developer Expert in AI/ML, CEO of MLNomads, focused on interpretable AI models and safe AI systems.' }
      ],
      link: [
        { rel: 'canonical', href: 'https://mlnomadpy.github.io/about' }
      ]
    });
  },
  data() {
    return {
      activeTab: 'story',
      tabs,
      storyItems,
      educationItems,
      certificationItems,
      awardItems,
      experienceItems,
      profileData
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  }
}
</script>

<style scoped>
/* Full height container with scrollable content */
.view-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.scrollable-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
}

/* Import existing styles */
@import '@/assets/aboutme.css';
@import '@/components/research/responsive-utils.css';

/* Page title styling */
.section-content h1 {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  position: relative;
  font-size: 2.5rem;
}

.section-content h1::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: var(--accent-color, rgb(244, 165, 96));
  transition: width 0.3s ease;
}

.section-content h1:hover::after {
  width: 150px;
}

/* Main container */
.about-me {
  padding: 20px;
  min-height: 100vh;
}

.story-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Tab content styling */
.tab-content {
  padding: 30px;
}

.tab-panel {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-tabs {
  background: rgba(30, 30, 30, 0.2);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(244, 165, 96, 0.1);
  width: 100%;
}

/* Tab navigation wrapper for mobile */
.tab-navigation-wrapper {
  position: relative;
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.tab-navigation-wrapper::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

@media (min-width: 768px) {
  .tab-content {
    padding: 30px;
  }
}

@media (max-width: 767px) {
  .scrollable-content {
    padding: 10px 6px;
  }
  
  .section-content h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .story-wrapper {
    width: calc(100% - 4px);
    margin: 0 2px;
  }
  
  .content-tabs {
    border-radius: 10px;
    width: 100%;
    margin: 0;
  }
  
  /* Custom styles to make tabs display as icons only, expanding on selection */
  :deep(.tabs-navigation) {
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    justify-content: center !important;
    width: 100% !important;
    padding: 0.8rem !important;
    gap: 0.5rem !important;
  }
  
  :deep(.tab-button) {
    flex: 0 0 auto !important;
    padding: 15px !important;
    min-width: 0 !important;
    width: 50px !important;
    height: 50px !important;
    border-radius: 50% !important;
    margin: 0 3px !important;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
    overflow: hidden !important;
  }
  
  :deep(.tab-button.active) {
    width: 120px !important;
    border-radius: 25px !important;
  }
  
  :deep(.tab-button span) {
    position: absolute !important;
    opacity: 0 !important;
    transform: translateY(10px) !important;
    font-size: 0.85rem !important;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    white-space: nowrap !important;
  }
  
  :deep(.tab-button.active span) {
    opacity: 1 !important;
    transform: translateY(0) !important;
    position: static !important;
    margin-top: 5px !important;
  }
  
  :deep(.tab-button i) {
    font-size: 1.2rem !important;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  }
  
  :deep(.tab-button.active i) {
    transform: translateY(-2px) !important;
    color: var(--accent-color) !important;
  }
  
  .tab-content {
    padding: 15px 10px;
  }
}

@media (max-width: 480px) {
  .scrollable-content {
    padding: 8px 4px;
  }
  
  .story-wrapper {
    width: 100%;
    margin: 0;
  }
  
  .content-tabs {
    width: 100%;
    margin: 0;
    border-radius: 8px;
  }
  
  .tab-content {
    padding: 12px 8px;
  }
  
  :deep(.tab-button) {
    width: 45px !important;
    height: 45px !important;
    margin: 0 2px !important;
  }
  
  :deep(.tab-button.active) {
    width: 100px !important;
  }
  
  :deep(.tab-button i) {
    font-size: 1.1rem !important;
  }
}
</style>
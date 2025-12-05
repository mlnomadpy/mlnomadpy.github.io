<template>
  <div 
    class="talk-overlay" 
    @click.self="$emit('close')"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    @keydown.esc="$emit('close')"
  >
    <div class="talk-details" @click.stop ref="modalContent" tabindex="-1">
      <button 
        class="close-btn" 
        @click="$emit('close')"
        aria-label="Close details"
        ref="closeButton"
      >
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>
      
      <div class="talk-details-header">
        <h2 id="modal-title">{{ talk.title }}</h2>
        <div class="talk-meta">
          <div class="talk-meta-item venue">
            <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
            <span>{{ talk.venue }}</span>
          </div>
          <div class="talk-meta-item date">
            <i class="fas fa-calendar-alt" aria-hidden="true"></i>
            <span>{{ formatDate(talk.date) }}</span>
          </div>
        </div>
      </div>
      
      <div class="talk-details-content">
        <div class="talk-image-preview" v-if="getThumbnailUrl(talk)">
          <img :src="getThumbnailUrl(talk)" :alt="`Thumbnail for ${talk.title}`">
        </div>
        
        <div class="talk-description" v-if="talk.description">
          <h3><i class="fas fa-info-circle" aria-hidden="true"></i> Description</h3>
          <div v-html="talk.description"></div>
        </div>
        
        <div class="talk-media-tabs" v-if="hasMedia">
          <div class="tabs-header" role="tablist">
            <button 
              v-if="talk.video" 
              class="tab-btn" 
              :class="{ active: activeTab === 'video' }"
              role="tab"
              :aria-selected="activeTab === 'video'"
              aria-controls="video-panel"
              id="video-tab"
              @click="setActiveTab('video')"
            >
              <i class="fas fa-play-circle" aria-hidden="true"></i> Video
            </button>
            <button 
              v-if="talk.slides" 
              class="tab-btn" 
              :class="{ active: activeTab === 'slides' }"
              role="tab"
              :aria-selected="activeTab === 'slides'"
              aria-controls="slides-panel"
              id="slides-tab"
              @click="setActiveTab('slides')"
            >
              <i class="fas fa-file-powerpoint" aria-hidden="true"></i> Slides
            </button>
            <button 
              v-if="talk.kaggle_notebook" 
              class="tab-btn" 
              :class="{ active: activeTab === 'notebook' }"
              role="tab"
              :aria-selected="activeTab === 'notebook'"
              aria-controls="notebook-panel"
              id="notebook-tab"
              @click="setActiveTab('notebook')"
            >
              <i class="fas fa-laptop-code" aria-hidden="true"></i> Notebook
            </button>
          </div>
          
          <div class="tabs-content">
            <div 
              class="video-container" 
              v-if="talk.video" 
              v-show="activeTab === 'video'"
              role="tabpanel" 
              aria-labelledby="video-tab" 
              id="video-panel"
            >
              <iframe 
                :src="getEmbedUrl(talk.video)" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                title="Video player"
                ref="videoIframe"
              ></iframe>
            </div>
            
            <div 
              class="slides-container" 
              v-if="talk.slides" 
              v-show="activeTab === 'slides'"
              role="tabpanel" 
              aria-labelledby="slides-tab" 
              id="slides-panel"
            >
              <iframe 
                :src="talk.slides" 
                frameborder="0" 
                allowfullscreen
                title="Slides viewer"
              ></iframe>
            </div>
            
            <div 
              class="notebook-container" 
              v-if="talk.kaggle_notebook" 
              v-show="activeTab === 'notebook'"
              role="tabpanel" 
              aria-labelledby="notebook-tab" 
              id="notebook-panel"
            >
              <iframe 
                :src="talk.kaggle_notebook" 
                frameborder="0" 
                allowfullscreen
                title="Notebook viewer"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div class="talk-resources" v-if="talk.resources && talk.resources.length">
          <h3><i class="fas fa-link" aria-hidden="true"></i> Resources</h3>
          <ul>
            <li v-for="(resource, index) in talk.resources" :key="index">
              <a :href="resource.url" target="_blank" class="resource-link" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                {{ resource.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <div class="talk-tags-section">
          <h3><i class="fas fa-tags" aria-hidden="true"></i> Topics</h3>
          <div class="tags-container">
            <span v-for="(tag, index) in talk.tags" :key="index" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TalkDetailsModal',
  props: {
    talk: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  data() {
    return {
      activeTab: null
    }
  },
  computed: {
    hasMedia() {
      return this.talk.video || this.talk.slides || this.talk.kaggle_notebook;
    }
  },
  created() {
    if (this.talk.video) this.activeTab = 'video';
    else if (this.talk.slides) this.activeTab = 'slides';
    else if (this.talk.kaggle_notebook) this.activeTab = 'notebook';
  },
  mounted() {
    document.body.style.overflow = 'hidden';
    this.$nextTick(() => {
      if (this.$refs.closeButton) {
        this.$refs.closeButton.focus();
      }
      
      // Iframe reset hack for some browsers/youtube
      if (this.activeTab === 'video' && this.$refs.videoIframe) {
        const iframe = this.$refs.videoIframe;
        const currentSrc = iframe.src;
        iframe.src = '';
        setTimeout(() => {
          iframe.src = currentSrc;
        }, 10);
      }
    });
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    formatDate(dateStr) {
      if (!dateStr || typeof dateStr !== 'string') return dateStr;
      try {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthYearMatch = dateStr.match(/([A-Za-z]+)\s+(\d{4})/);
        if (monthYearMatch) {
          const monthName = monthYearMatch[1];
          const month = months.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase())) + 1;
          const year = monthYearMatch[2];
          return `${month < 10 ? '0' + month : month}/${year}`;
        }
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return `${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}`;
        }
        return dateStr;
      } catch (e) {
        console.error('Error formatting date:', e);
        return dateStr;
      }
    },
    getThumbnailUrl(talk) {
      if (talk.image && talk.image.trim() !== '') {
        return talk.image;
      }
      if (talk.thumbnail && talk.thumbnail.trim() !== '') {
        return talk.thumbnail;
      }
      if (talk.video && talk.video.includes('youtube')) {
        const videoId = this.extractYouTubeId(talk.video);
        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      }
      return 'https://i.imgur.com/TwYAtdu.png';
    },
    extractYouTubeId(url) {
      if (!url) return null;
      let videoId = null;
      if (url.includes('v=')) {
        videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1];
      } else if (url.includes('embed/')) {
        videoId = url.split('embed/')[1];
      }
      return videoId;
    },
    getEmbedUrl(url) {
      if (!url) return '';
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('v=')) {
          videoId = url.split('v=')[1];
          const ampersandPosition = videoId.indexOf('&');
          if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
          }
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1];
        } else if (url.includes('embed/')) {
          videoId = url.split('embed/')[1];
          return url;
        }
        return `https://www.youtube.com/embed/${videoId}?rel=0`;
      }
      if (url.includes('vimeo.com')) {
        let vimeoId = '';
        if (url.includes('vimeo.com/')) {
          vimeoId = url.split('vimeo.com/')[1];
        } else if (url.includes('player.vimeo.com/video/')) {
          vimeoId = url.split('player.vimeo.com/video/')[1];
          return url;
        }
        return `https://player.vimeo.com/video/${vimeoId}`;
      }
      if (url.includes('drive.google.com')) {
        if (url.includes('preview')) {
          return url;
        } else {
          const fileId = url.match(/[-\w]{25,}/);
          if (fileId) {
            return `https://drive.google.com/file/d/${fileId[0]}/preview`;
          }
        }
      }
      return url;
    }
  }
}
</script>

<style scoped>
/* Modal Styles */
.talk-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  backdrop-filter: blur(5px);
}

.talk-details {
  background: #1a1a1a;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 16px;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--glass-border);
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.talk-details-header {
  padding: 30px 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(to right, rgba(65, 44, 15, 0.3), transparent);
}

.talk-details-header h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: var(--accent-color);
  line-height: 1.3;
}

.talk-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.talk-meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--secondary-text);
  font-size: 0.95rem;
}

.talk-meta-item i {
  color: var(--accent-color);
}

.talk-details-content {
  padding: 30px;
}

.talk-image-preview {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
}

.talk-image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.talk-description {
  margin-bottom: 30px;
  color: var(--secondary-text);
  line-height: 1.7;
}

.talk-description h3 {
  font-size: 1.2rem;
  color: var(--primary-text);
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Media Tabs */
.talk-media-tabs {
  margin-bottom: 30px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab-btn {
  flex: 1;
  padding: 15px;
  background: none;
  border: none;
  color: var(--secondary-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: var(--font-heading);
  font-size: 0.9rem;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--primary-text);
}

.tab-btn.active {
  background: rgba(244, 165, 96, 0.1);
  color: var(--accent-color);
  border-bottom: 2px solid var(--accent-color);
}

.tabs-content {
  padding: 20px;
  min-height: 300px;
}

.video-container, .slides-container, .notebook-container {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.video-container iframe, .slides-container iframe, .notebook-container iframe {
  width: 100%;
  height: 100%;
}

.talk-resources ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: var(--primary-text);
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.resource-link:hover {
  background: rgba(244, 165, 96, 0.1);
  border-color: var(--accent-color);
  transform: translateX(5px);
}

.talk-tags-section {
  margin-top: 30px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: var(--secondary-text);
  border: 1px solid var(--glass-border);
}

@media (max-width: 768px) {
  .talk-details-header h2 {
    font-size: 1.5rem;
  }
  
  .talk-image-preview {
    height: 200px;
  }
  
  .video-container, .slides-container, .notebook-container {
    height: 250px;
  }
  
  .tab-btn {
    padding: 10px;
    font-size: 0.8rem;
  }
}
</style>

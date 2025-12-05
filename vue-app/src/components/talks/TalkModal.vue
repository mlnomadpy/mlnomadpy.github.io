<template>
  <div class="talk-overlay" @click.self="$emit('close')">
    <div class="talk-details" @click.stop>
      <button class="close-btn" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </button>
      
      <div class="talk-details-header">
        <h2>{{ talk.title }}</h2>
        <div class="talk-meta">
          <div class="talk-meta-item venue">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ talk.venue }}</span>
          </div>
          <div class="talk-meta-item date">
            <i class="fas fa-calendar-alt"></i>
            <span>{{ formattedDate }}</span>
          </div>
        </div>
      </div>
      
      <div class="talk-details-content">
        <div class="talk-image-preview" v-if="thumbnailUrl">
          <img :src="thumbnailUrl" :alt="talk.title">
        </div>
        
        <div class="talk-description" v-if="talk.description">
          <h3><i class="fas fa-info-circle"></i> Description</h3>
          <div v-html="talk.description"></div>
        </div>
        
        <div class="talk-media-tabs">
          <div class="tabs-header" v-if="hasMedia">
            <button 
              v-if="talk.video" 
              class="tab-btn" 
              :class="{ active: activeTab === 'video' }"
              @click="setActiveTab('video')"
            >
              <i class="fas fa-play-circle"></i> Video
            </button>
            <button 
              v-if="talk.slides" 
              class="tab-btn" 
              :class="{ active: activeTab === 'slides' }"
              @click="setActiveTab('slides')"
            >
              <i class="fas fa-file-powerpoint"></i> Slides
            </button>
            <button 
              v-if="talk.kaggle_notebook" 
              class="tab-btn" 
              :class="{ active: activeTab === 'notebook' }"
              @click="setActiveTab('notebook')"
            >
              <i class="fas fa-laptop-code"></i> Notebook
            </button>
          </div>
          
          <div class="tabs-content">
            <div class="video-container" v-if="talk.video" v-show="activeTab === 'video'">
              <iframe 
                :src="embedUrl" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>
            
            <div class="slides-container" v-if="talk.slides" v-show="activeTab === 'slides'">
              <iframe 
                :src="talk.slides" 
                frameborder="0" 
                allowfullscreen
              ></iframe>
            </div>
            
            <div class="notebook-container" v-if="talk.kaggle_notebook" v-show="activeTab === 'notebook'">
              <iframe 
                :src="talk.kaggle_notebook" 
                frameborder="0" 
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        
        <div class="talk-resources" v-if="talk.resources && talk.resources.length">
          <h3><i class="fas fa-link"></i> Resources</h3>
          <ul>
            <li v-for="(resource, index) in talk.resources" :key="index">
              <a :href="resource.url" target="_blank" class="resource-link">
                <i class="fas fa-external-link-alt"></i>
                {{ resource.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <div class="talk-tags-section">
          <h3><i class="fas fa-tags"></i> Topics</h3>
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
  name: 'TalkModal',
  props: {
    talk: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: null
    }
  },
  computed: {
    formattedDate() {
      return this.formatDate(this.talk.date);
    },
    thumbnailUrl() {
      // If talk has valid image, use it
      if (this.talk.image && this.talk.image.trim() !== '') {
        return this.talk.image;
      }
      
      // Use thumbnail from talk data
      if (this.talk.thumbnail && this.talk.thumbnail.trim() !== '') {
        return this.talk.thumbnail;
      }
      
      // If talk has a YouTube video, extract thumbnail from video URL
      if (this.talk.video && this.talk.video.includes('youtube')) {
        const videoId = this.extractYouTubeId(this.talk.video);
        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      }
      
      // Fallback to default thumbnail
      return 'https://i.imgur.com/TwYAtdu.png';
    },
    embedUrl() {
      return this.getEmbedUrl(this.talk.video);
    },
    hasMedia() {
      return this.talk.video || this.talk.slides || this.talk.kaggle_notebook;
    }
  },
  methods: {
    formatDate(dateStr) {
      // Check if dateStr is already in a well-formatted state
      if (!dateStr || typeof dateStr !== 'string') return dateStr;
      
      // Try to handle various date formats
      try {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        // For "Month Year" format
        const monthYearMatch = dateStr.match(/([A-Za-z]+)\s+(\d{4})/);
        if (monthYearMatch) {
          const monthName = monthYearMatch[1];
          const month = months.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase())) + 1;
          const year = monthYearMatch[2];
          return `${month < 10 ? '0' + month : month}/${year}`;
        }
        
        // For ISO 8601 or similar formats
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return `${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}`;
        }
        
        return dateStr; // Return original if no formatting applied
      } catch (e) {
        console.error('Error formatting date:', e);
        return dateStr; // Return original on error
      }
    },
    getEmbedUrl(url) {
      if (!url) return '';
      
      // Handle YouTube URLs
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
          return url; // Already in embed format
        }
        return `https://www.youtube.com/embed/${videoId}?rel=0`;
      }
      
      // Handle Vimeo URLs
      if (url.includes('vimeo.com')) {
        let vimeoId = '';
        if (url.includes('vimeo.com/')) {
          vimeoId = url.split('vimeo.com/')[1];
        } else if (url.includes('player.vimeo.com/video/')) {
          vimeoId = url.split('player.vimeo.com/video/')[1];
          return url; // Already in embed format
        }
        return `https://player.vimeo.com/video/${vimeoId}`;
      }
      
      // Handle Google Drive embedded videos
      if (url.includes('drive.google.com')) {
        if (url.includes('preview')) {
          return url; // Already in preview format
        } else {
          const fileId = url.match(/[-\w]{25,}/);
          if (fileId) {
            return `https://drive.google.com/file/d/${fileId[0]}/preview`;
          }
        }
      }
      
      // Return original if not recognized
      return url;
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
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  },
  created() {
    // Set default active tab
    if (this.talk.video) {
      this.activeTab = 'video';
    } else if (this.talk.slides) {
      this.activeTab = 'slides';
    } else if (this.talk.kaggle_notebook) {
      this.activeTab = 'notebook';
    }
  }
}
</script>

<style scoped>
.talk-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 30px;
  overflow-y: auto;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.talk-details {
  background: linear-gradient(135deg, rgba(40, 30, 10, 0.95), rgba(30, 20, 10, 0.98));
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  position: relative;
  animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(244, 165, 96, 0.2);
  scrollbar-width: thin;
  scrollbar-color: rgba(244, 165, 96, 0.5) rgba(30, 30, 30, 0.3);
}

.talk-details::-webkit-scrollbar {
  width: 8px;
}

.talk-details::-webkit-scrollbar-track {
  background: rgba(30, 30, 30, 0.3);
  border-radius: 10px;
}

.talk-details::-webkit-scrollbar-thumb {
  background-color: rgba(244, 165, 96, 0.5);
  border-radius: 10px;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.talk-details-header {
  padding: 30px 30px 20px;
  border-bottom: 1px solid rgba(244, 165, 96, 0.2);
}

.talk-details-content {
  padding: 30px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(244, 165, 96, 0.1);
  border: 1px solid rgba(244, 165, 96, 0.3);
  color: var(--accent-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  z-index: 10;
}

.close-btn:hover {
  background: var(--accent-color);
  color: var(--primary-bg);
  transform: rotate(90deg);
}

.talk-details h2 {
  font-size: 2.2rem;
  color: #fff;
  margin: 0 0 20px;
  padding-right: 40px;
  line-height: 1.4;
}

.talk-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
}

.talk-meta-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.talk-meta-item i {
  color: var(--accent-color);
}

.talk-meta-item.venue {
  font-weight: 600;
}

.talk-details h3 {
  color: var(--accent-color);
  font-size: 1.4rem;
  margin: 30px 0 15px;
  border-bottom: 1px solid rgba(244, 165, 96, 0.2);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.talk-description div {
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  text-align: justify;
}

.talk-description ul, .talk-description ol {
  padding-left: 20px;
  margin: 15px 0;
}

.talk-description li {
  margin-bottom: 8px;
}

.talk-description p {
  margin-bottom: 15px;
}

.talk-description a {
  color: var(--accent-color);
  text-decoration: none;
  transition: all 0.2s ease;
}

.talk-description a:hover {
  text-decoration: underline;
}

.video-container, .slides-container, .notebook-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  margin: 15px 0 25px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(244, 165, 96, 0.2);
}

.video-container iframe, .slides-container iframe, .notebook-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.talk-resources ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.talk-resources li {
  margin-bottom: 12px;
}

.resource-link {
  color: var(--accent-color);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 15px;
  background: rgba(244, 165, 96, 0.05);
  border-radius: 6px;
  font-size: 0.95rem;
}

.resource-link:hover {
  background: rgba(244, 165, 96, 0.15);
  transform: translateX(5px);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.tags-container .tag {
  padding: 6px 12px;
  font-size: 0.9rem;
  background: rgba(244, 165, 96, 0.1);
  color: var(--accent-color);
  border: 1px solid rgba(244, 165, 96, 0.2);
}

.talk-image-preview {
  margin-bottom: 25px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.talk-image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.talk-media-tabs {
  margin: 30px 0;
}

.tabs-header {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab-btn {
  padding: 10px 20px;
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(244, 165, 96, 0.3);
  color: var(--primary-text);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-btn i {
  font-size: 1.1rem;
}

.tab-btn:hover {
  background: rgba(244, 165, 96, 0.2);
  border-color: var(--accent-color);
}

.tab-btn.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(244, 165, 96, 0.3);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .talk-details h2 {
    font-size: 1.6rem;
  }
  
  .talk-details h3 {
    font-size: 1.2rem;
  }
  
  .talk-overlay {
    padding: 15px;
  }
  
  .close-btn {
    top: 15px;
    right: 15px;
    width: 36px;
    height: 36px;
  }
  
  .talk-details-header {
    padding: 25px 20px 15px;
  }
  
  .talk-details-content {
    padding: 20px;
  }
  
  .tabs-header {
    flex-wrap: wrap;
  }
  
  .tab-btn {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }
  
  .talk-meta {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 576px) {
  .talk-details h2 {
    font-size: 1.4rem;
    padding-right: 30px;
  }
  
  .talk-details h3 {
    font-size: 1.1rem;
    margin: 20px 0 10px;
  }
  
  .talk-details-header {
    padding: 20px 15px 12px;
  }
  
  .talk-details-content {
    padding: 15px;
  }
  
  .resource-link {
    padding: 6px 12px;
    font-size: 0.85rem;
    gap: 8px;
  }
  
  .tags-container .tag {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
  
  .tab-btn {
    padding: 8px 15px;
    font-size: 0.85rem;
  }
  
  .talk-description div {
    font-size: 0.9rem;
    line-height: 1.6;
  }
}

@media (max-width: 380px) {
  .close-btn {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
  
  .talk-details-header {
    padding: 15px 12px 10px;
  }
  
  .talk-details-content {
    padding: 12px;
  }
}
</style> 
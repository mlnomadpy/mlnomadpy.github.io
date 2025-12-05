<template>
  <div class="talks view-container">
    <div class="section-content scrollable-content">
      <h1>talks</h1>
      
      <div class="talks-wrapper">
        <div v-if="isLoading" class="loading-container">
          <div class="loader"></div>
          <p>Loading talks...</p>
        </div>
        
        <div v-else-if="error" class="error-container">
          <div class="error-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <h3>{{ error }}</h3>
          <button @click="loadTalksData" class="retry-btn">
            <i class="fas fa-redo"></i>
            Retry
          </button>
        </div>
        
        <template v-else>
          <div class="talks-filter">
            <div class="search-bar">
              <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Search talks by title, venue, or topic..." 
                  @input="filterTalks"
                  class="search-input"
                >
                <button v-if="searchQuery" @click="clearSearch" class="clear-search">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            <div class="filter-stats">
              <div class="stats-container">
                <div class="stat-item">
                  <div class="stat-value">{{ talks.length }}</div>
                  <div class="stat-label">Total Talks</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ topics.length }}</div>
                  <div class="stat-label">Topics</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ filteredTalks.length }}</div>
                  <div class="stat-label">Showing</div>
                </div>
              </div>
            </div>
            
            <div class="filter-section">
              <h2><i class="fas fa-tag"></i> Filter by Topic</h2>
              <div class="filter-buttons">
                <button 
                  v-for="topic in topics" 
                  :key="topic" 
                  :class="{ active: selectedTopic === topic }"
                  @click="filterByTopic(topic)"
                >
                  {{ topic }}
                </button>
                <button 
                  :class="{ active: selectedTopic === 'All' }"
                  @click="filterByTopic('All')"
                >
                  <i class="fas fa-globe"></i>
                  All
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="filteredTalks.length > 0" class="talks-grid">
            <div 
              v-for="talk in filteredTalks" 
              :key="talk.id"
              class="talk-card"
              @click="openTalkDetails(talk)"
            >
              <div class="talk-card-image">
                <img 
                  :src="getThumbnailUrl(talk)" 
                  :alt="talk.title"
                  loading="lazy"
                  @error="$event.target.src='https://i.imgur.com/TwYAtdu.png'"
                >
                <div class="talk-overlay-info">
                  <div class="talk-date">{{ formatDate(talk.date) }}</div>
                  <div class="talk-indicators">
                    <div v-if="talk.video" class="indicator video-indicator" title="Watch video">
                      <i class="fas fa-play-circle"></i>
                    </div>
                    <div v-if="talk.slides" class="indicator slides-indicator" title="View slides">
                      <i class="fas fa-file-powerpoint"></i>
                    </div>
                    <div v-if="talk.kaggle_notebook" class="indicator notebook-indicator" title="Explore notebook">
                      <i class="fas fa-laptop-code"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="talk-card-content">
                <h3>{{ talk.title }}</h3>
                <p class="talk-venue">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ talk.venue }}
                </p>
                <div class="talk-tags">
                  <span v-for="(tag, index) in talk.tags.slice(0, 3)" :key="index" class="tag">{{ tag }}</span>
                  <span v-if="talk.tags.length > 3" class="more-tags">+{{ talk.tags.length - 3 }}</span>
                </div>
                <div class="view-details">
                  <span>View Details</span>
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="no-talks-found">
            <div class="no-results-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>No matching talks found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <button @click="resetFilters" class="reset-filters-btn">
              <i class="fas fa-redo"></i>
              Reset Filters
            </button>
          </div>
        </template>
      </div>
      
      <!-- Talk Details Modal -->
      <div class="talk-overlay" v-if="selectedTalk" @click.self="closeTalkDetails">
        <div class="talk-details" @click.stop>
          <button class="close-btn" @click="closeTalkDetails">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="talk-details-header">
            <h2>{{ selectedTalk.title }}</h2>
            <div class="talk-meta">
              <div class="talk-meta-item venue">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ selectedTalk.venue }}</span>
              </div>
              <div class="talk-meta-item date">
                <i class="fas fa-calendar-alt"></i>
                <span>{{ formatDate(selectedTalk.date) }}</span>
              </div>
            </div>
          </div>
          
          <div class="talk-details-content">
            <div class="talk-image-preview" v-if="getThumbnailUrl(selectedTalk)">
              <img :src="getThumbnailUrl(selectedTalk)" :alt="selectedTalk.title">
            </div>
            
            <div class="talk-description" v-if="selectedTalk.description">
              <h3><i class="fas fa-info-circle"></i> Description</h3>
              <div v-html="selectedTalk.description"></div>
            </div>
            
            <div class="talk-media-tabs">
              <div class="tabs-header" v-if="selectedTalk.video || selectedTalk.slides || selectedTalk.kaggle_notebook">
                <button 
                  v-if="selectedTalk.video" 
                  class="tab-btn active" 
                  @click="$event.target.parentNode.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active')); $event.target.classList.add('active'); document.querySelector('.video-container').style.display = 'block'; document.querySelector('.slides-container').style.display = 'none'; document.querySelector('.notebook-container').style.display = 'none';"
                >
                  <i class="fas fa-play-circle"></i> Video
                </button>
                <button 
                  v-if="selectedTalk.slides" 
                  class="tab-btn" 
                  @click="$event.target.parentNode.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active')); $event.target.classList.add('active'); document.querySelector('.video-container').style.display = 'none'; document.querySelector('.slides-container').style.display = 'block'; document.querySelector('.notebook-container').style.display = 'none';"
                >
                  <i class="fas fa-file-powerpoint"></i> Slides
                </button>
                <button 
                  v-if="selectedTalk.kaggle_notebook" 
                  class="tab-btn" 
                  @click="$event.target.parentNode.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active')); $event.target.classList.add('active'); document.querySelector('.video-container').style.display = 'none'; document.querySelector('.slides-container').style.display = 'none'; document.querySelector('.notebook-container').style.display = 'block';"
                >
                  <i class="fas fa-laptop-code"></i> Notebook
                </button>
              </div>
              
              <div class="tabs-content">
                <div class="video-container" v-if="selectedTalk.video" style="display: block;">
                  <iframe 
                    :src="getEmbedUrl(selectedTalk.video)" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>
                
                <div class="slides-container" v-if="selectedTalk.slides" style="display: none;">
                  <iframe 
                    :src="selectedTalk.slides" 
                    frameborder="0" 
                    allowfullscreen
                  ></iframe>
                </div>
                
                <div class="notebook-container" v-if="selectedTalk.kaggle_notebook" style="display: none;">
                  <iframe 
                    :src="selectedTalk.kaggle_notebook" 
                    frameborder="0" 
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
            
            <div class="talk-resources" v-if="selectedTalk.resources && selectedTalk.resources.length">
              <h3><i class="fas fa-link"></i> Resources</h3>
              <ul>
                <li v-for="(resource, index) in selectedTalk.resources" :key="index">
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
                <span v-for="(tag, index) in selectedTalk.tags" :key="index" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TalksView',
  data() {
    return {
      talks: [],
      filteredTalks: [],
      topics: [],
      selectedTopic: 'All',
      searchQuery: '',
      selectedTalk: null,
      isLoading: true,
      error: null
    }
  },
  methods: {
    filterTalks() {
      // First filter by topic
      let result = this.selectedTopic === 'All' 
        ? this.talks
        : this.talks.filter(talk => talk.tags.includes(this.selectedTopic));
      
      // Then filter by search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(talk => 
          talk.title.toLowerCase().includes(query) ||
          talk.description?.toLowerCase().includes(query) ||
          talk.venue.toLowerCase().includes(query) ||
          talk.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      this.filteredTalks = result;
    },
    filterByTopic(topic) {
      this.selectedTopic = topic;
      this.filterTalks();
    },
    clearSearch() {
      this.searchQuery = '';
      this.filterTalks();
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedTopic = 'All';
      this.filterTalks();
    },
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
    openTalkDetails(talk) {
      this.selectedTalk = talk;
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Preload the video iframe if exists
      if (talk.video) {
        this.$nextTick(() => {
          const iframe = document.querySelector('.video-container iframe');
          if (iframe) {
            // Reset iframe to force reload without self-assignment
            const currentSrc = iframe.src;
            iframe.src = '';
            setTimeout(() => {
              iframe.src = currentSrc;
            }, 10);
          }
        });
      }
    },
    closeTalkDetails() {
      // Stop video playback when closing modal
      if (this.selectedTalk && this.selectedTalk.video) {
        const iframe = document.querySelector('.video-container iframe');
        if (iframe) {
          // Reset iframe src to stop playback without self-assignment
          iframe.src = '';
        }
      }
      
      this.selectedTalk = null;
      document.body.style.overflow = 'auto'; // Restore scrolling
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
    getThumbnailUrl(talk) {
      // If talk has valid image, use it
      if (talk.image && talk.image.trim() !== '') {
        return talk.image;
      }
      
      // Use thumbnail from talk data
      if (talk.thumbnail && talk.thumbnail.trim() !== '') {
        return talk.thumbnail;
      }
      
      // If talk has a YouTube video, extract thumbnail from video URL
      if (talk.video && talk.video.includes('youtube')) {
        const videoId = this.extractYouTubeId(talk.video);
        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      }
      
      // Fallback to default thumbnail
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
    processTagsFromData(talksData) {
      // Extract tags from talk data if missing
      return talksData.map(talk => {
        // If talk already has tags, use them
        if (talk.tags && talk.tags.length > 0) {
          return talk;
        }
        
        // Otherwise, create tags from type or other data
        const tags = [];
        
        if (talk.type) {
          tags.push(talk.type);
        }
        
        if (talk.organization) {
          const org = talk.organization.replace('@', '');
          tags.push(org);
        }
        
        // Extract potential topics from title
        const potentialTopics = ['AI', 'ML', 'NLP', 'CV', 'Vision', 'GAN', 'RL', 'TensorFlow', 'Keras', 'JAX', 'FLAX'];
        
        potentialTopics.forEach(topic => {
          if (talk.title.includes(topic)) {
            tags.push(topic);
          }
        });
        
        // Ensure we have at least one tag
        if (tags.length === 0) {
          tags.push('Other');
        }
        
        // Return talk with added tags
        return {
          ...talk,
          tags: [...new Set(tags)] // Remove duplicates
        };
      });
    },
    async loadTalksData() {
      try {
        this.isLoading = true;
        this.error = null;
        
        // In a real app, you'd import the JSON directly or use fetch
        const talksData = await import('@/data/talks.json');
        
        // Process the data to ensure all talks have the required fields
        const processedTalks = this.processTagsFromData(talksData.default || talksData);
        
        // Process the venue field
        const talks = processedTalks.map(talk => ({
          ...talk,
          venue: talk.organization || talk.venue || 'Unknown venue',
          date: talk.date || 'Unknown date',
          id: talk.id || `talk-${Math.random().toString(36).substr(2, 9)}`
        }));
        
        this.talks = talks;
        this.filteredTalks = talks;
        
        // Extract unique topics from tags
        const allTags = talks.flatMap(talk => talk.tags || []);
        const topicsSet = new Set(allTags);
        this.topics = Array.from(topicsSet);
        
        this.isLoading = false;
      } catch (error) {
        console.error('Error loading talks data:', error);
        this.error = 'Failed to load talks data. Please try again later.';
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.loadTalksData();
  }
}
</script>

<style scoped>
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

.talks {
  padding: 20px;
  min-height: 100vh;
}

.section-content h1 {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
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
  background: var(--accent-color);
  transition: width 0.3s ease;
}

.section-content h1:hover::after {
  width: 150px;
}

.talks-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  position: relative;
  font-family: "Space Mono", monospace;
  background: linear-gradient(135deg, rgba(65, 44, 15, 0.6), rgba(65, 44, 15, 0.9));
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid rgba(244, 165, 96, 0.1);
}

.talks-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 90% 10%, rgba(244, 165, 96, 0.05), transparent 40%);
  pointer-events: none;
}

.talks-filter {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-container {
  position: relative;
  max-width: 100%;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color);
  font-size: 1rem;
}

.search-input {
  width: 100%;
  padding: 12px 45px;
  font-size: 1rem;
  border: 1px solid rgba(244, 165, 96, 0.3);
  border-radius: 30px;
  background: rgba(30, 30, 30, 0.6);
  color: var(--primary-text);
  outline: none;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
}

.search-input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 15px rgba(244, 165, 96, 0.2);
}

.clear-search {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear-search:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.filter-stats {
  width: 100%;
  padding: 10px 0;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.stat-item {
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(244, 165, 96, 0.3);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.filter-section {
  margin-bottom: 15px;
}

.filter-section h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-buttons button {
  padding: 10px 15px;
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(244, 165, 96, 0.3);
  color: var(--primary-text);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-buttons button i {
  color: var(--accent-color);
  transition: all 0.3s ease;
}

.filter-buttons button:hover {
  background: rgba(244, 165, 96, 0.2);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.filter-buttons button.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(244, 165, 96, 0.3);
}

.filter-buttons button.active i {
  color: var(--primary-bg);
}

.talks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.talk-card {
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(244, 165, 96, 0.1);
  cursor: pointer;
}

.talk-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  border-color: rgba(244, 165, 96, 0.3);
}

.talk-card-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
}

.talk-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s ease;
}

.talk-overlay-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8) 100%);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.talk-card:hover .talk-overlay-info {
  opacity: 1;
}

.talk-date {
  align-self: flex-start;
  background: rgba(244, 165, 96, 0.8);
  color: #000;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.talk-indicators {
  display: flex;
  gap: 8px;
  align-items: center;
}

.indicator {
  background: rgba(0, 0, 0, 0.6);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.talk-card:hover .indicator {
  transform: scale(1.1);
}

.video-indicator i {
  color: #ff4757;
}

.slides-indicator i {
  color: #ffa502;
}

.notebook-indicator i {
  color: #2ed573;
}

.talk-card:hover .video-indicator {
  background: rgba(255, 71, 87, 0.2);
}

.talk-card:hover .slides-indicator {
  background: rgba(255, 165, 2, 0.2);
}

.talk-card:hover .notebook-indicator {
  background: rgba(46, 213, 115, 0.2);
}

.talk-card-content {
  padding: 20px;
}

.talk-card-content h3 {
  font-size: 1.3rem;
  margin: 0 0 10px;
  color: #fff;
  transition: all 0.3s ease;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.talk-card:hover .talk-card-content h3 {
  color: var(--accent-color);
}

.talk-venue {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.talk-venue i {
  color: var(--accent-color);
  font-size: 0.9rem;
  flex-shrink: 0;
}

.talk-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 15px 0;
}

.tag {
  padding: 5px 10px;
  background: rgba(30, 30, 30, 0.8);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.more-tags {
  padding: 5px 10px;
  background: rgba(244, 165, 96, 0.1);
  color: var(--accent-color);
  border-radius: 15px;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(244, 165, 96, 0.2);
}

.talk-card:hover .tag {
  background: rgba(244, 165, 96, 0.1);
  border-color: rgba(244, 165, 96, 0.2);
}

.view-details {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  color: var(--accent-color);
  font-size: 0.9rem;
  opacity: 0.8;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.view-details i {
  transition: transform 0.3s ease;
}

.talk-card:hover .view-details {
  opacity: 1;
}

.talk-card:hover .view-details i {
  transform: translateX(3px);
}

.no-talks-found {
  text-align: center;
  padding: 50px 20px;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 12px;
  border: 1px dashed rgba(244, 165, 96, 0.3);
  margin-top: 30px;
}

.no-results-icon {
  font-size: 3rem;
  color: rgba(244, 165, 96, 0.5);
  margin-bottom: 20px;
}

.no-talks-found h3 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 10px;
}

.no-talks-found p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 25px;
}

.reset-filters-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(244, 165, 96, 0.15);
  border: none;
  color: var(--accent-color);
  padding: 12px 25px;
  border-radius: 30px;
  font-family: "Space Mono", monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-filters-btn:hover {
  background: rgba(244, 165, 96, 0.3);
  transform: translateY(-3px);
}

/* Talk Details Modal */
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

.video-container, .slides-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  margin: 15px 0 25px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(244, 165, 96, 0.2);
}

.video-container iframe, .slides-container iframe {
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

.notebook-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  margin: 15px 0 25px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(244, 165, 96, 0.2);
  display: none;
}

.notebook-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.loader {
  border: 5px solid rgba(244, 165, 96, 0.2);
  border-radius: 50%;
  border-top: 5px solid var(--accent-color);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 50px 20px;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 12px;
  border: 1px dashed rgba(244, 165, 96, 0.3);
}

.error-icon {
  font-size: 3rem;
  color: #ff6b6b;
  margin-bottom: 20px;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(244, 165, 96, 0.15);
  border: none;
  color: var(--accent-color);
  padding: 12px 25px;
  border-radius: 30px;
  font-family: "Space Mono", monospace;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.retry-btn:hover {
  background: rgba(244, 165, 96, 0.3);
  transform: translateY(-3px);
}

@media (min-width: 768px) {
  .talks-filter {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .search-bar {
    width: 100%;
    order: 1;
    margin-bottom: 20px;
  }
  
  .filter-section {
    flex: 1;
    order: 3;
  }
  
  .filter-stats {
    flex: 1;
    order: 2;
  }
  
  .talk-details {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .talks-grid {
    grid-template-columns: 1fr;
  }
  
  .talks-wrapper {
    padding: 20px;
  }
  
  .filter-buttons {
    justify-content: center;
  }
  
  .filter-buttons button {
    font-size: 0.8rem;
    padding: 8px 12px;
  }
  
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
}

@media (max-width: 480px) {
  .section-content h1 {
    font-size: 2rem;
  }
  
  .stat-item {
    flex: 0 0 100%;
  }
  
  .talk-card-content h3 {
    font-size: 1.1rem;
  }
  
  .talk-meta {
    flex-direction: column;
    gap: 10px;
  }
}
</style> 
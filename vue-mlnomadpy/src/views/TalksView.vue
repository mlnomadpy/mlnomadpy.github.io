<template>
  <div class="talks">
    <div class="section-content">
      <h1>talks</h1>
      
      <div class="talks-wrapper">
        <div class="talks-filter">
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search talks..." 
              @input="filterTalks"
            >
          </div>
          
          <div class="filter-section">
            <h2>Filter by Topic</h2>
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
                All
              </button>
            </div>
          </div>
        </div>
        
        <div class="talks-grid">
          <div 
            v-for="talk in filteredTalks" 
            :key="talk.id"
            class="talk-card"
            @click="openTalkDetails(talk)"
          >
            <div class="talk-card-image">
              <img :src="talk.image || 'https://i.imgur.com/TwYAtdu.png'" :alt="talk.title">
            </div>
            <div class="talk-card-content">
              <h3>{{ talk.title }}</h3>
              <p class="talk-venue">{{ talk.venue }}</p>
              <p class="talk-date">{{ talk.date }}</p>
              <div class="talk-tags">
                <span v-for="(tag, index) in talk.tags" :key="index" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Talk Details Modal -->
      <div class="talk-overlay" v-if="selectedTalk" @click="closeTalkDetails">
        <div class="talk-details" @click.stop>
          <button class="close-btn" @click="closeTalkDetails">
            <i class="fas fa-times"></i>
          </button>
          
          <h2>{{ selectedTalk.title }}</h2>
          <p class="talk-info">
            <span class="venue">{{ selectedTalk.venue }}</span>
            <span class="date">{{ selectedTalk.date }}</span>
          </p>
          
          <div class="talk-description" v-if="selectedTalk.description">
            <h3>Description</h3>
            <p>{{ selectedTalk.description }}</p>
          </div>
          
          <div class="talk-video" v-if="selectedTalk.video">
            <h3>Video</h3>
            <div class="video-container">
              <iframe 
                :src="getEmbedUrl(selectedTalk.video)" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>
          </div>
          
          <div class="talk-slides" v-if="selectedTalk.slides">
            <h3>Slides</h3>
            <div class="slides-container">
              <iframe 
                :src="selectedTalk.slides" 
                frameborder="0" 
                allowfullscreen
              ></iframe>
            </div>
          </div>
          
          <div class="talk-resources" v-if="selectedTalk.resources && selectedTalk.resources.length">
            <h3>Resources</h3>
            <ul>
              <li v-for="(resource, index) in selectedTalk.resources" :key="index">
                <a :href="resource.url" target="_blank">{{ resource.name }}</a>
              </li>
            </ul>
          </div>
          
          <div class="talk-tags">
            <h3>Tags</h3>
            <div class="tags-container">
              <span v-for="(tag, index) in selectedTalk.tags" :key="index" class="tag">{{ tag }}</span>
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
      selectedTalk: null
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
    openTalkDetails(talk) {
      this.selectedTalk = talk;
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    },
    closeTalkDetails() {
      this.selectedTalk = null;
      document.body.style.overflow = 'auto'; // Restore scrolling
    },
    getEmbedUrl(url) {
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
        }
        return `https://www.youtube.com/embed/${videoId}`;
      }
      // Handle other video platforms as needed
      return url;
    },
    async loadTalksData() {
      try {
        // In a real app, you'd import the JSON directly or use fetch
        const talksData = require('@/data/talks.json');
        this.talks = talksData;
        this.filteredTalks = talksData;
        
        // Extract unique topics from tags
        const allTags = talksData.flatMap(talk => talk.tags);
        const topicsSet = new Set(allTags);
        this.topics = Array.from(topicsSet);
      } catch (error) {
        console.error('Error loading talks data:', error);
      }
    }
  },
  mounted() {
    this.loadTalksData();
  }
}
</script>

<style scoped>
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
}

.talks-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  font-family: "Space Mono", monospace;
  background: linear-gradient(to bottom, rgba(65, 44, 15, 0.6), rgba(65, 44, 15, 0.9));
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.talks-filter {
  margin-bottom: 30px;
}

.search-bar {
  margin-bottom: 20px;
  text-align: center;
}

.search-bar input {
  width: 100%;
  max-width: 500px;
  padding: 12px 20px;
  font-size: 1rem;
  border: 1px solid rgba(244, 165, 96, 0.3);
  border-radius: 25px;
  background-color: rgba(65, 44, 15, 0.8);
  color: var(--primary-text);
  outline: none;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
}

.search-bar input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 15px rgba(244, 165, 96, 0.2);
}

.filter-section {
  margin-bottom: 30px;
  text-align: center;
}

.filter-section h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: var(--accent-color);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.filter-buttons button {
  padding: 8px 15px;
  background: rgba(65, 44, 15, 0.8);
  border: 1px solid rgba(244, 165, 96, 0.3);
  color: var(--primary-text);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
}

.filter-buttons button:hover {
  background: rgba(244, 165, 96, 0.2);
  border-color: var(--accent-color);
}

.filter-buttons button.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
}

.talks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.talk-card {
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(to bottom, rgba(65, 44, 15, 0.4), rgba(65, 44, 15, 0.7));
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(244, 165, 96, 0.1);
  cursor: pointer;
}

.talk-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
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
  transition: all 0.5s ease;
}

.talk-card:hover .talk-card-image img {
  transform: scale(1.1);
}

.talk-card-content {
  padding: 20px;
}

.talk-card-content h3 {
  font-size: 1.3rem;
  margin: 0 0 10px;
  color: var(--primary-text);
  transition: all 0.3s ease;
}

.talk-card:hover .talk-card-content h3 {
  color: var(--accent-color);
}

.talk-venue, .talk-date {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 5px 0;
}

.talk-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.tag {
  padding: 4px 8px;
  background: rgba(244, 165, 96, 0.2);
  color: var(--accent-color);
  border-radius: 12px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.talk-card:hover .tag {
  background: rgba(244, 165, 96, 0.3);
}

/* Talk Details Modal */
.talk-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.talk-details {
  background: linear-gradient(to bottom, rgba(65, 44, 15, 0.9), rgba(65, 44, 15, 0.95));
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  padding: 30px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(244, 165, 96, 0.2);
  border: none;
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
}

.close-btn:hover {
  background: var(--accent-color);
  color: var(--primary-bg);
}

.talk-details h2 {
  font-size: 2rem;
  color: var(--primary-text);
  margin: 0 0 20px;
  padding-right: 40px;
}

.talk-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.talk-info .venue {
  font-weight: bold;
}

.talk-details h3 {
  color: var(--accent-color);
  font-size: 1.4rem;
  margin: 25px 0 15px;
  border-bottom: 1px solid rgba(244, 165, 96, 0.3);
  padding-bottom: 10px;
}

.talk-description p {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.video-container, .slides-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  margin-bottom: 20px;
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
}

.talk-resources li {
  margin-bottom: 10px;
}

.talk-resources a {
  color: var(--accent-color);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.talk-resources a:hover {
  text-decoration: underline;
}

.talk-resources a::before {
  content: '→';
  margin-right: 8px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags-container .tag {
  padding: 5px 10px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .talks-grid {
    grid-template-columns: 1fr;
  }
  
  .talk-details {
    padding: 20px;
    width: 95%;
  }
  
  .talk-details h2 {
    font-size: 1.5rem;
  }
  
  .talk-details h3 {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .section-content h1 {
    font-size: 2rem;
  }
  
  .filter-buttons button {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
  
  .search-bar input {
    padding: 10px 15px;
  }
  
  .talk-card-content h3 {
    font-size: 1.1rem;
  }
}
</style> 
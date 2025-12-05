<template>
  <div class="talk-card" @click="$emit('click', talk)">
    <div class="talk-card-image">
      <img 
        :src="thumbnailUrl" 
        :alt="talk.title"
        loading="lazy"
        @error="$event.target.src='https://i.imgur.com/TwYAtdu.png'"
      >
      <div class="talk-overlay-info">
        <div class="talk-date">{{ formattedDate }}</div>
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
        <span v-for="(tag, index) in visibleTags" :key="index" class="tag">{{ tag }}</span>
        <span v-if="hasMoreTags" class="more-tags">+{{ talk.tags.length - maxTags }}</span>
      </div>
      <div class="view-details">
        <span>View Details</span>
        <i class="fas fa-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TalkCard',
  props: {
    talk: {
      type: Object,
      required: true
    },
    maxTags: {
      type: Number,
      default: 3
    }
  },
  computed: {
    visibleTags() {
      return this.talk.tags.slice(0, this.maxTags);
    },
    hasMoreTags() {
      return this.talk.tags.length > this.maxTags;
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
    formattedDate() {
      return this.formatDate(this.talk.date);
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
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

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .talk-card-content h3 {
    font-size: 1.2rem;
  }
  
  .talk-card-image {
    height: 160px;
  }
}

@media (max-width: 576px) {
  .talk-card-content {
    padding: 15px;
  }
  
  .talk-card-content h3 {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
  
  .talk-venue {
    font-size: 0.85rem;
    margin: 8px 0;
  }
  
  .talk-tags {
    margin: 12px 0;
    gap: 6px;
  }
  
  .tag, .more-tags {
    padding: 4px 8px;
    font-size: 0.7rem;
  }
  
  .view-details {
    font-size: 0.85rem;
  }
}

@media (max-width: 380px) {
  .talk-card-image {
    height: 140px;
  }
  
  .talk-overlay-info {
    padding: 8px;
  }
  
  .talk-date {
    padding: 4px 8px;
    font-size: 0.7rem;
  }
  
  .indicator {
    width: 30px;
    height: 30px;
  }
}
</style> 
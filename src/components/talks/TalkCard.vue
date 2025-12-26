<template>
  <div 
    class="talk-card"
    @click="$emit('select', talk)"
    @keydown.enter="$emit('select', talk)"
    @keydown.space.prevent="$emit('select', talk)"
    tabindex="0"
    role="button"
    :aria-label="`View details for ${talk.title}`"
  >
    <div class="talk-card-image">
      <img 
        :src="getThumbnailUrl(talk)" 
        :alt="`Thumbnail for ${talk.title}`"
        loading="lazy"
        @error="$event.target.src='https://i.imgur.com/TwYAtdu.png'"
      >
      <div class="talk-overlay-info">
        <div class="talk-date">{{ formatDate(talk.date) }}</div>
        <div class="talk-indicators" aria-hidden="true">
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
        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
        {{ talk.venue }}
      </p>
      <div class="talk-tags" aria-label="Tags">
        <span v-for="(tag, index) in talk.tags.slice(0, 3)" :key="index" class="tag">{{ tag }}</span>
        <span v-if="talk.tags.length > 3" class="more-tags">+{{ talk.tags.length - 3 }}</span>
      </div>
      <div class="view-details" aria-hidden="true">
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
    }
  },
  emits: ['select'],
  methods: {
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
    }
  }
}
</script>

<style scoped>
.talk-card {
  border-radius: 12px;
  overflow: hidden;
  background: var(--glass-bg);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--glass-border);
  cursor: pointer;
  backdrop-filter: blur(5px);
}

.talk-card:hover, .talk-card:focus {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  border-color: var(--accent-color);
  outline: none;
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

.talk-date {
  align-self: flex-end;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  backdrop-filter: blur(4px);
}

.talk-indicators {
  display: flex;
  gap: 8px;
}

.indicator {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  backdrop-filter: blur(4px);
}

.talk-card-content {
  padding: 20px;
}

.talk-card-content h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--primary-text);
  line-height: 1.4;
}

.talk-venue {
  color: var(--secondary-text);
  font-size: 0.9rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.talk-venue i {
  color: var(--accent-color);
}

.talk-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: var(--secondary-text);
  border: 1px solid var(--glass-border);
}

.more-tags {
  font-size: 0.75rem;
  padding: 4px 10px;
  color: var(--secondary-text);
}

.view-details {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--accent-color);
  font-size: 0.9rem;
  font-weight: 600;
  transition: gap 0.3s ease;
}

.talk-card:hover .view-details, .talk-card:focus .view-details {
  gap: 12px;
}
</style>
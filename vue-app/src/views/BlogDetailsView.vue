<template>
  <div class="blog-details-view view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <div v-if="loading" class="loading-container">
        <div class="loader"></div>
        <p>Loading post...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-circle"></i>
        <h3>{{ error }}</h3>
        <button @click="loadPost" class="retry-btn">Retry</button>
        <router-link to="/blogs" class="back-link">Back to Blogs</router-link>
      </div>
      
      <div v-else-if="post" class="blog-content-wrapper">
        <!-- Back Button -->
        <router-link to="/blogs" class="back-btn">
          <i class="fas fa-arrow-left"></i> Back to Blogs
        </router-link>
        
        <article class="blog-article glass-card">
          <header class="blog-header">
            <div class="meta-tags" v-if="post.tags && post.tags.length">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <h1>{{ post.title }}</h1>
            <div class="blog-meta">
              <span class="date"><i class="fas fa-calendar-alt"></i> {{ post.date }}</span>
              <span class="author" v-if="post.author"><i class="fas fa-user"></i> {{ post.author }}</span>
            </div>
          </header>
          
          <div class="markdown-body" v-html="post.html"></div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlogById } from '@/utils/blog-loader';
import 'katex/dist/katex.min.css';

export default {
  name: 'BlogDetailsView',
  props: ['id'],
  data() {
    return {
      post: null,
      loading: true,
      error: null
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.loadPost();
      }
    }
  },
  methods: {
    async loadPost() {
      this.loading = true;
      this.error = null;
      try {
        const post = await getBlogById(this.id);
        if (post) {
          this.post = post;
        } else {
          this.error = 'Blog post not found';
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        this.error = 'Failed to load blog post';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
/* Use global CSS variables for consistency */
.blog-details-view {
  background-color: var(--primary-bg, #412c0f);
  min-height: 100%;
}

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
  padding: var(--spacing-lg, 1.5rem);
  background-color: var(--primary-bg, #412c0f);
}

/* Loading & Error States */
.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: var(--primary-text, white);
  gap: var(--spacing-md, 1rem);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.error-container i {
  font-size: 3rem;
  color: var(--accent-color, rgb(244, 165, 96));
  opacity: 0.8;
}

.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--accent-color, rgb(244, 165, 96));
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: var(--spacing-md, 1rem);
  padding: 12px 24px;
  background: var(--accent-color, rgb(244, 165, 96));
  color: var(--primary-bg, #412c0f);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(244, 165, 96, 0.4);
}

.back-link {
  display: block;
  margin-top: var(--spacing-md, 1rem);
  color: var(--accent-color, rgb(244, 165, 96));
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.back-link:hover {
  opacity: 0.8;
}

/* Main Content */
.blog-content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 60px;
  animation: fadeIn 0.6s ease-out;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--accent-color, rgb(244, 165, 96));
  text-decoration: none;
  font-weight: 600;
  margin-bottom: var(--spacing-lg, 1.5rem);
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: 'Orbitron', sans-serif;
}

.back-btn:hover {
  transform: translateX(-8px);
  background: var(--accent-color, rgb(244, 165, 96));
  color: var(--primary-bg, #412c0f);
  box-shadow: 0 5px 20px rgba(244, 165, 96, 0.3);
}

/* Blog Article */
.blog-article {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.blog-header {
  margin-bottom: 3rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 2rem;
}

.blog-header h1 {
  font-size: 2.5rem;
  margin: 1rem 0;
  color: var(--primary-text, white);
  font-family: 'Orbitron', sans-serif;
  line-height: 1.3;
}

.blog-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
}

.blog-meta span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.blog-meta i {
  color: var(--accent-color);
}

.meta-tags {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  background: rgba(244, 165, 96, 0.15);
  color: var(--accent-color);
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Markdown Content Styles */
.markdown-body {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  color: var(--primary-text, white);
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: 'Orbitron', sans-serif;
}

.markdown-body :deep(h1) { font-size: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
.markdown-body :deep(h1:first-child) { display: none; }
.markdown-body :deep(h2) { font-size: 1.6rem; }
.markdown-body :deep(h3) { font-size: 1.3rem; color: var(--accent-color); }

.markdown-body :deep(p) {
  margin-bottom: 1.5rem;
}

.markdown-body :deep(a) {
  color: var(--accent-color);
  text-decoration: none;
  border-bottom: 1px dashed var(--accent-color);
  transition: all 0.3s ease;
}

.markdown-body :deep(a:hover) {
  background: rgba(244, 165, 96, 0.1);
}

.markdown-body :deep(ul), 
.markdown-body :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.markdown-body :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-body :deep(blockquote) {
  border-left: 4px solid var(--accent-color);
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
}

.markdown-body :deep(code) {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 0.9em;
  color: #e67e22;
}

.markdown-body :deep(pre) {
  background: rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #f8f8f2;
}

.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1.5rem 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* KaTeX overrides if needed */
.markdown-body :deep(.katex-display) {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem 0;
}

@media (max-width: 768px) {
  .blog-article {
    padding: 1.5rem;
  }
  
  .blog-header h1 {
    font-size: 1.8rem;
  }
  
  .markdown-body {
    font-size: 1rem;
  }
}
</style>

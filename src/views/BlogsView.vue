<template>
  <div class="blogs view-container">
    <div class="section-content scrollable-content smooth-scroll custom-scroll">
      <h1 class="resp-heading">Blogs</h1>
      
      <div class="blogs-wrapper">
        <!-- Toolbar -->
        <div class="blogs-toolbar">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search blogs..."
            >
          </div>
          
          <div class="view-toggle">
            <button 
              :class="{ active: viewMode === 'grid' }" 
              @click="viewMode = 'grid'"
              title="Grid View"
            >
              <i class="fas fa-th-large"></i>
            </button>
            <button 
              :class="{ active: viewMode === 'list' }" 
              @click="viewMode = 'list'"
              title="List View"
            >
              <i class="fas fa-list"></i>
            </button>
          </div>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="loader"></div>
          <p>Loading posts...</p>
        </div>
        
        <div v-else-if="filteredBlogs.length === 0" class="empty-state">
          <i class="fas fa-feather-alt"></i>
          <p>No blog posts found.</p>
        </div>
        
        <!-- Grid View -->
        <div v-else-if="viewMode === 'grid'" class="blogs-grid">
          <div 
            v-for="blog in filteredBlogs" 
            :key="blog.id" 
            class="blog-card glass-card"
            @click="navigateToBlog(blog.id)"
          >
            <div class="blog-card-content">
              <div class="blog-meta">
                <span class="author" v-if="blog.author">by {{ blog.author }}</span>
                <div class="tags" v-if="blog.tags && blog.tags.length">
                  <span v-for="tag in blog.tags.slice(0, 2)" :key="tag" class="tag-sm">{{ tag }}</span>
                </div>
              </div>
              
              <h2>{{ blog.title }}</h2>
              
              <div class="read-more">
                <span>Read Article</span>
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- List View (Compact) -->
        <div v-else class="blogs-list">
          <div 
            v-for="blog in filteredBlogs" 
            :key="blog.id" 
            class="blog-list-item glass-card"
            @click="navigateToBlog(blog.id)"
          >
            <h3 class="list-title">{{ blog.title }}</h3>
            <i class="fas fa-chevron-right list-arrow"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllBlogs } from '@/utils/blog-loader';

export default {
  name: 'BlogsView',
  data() {
    return {
      blogs: [],
      loading: true,
      searchQuery: '',
      viewMode: 'list'
    }
  },
  computed: {
    filteredBlogs() {
      if (!this.searchQuery) return this.blogs;
      
      const query = this.searchQuery.toLowerCase();
      return this.blogs.filter(blog => 
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
  },
  async mounted() {
    try {
      this.blogs = await getAllBlogs();
    } catch (error) {
      console.error('Failed to load blogs:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    navigateToBlog(id) {
      this.$router.push({
        name: 'BlogDetails',
        params: { id }
      });
    }
  }
}
</script>

<style scoped>
@import '@/components/research/responsive-utils.css';

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

.blogs {
  padding: 20px;
  min-height: 100vh;
}

.section-content h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: var(--primary-text);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.blogs-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

/* Toolbar */
.blogs-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
  flex-wrap: wrap;
}

.search-box {
  flex-grow: 1;
  position: relative;
  max-width: 400px;
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
}

.search-box input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  color: white;
  font-family: inherit;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: var(--accent-color);
  background: rgba(255, 255, 255, 0.1);
}

.view-toggle {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.view-toggle button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.view-toggle button.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  font-weight: bold;
}

/* Loading & Empty States */
.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: rgba(255, 255, 255, 0.7);
  gap: 15px;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state i {
  font-size: 3rem;
  color: var(--accent-color);
  opacity: 0.5;
}

/* Grid */
.blogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

/* List View */
.blogs-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.blog-list-item {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.blog-list-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(244, 165, 96, 0.3);
  transform: translateX(5px);
}

.list-title {
  flex-grow: 1;
  margin: 0;
  font-size: 1.1rem;
  color: var(--primary-text);
  font-family: 'Orbitron', sans-serif;
}

.blog-list-item:hover .list-title {
  color: var(--accent-color);
}

.list-arrow {
  color: rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}

.blog-list-item:hover .list-arrow {
  color: var(--accent-color);
  transform: translateX(5px);
}

/* Blog Card */
.blog-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
}

.blog-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-10px);
  border-color: rgba(244, 165, 96, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.05);
}

.blog-card:hover::before {
  opacity: 1;
}

.blog-card-content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  font-size: 0.85rem;
}

.author {
  color: var(--accent-color);
  font-size: 0.8rem;
  font-weight: 600;
}

.tags {
  display: flex;
  gap: 5px;
}

.tag-sm {
  background: rgba(244, 165, 96, 0.1);
  color: var(--accent-color);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
}

.blog-card h2 {
  font-size: 1.4rem;
  margin: 0 0 15px;
  color: var(--primary-text);
  line-height: 1.3;
  font-family: 'Orbitron', sans-serif;
}

.blog-card:hover h2 {
  color: var(--accent-color);
}

.excerpt {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--accent-color);
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: auto;
  transition: gap 0.3s ease;
}

.blog-card:hover .read-more {
  gap: 12px;
}

@media (max-width: 768px) {
  .blogs-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-card h2 {
    font-size: 1.2rem;
  }
}
</style>
<template>
  <div class="blogs view-container">
    <div class="section-content scrollable-content smooth-scroll custom-scroll">
      <div class="blogs-wrapper">
        <!-- Toolbar -->
        <div class="blogs-toolbar" role="search" aria-label="Blog search and filters">
          <div class="search-group">
            <div class="search-container flex-grow">
              <i class="fas fa-search search-icon" aria-hidden="true"></i>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search blogs..."
                class="search-input"
                aria-label="Search blog posts by title, excerpt, or tags"
              >
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="clear-search"
                aria-label="Clear search"
              >
                <i class="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>

            <!-- View Toggle -->
            <button
              class="filter-toggle-btn"
              @click="viewMode = viewMode === 'list' ? 'grid' : 'list'"
              :title="viewMode === 'list' ? 'Switch to Grid View' : 'Switch to List View'"
            >
              <i :class="viewMode === 'list' ? 'fas fa-th-large' : 'fas fa-list'"></i>
              <span class="desktop-only">{{ viewMode === 'list' ? 'Grid' : 'List' }}</span>
            </button>

            <!-- Filter Toggle -->
            <button
              class="filter-toggle-btn"
              :class="{ active: showFilters }"
              @click="showFilters = !showFilters"
              :aria-expanded="showFilters"
              title="Toggle Filters"
            >
              <i class="fas fa-filter" aria-hidden="true"></i>
              <span class="desktop-only">Filters</span>
            </button>
          </div>

          <!-- Collapsible Filter Section -->
          <transition name="expand">
            <div v-if="showFilters" class="filter-panel glass-panel" role="region" aria-label="Tag filters">
              <div class="filter-header">
                <h3>Tags</h3>
                <button v-if="selectedTag !== 'All'" @click="selectedTag = 'All'" class="clear-filters-btn">
                  Clear
                </button>
              </div>
              <div class="filter-buttons" role="group" aria-label="Filter by tag">
                <button
                  :class="{ active: selectedTag === 'All' }"
                  @click="selectedTag = 'All'"
                  :aria-pressed="selectedTag === 'All'"
                >
                  <i class="fas fa-globe" aria-hidden="true"></i> All
                </button>
                <button
                  v-for="tag in allTags"
                  :key="tag"
                  :class="{ active: selectedTag === tag }"
                  @click="selectedTag = tag"
                  :aria-pressed="selectedTag === tag"
                >
                  {{ tag }}
                </button>
              </div>
              <div class="stats-summary" aria-live="polite">
                Showing {{ filteredBlogs.length }} of {{ blogs.length }} posts
              </div>
            </div>
          </transition>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="loader"></div>
          <p>Loading posts...</p>
        </div>

        <transition name="fade" mode="out-in">
          <!-- Grid View -->
          <div v-if="!loading && viewMode === 'grid' && filteredBlogs.length" class="blogs-grid" key="grid">
            <div
              v-for="blog in filteredBlogs"
              :key="blog.id"
              class="blog-card glass-card"
              @click="navigateToBlog(blog.id)"
              @keydown.enter="navigateToBlog(blog.id)"
              tabindex="0"
              role="button"
              :aria-label="`Read: ${blog.title}`"
            >
              <div class="blog-card-content">
                <div class="blog-meta">
                  <span class="date" v-if="blog.date"><i class="fas fa-calendar-alt"></i> {{ blog.date }}</span>
                  <span class="author" v-if="blog.author">by {{ blog.author }}</span>
                  <div class="tags" v-if="blog.tags && blog.tags.length">
                    <span v-for="tag in blog.tags.slice(0, 2)" :key="tag" class="tag-sm">{{ tag }}</span>
                  </div>
                </div>

                <h2>{{ blog.title }}</h2>

                <p v-if="blog.excerpt" class="excerpt">{{ blog.excerpt }}</p>

                <div class="read-more" aria-hidden="true">
                  <span>Read Article</span>
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div v-else-if="!loading && filteredBlogs.length" class="blogs-list" key="list">
            <div
              v-for="blog in filteredBlogs"
              :key="blog.id"
              class="blog-list-item"
              @click="navigateToBlog(blog.id)"
              @keydown.enter="navigateToBlog(blog.id)"
              tabindex="0"
              role="button"
              :aria-label="`Read: ${blog.title}`"
            >
              <div class="list-info">
                <h3 class="list-title">{{ blog.title }}</h3>
                <div class="list-meta">
                  <span v-if="blog.date" class="list-date"><i class="fas fa-calendar-alt" aria-hidden="true"></i> {{ blog.date }}</span>
                  <span v-if="blog.author" class="list-author">{{ blog.author }}</span>
                  <div class="list-tags" v-if="blog.tags && blog.tags.length">
                    <span v-for="tag in blog.tags.slice(0, 3)" :key="tag" class="tag-sm">{{ tag }}</span>
                  </div>
                </div>
                <p v-if="blog.excerpt" class="list-excerpt">{{ blog.excerpt }}</p>
              </div>
              <i class="fas fa-chevron-right list-arrow" aria-hidden="true"></i>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="!loading" class="no-results" key="no-results" role="status">
            <div class="no-results-icon">
              <i class="fas fa-feather-alt" aria-hidden="true"></i>
            </div>
            <h3>No blog posts found</h3>
            <p>Try adjusting your search or filters.</p>
            <button @click="resetFilters" class="reset-btn">
              <i class="fas fa-redo" aria-hidden="true"></i>
              Reset Filters
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllBlogs } from '@/utils/blog-loader';
import { useMeta } from '@/composables/useMeta';

export default {
  name: 'BlogsView',
  data() {
    return {
      blogs: [],
      loading: true,
      searchQuery: '',
      selectedTag: 'All',
      showFilters: false,
      viewMode: 'list'
    }
  },
  computed: {
    allTags() {
      const tagSet = new Set();
      this.blogs.forEach(b => (b.tags || []).forEach(t => tagSet.add(t)));
      return Array.from(tagSet);
    },
    filteredBlogs() {
      return this.blogs.filter(blog => {
        const matchesTag = this.selectedTag === 'All' || (blog.tags && blog.tags.includes(this.selectedTag));
        if (!this.searchQuery) return matchesTag;
        const q = this.searchQuery.toLowerCase();
        const matchesSearch =
          blog.title.toLowerCase().includes(q) ||
          (blog.excerpt && blog.excerpt.toLowerCase().includes(q)) ||
          (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(q)));
        return matchesTag && matchesSearch;
      });
    }
  },
  methods: {
    navigateToBlog(id) {
      this.$router.push({ name: 'BlogDetails', params: { id } });
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedTag = 'All';
    }
  },
  async mounted() {
    const { setPageMeta } = useMeta();
    setPageMeta({
      title: 'Blogs | Taha Bouhsine',
      description: 'Blog posts by Taha Bouhsine on machine learning, AI, and life.',
      ogTitle: 'Blogs | Taha Bouhsine',
      ogDescription: 'Blog posts by Taha Bouhsine on machine learning, AI, and life.'
    });
    try {
      this.blogs = await getAllBlogs();
    } catch (error) {
      console.error('Failed to load blogs:', error);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
@import '@/assets/styles/responsive-utils.css';

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

.blogs-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 20px 20px 80px;
}

/* Toolbar */
.blogs-toolbar {
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  padding: 10px 0;
  margin-top: -10px;
}

.search-group {
  display: flex;
  gap: 15px;
  align-items: center;
}

.flex-grow { flex: 1; }

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 45px;
  border-radius: 30px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--primary-text);
  font-family: var(--font-mono);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 15px rgba(244, 165, 96, 0.2);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color);
}

.clear-search {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--secondary-text);
  cursor: pointer;
}

.filter-toggle-btn {
  padding: 12px 20px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--primary-text);
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: var(--font-heading);
  height: 50px;
}

.filter-toggle-btn:hover, .filter-toggle-btn.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
}

/* Filter Panel */
.filter-panel {
  margin-top: 15px;
  padding: 20px;
  background: rgba(30, 30, 30, 0.95);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.filter-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--accent-color);
}

.clear-filters-btn {
  background: none;
  border: none;
  color: var(--secondary-text);
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-buttons button {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  color: var(--secondary-text);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-buttons button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--primary-text);
  border-color: var(--accent-color);
}

.filter-buttons button.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
  font-weight: 600;
}

.stats-summary {
  margin-top: 15px;
  text-align: right;
  font-size: 0.9rem;
  color: var(--secondary-text);
  font-family: var(--font-mono);
}

/* Loading State */
.loading-state {
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

@keyframes spin { to { transform: rotate(360deg); } }

/* Grid */
.blogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

/* Blog Card */
.blog-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
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

.blog-card:hover, .blog-card:focus {
  transform: translateY(-8px);
  border-color: rgba(244, 165, 96, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.05);
  outline: none;
}

.blog-card:hover::before { opacity: 1; }

.blog-card-content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 15px;
  font-size: 0.85rem;
}

.date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.date i { color: var(--accent-color); }

.author {
  color: var(--accent-color);
  font-size: 0.8rem;
  font-weight: 600;
}

.tags { display: flex; gap: 5px; }

.tag-sm {
  background: rgba(244, 165, 96, 0.1);
  color: var(--accent-color);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
}

.blog-card h2 {
  font-size: 1.3rem;
  margin: 0 0 12px;
  color: var(--primary-text);
  line-height: 1.3;
  font-family: 'Orbitron', sans-serif;
}

.blog-card:hover h2 { color: var(--accent-color); }

.excerpt {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
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

.blog-card:hover .read-more { gap: 12px; }

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

.blog-list-item:hover, .blog-list-item:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(244, 165, 96, 0.3);
  transform: translateX(5px);
  outline: none;
}

.list-info { flex-grow: 1; }

.list-title {
  margin: 0;
  font-size: 1.1rem;
  color: var(--primary-text);
  font-family: 'Orbitron', sans-serif;
}

.blog-list-item:hover .list-title { color: var(--accent-color); }

.list-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
  align-items: center;
}

.list-date {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.list-date i { color: var(--accent-color); font-size: 0.75rem; }

.list-author {
  font-size: 0.8rem;
  color: var(--accent-color);
}

.list-tags { display: flex; gap: 5px; }

.list-excerpt {
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.list-arrow {
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-left: 15px;
}

.blog-list-item:hover .list-arrow {
  color: var(--accent-color);
  transform: translateX(5px);
}

/* No Results */
.no-results {
  text-align: center;
  padding: 60px 20px;
  background: var(--glass-bg);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
}

.no-results-icon {
  font-size: 3rem;
  color: var(--secondary-text);
  margin-bottom: 20px;
  opacity: 0.5;
}

.reset-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: var(--accent-color);
  color: var(--primary-bg);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 165, 96, 0.3);
}

/* Transitions */
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}

.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .desktop-only { display: none; }
  .filter-toggle-btn { padding: 12px; width: 50px; justify-content: center; }
  .blogs-grid { grid-template-columns: 1fr; }
  .blog-card h2 { font-size: 1.2rem; }
}
</style>

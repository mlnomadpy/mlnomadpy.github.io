<template>
  <div class="research-search">
    <div class="search-container">
      <i class="fas fa-search search-icon"></i>
      <input 
        type="text" 
        v-model="query" 
        :placeholder="placeholder" 
        class="search-input"
        @input="onInput"
      />
      <button v-if="query" @click="clearSearch" class="clear-search">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search...'
    }
  },
  data() {
    return {
      query: this.value
    }
  },
  watch: {
    value(newValue) {
      this.query = newValue;
    }
  },
  methods: {
    onInput() {
      this.$emit('input', this.query);
    },
    clearSearch() {
      this.query = '';
      this.$emit('input', '');
      this.$emit('clear');
    }
  }
}
</script>

<style scoped>
.research-search {
  width: 100%;
  margin-bottom: 10px;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 45px;
  border-radius: 30px;
  border: 1px solid rgba(244, 165, 96, 0.3);
  background: rgba(30, 30, 30, 0.6);
  color: #fff;
  font-family: "Space Mono", monospace;
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
  font-size: 1rem;
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

/* Enhanced Mobile Responsiveness */
@media (max-width: 576px) {
  .search-input {
    padding: 10px 40px;
    font-size: 0.9rem;
    border-radius: 25px;
  }
  
  .search-icon {
    left: 12px;
    font-size: 0.9rem;
  }
  
  .clear-search {
    right: 12px;
    width: 18px;
    height: 18px;
    font-size: 0.8rem;
  }
}

@media (max-width: 380px) {
  .search-input {
    padding: 8px 35px;
    font-size: 0.85rem;
  }
  
  .search-icon {
    left: 10px;
    font-size: 0.85rem;
  }
  
  .clear-search {
    right: 10px;
    width: 16px;
    height: 16px;
  }
}
</style> 
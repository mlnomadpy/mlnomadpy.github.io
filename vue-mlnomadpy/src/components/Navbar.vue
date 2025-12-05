<template>
  <nav class="navbar" :class="{ 'responsive': isMenuOpen }">
    <router-link to="/" id="home-link" class="home">
      <i class="fas fa-home"></i>
      <span class="nav-text">Home</span>
    </router-link>
    
    <div class="nav-logo">
      <img src="@/assets/mlnomads-logo.png" alt="MLNomads Logo" onerror="this.src='https://i.imgur.com/TwYAtdu.png'" width="100">
    </div>
    
    <router-link to="/aboutme">
      <i class="fas fa-user"></i>
      <span class="nav-text">About Me</span>
    </router-link>
    
    <router-link to="/research">
      <i class="fas fa-flask"></i>
      <span class="nav-text">Research</span>
    </router-link>
    
    <router-link to="/talks">
      <i class="fas fa-microphone"></i>
      <span class="nav-text">Talks</span>
    </router-link>
    
    <router-link to="/poetry">
      <i class="fas fa-feather-alt"></i>
      <span class="nav-text">Poetry</span>
    </router-link>
    
    <router-link to="/blogs">
      <i class="fas fa-pen-nib"></i>
      <span class="nav-text">Blogs</span>
    </router-link>
    
    <router-link to="/life">
      <i class="fas fa-heart"></i>
      <span class="nav-text">Life</span>
    </router-link>
    
    <div class="hamburger" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--primary-bg);
  opacity: 0.7;
}

.navbar::after,
.navbar::before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 0.5px;
  background-color: white;
  width: 50%;
}

.navbar::before {
  left: 0;
  width: calc(50% - (100% / (2 * 7)));
}

.navbar::after {
  right: 0;
  width: calc(50% - (100% / (2 * 7)));
}

.navbar a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.navbar a:hover {
  background-color: rgb(244, 165, 96);
  color: #2d0f41;
}

.navbar a i {
  font-size: 20px;
}

.navbar .home {
  padding: 0 15px;
}

.navbar .home i {
  font-size: 24px;
}

.nav-logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

#home-link {
  margin-bottom: -50px;
}

.hamburger {
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-around;
  height: 24px;
  width: 30px;
}

.hamburger span {
  display: block;
  height: 3px;
  background: white;
  margin: 5px 0;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .navbar a:not(#home-link) {
    display: flex;
  }

  .nav-text {
    display: none;
  }

  .navbar a i {
    font-size: 24px;
  }

  .navbar.responsive {
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 5px;
  }

  .navbar.responsive a {
    display: flex;
    margin: 0;
    padding: 5px;
  }

  .nav-logo {
    position: static;
    transform: none;
  }

  .navbar.responsive {
    position: absolute;
    background-color: #412b0f;
    width: 100%;
    top: 0;
    left: 0;
  }

  .navbar .home {
    display: flex !important;
  }
}
</style> 
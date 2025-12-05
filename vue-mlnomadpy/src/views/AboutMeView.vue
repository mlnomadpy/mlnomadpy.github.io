<template>
  <div class="about-me">
    <div class="section-content">
      <h1>about me</h1>
      
      <div class="story-wrapper">
        <div class="profile-section">
          <div class="profile-image">
            <img src="@/assets/profile-photo.jpg" alt="Taha Bouhsine" onerror="this.src='https://i.imgur.com/TwYAtdu.png'" class="hover-effect">
          </div>
          <div class="profile-details">
            <h2 class="profile-name">Taha Bouhsine</h2>
            <h3 class="profile-title">ⵉⵙⴽⴰⵏⵎⴰⴳⴰⵔ</h3>
            <p class="profile-tagline">ML Researcher & Engineer | Google Developer Expert in AI/ML | CEO of MLNomads</p>
            <div class="social-links">
              <a href="https://scholar.google.com/" target="_blank" aria-label="Google Scholar"><i class="fas fa-graduation-cap"></i></a>
              <a href="https://github.com/mlnomadpy" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
              <a href="https://linkedin.com/in/Tahabsn" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
              <a href="mailto:tahabhs14@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
              <a href="https://www.tahabouhsine.com" target="_blank" aria-label="Personal Website"><i class="fas fa-globe"></i></a>
            </div>
          </div>
        </div>

        <div class="bio-summary">
          <blockquote>
            "I build bridges between mathematical foundations of machine learning and their practical applications, between opaque neural networks and interpretable models."
          </blockquote>
        </div>
        
        <div class="expandable-sections">
          <!-- Story Section (Interactive Timeline) -->
          <div class="expandable-section" id="story-section">
            <div class="section-header" @click="toggleSection('story')">
              <h2>My Story <span class="toggle-icon"><i :class="['fas', story.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down']"></i></span></h2>
              <p class="section-preview">A journey from Morocco to becoming a GDE and ML researcher. Click to explore my path...</p>
            </div>
            
            <div class="section-content" :class="{ 'hidden': !story.isExpanded }">
              <div class="story-timeline-container">
                <!-- Interactive timeline navigation -->
                <div class="timeline-navigation">
                  <div 
                    v-for="(item, index) in storyItems" 
                    :key="item.id"
                    class="timeline-nav-item" 
                    :class="{ 'active': story.currentIndex === index }"
                    @click="setActiveStory(index)"
                  >
                    <div class="nav-indicator"><span>{{ String(index + 1).padStart(2, '0') }}</span></div>
                    <div class="nav-label">{{ item.title }}</div>
                  </div>
                  <div class="timeline-progress-bar">
                    <div class="timeline-progress" :style="{ width: `${(story.currentIndex + 1) / storyItems.length * 100}%` }"></div>
                  </div>
                </div>
                
                <!-- Interactive story panels -->
                <div class="story-viewport">
                  <div 
                    v-for="(item, index) in storyItems" 
                    :key="item.id"
                    class="story-scene"
                    :class="{ 'active': story.currentIndex === index }"
                    :id="`story-${item.id}`"
                  >
                    <div class="scene-background" :style="{ backgroundImage: item.backgroundImage }">
                      <div class="scene-overlay"></div>
                    </div>
                    <div class="scene-content">
                      <h3>{{ item.heading }}</h3>
                      <div class="scene-text" v-html="item.content"></div>
                      <div class="scene-quote">
                        {{ item.quote }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Story controls -->
                <div class="story-controls">
                  <button class="story-nav-btn prev-btn" @click="navigateStory(-1)"><i class="fas fa-chevron-left"></i></button>
                  <div class="story-page-indicator">
                    <span class="current-page">{{ story.currentIndex + 1 }}</span>/<span class="total-pages">{{ storyItems.length }}</span>
                  </div>
                  <button class="story-nav-btn next-btn" @click="navigateStory(1)"><i class="fas fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Education Section (Hover Cards) -->
          <div class="expandable-section" id="education-section">
            <div class="section-header" @click="toggleSection('education')">
              <h2>Education <span class="toggle-icon"><i :class="['fas', education.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down']"></i></span></h2>
              <p class="section-preview">MS in ECE (Rowan), MS in Data Science & BS in Math/CS (Ibnou Zohr)...</p>
            </div>
            
            <div class="section-content" :class="{ 'hidden': !education.isExpanded }">
              <div class="education-timeline">
                <div v-for="(item, index) in educationItems" :key="index" class="education-item">
                  <div class="education-date">{{ item.period }}</div>
                  <div class="education-content">
                    <h3>{{ item.degree }}</h3>
                    <p class="institution">{{ item.institution }}</p>
                    <p class="graduation-date">{{ item.graduation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Awards Section (Expandable Cards) -->
          <div class="expandable-section" id="awards-section">
            <div class="section-header" @click="toggleSection('awards')">
              <h2>Scholarships and Awards <span class="toggle-icon"><i :class="['fas', awards.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down']"></i></span></h2>
              <p class="section-preview">Google Developer Expert, Rowan Research Fellowship, Google Scholarships...</p>
            </div>
            
            <div class="section-content" :class="{ 'hidden': !awards.isExpanded }">
              <div class="awards-list">
                <div v-for="(award, index) in awardItems" :key="index" class="award-item">
                  <div class="award-icon"><i :class="award.icon"></i></div>
                  <div class="award-content">
                    <h3>{{ award.title }}</h3>
                    <p>{{ award.description }}</p>
                  </div>
                </div>
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
  name: 'AboutMeView',
  data() {
    return {
      story: {
        isExpanded: false,
        currentIndex: 0
      },
      education: {
        isExpanded: false
      },
      awards: {
        isExpanded: false
      },
      storyItems: [
        {
          id: 'origins',
          title: 'Origins',
          heading: 'Who am I?',
          backgroundImage: "url('/imgs/bg-origins.jpg'), linear-gradient(135deg, #412c0f 0%, #5a421c 100%)",
          content: `<p><span class="first-letter">J</span>ake* of all trades, Master of Data Science. I have always been fascinated by the beauty and power of computers, and I have always wanted to understand it, be part of it, and innovate. My journey as a researcher, engineer, and nomad has taken me across different realms of knowledge, driven by an insatiable curiosity about how machines can learn and how we can make them more intelligible to humans.</p>
          <p>I'm the founder and CEO of MLNomads, recognized as a Google Developer Expert in AI/ML, but beyond these titles lies a person constantly navigating the complex landscapes of technology, identity, and purpose. At the core, I'm a builder of bridges between the mathematical foundations of machine learning and their practical applications, between opaque neural networks and interpretable models, between what AI is today and what it could be tomorrow.</p>`,
          quote: "Beyond titles lies a person navigating the complex landscapes of technology, identity, and purpose."
        },
        {
          id: 'philosophy',
          title: 'Philosophy',
          heading: 'My Philosophy in a Nutshell',
          backgroundImage: "url('/imgs/bg-philosophy.jpg'), linear-gradient(135deg, #4a3517 0%, #6b4b22 100%)",
          content: `<p><span class="first-letter">F</span>rom a young age, I found myself faced with the daunting task of making decisions without guidance. I relied on my intuition, dedication, and determination to overcome the obstacles in my path. I will not deny that I have faced many failures, but I have learned from them and ensured that I do not repeat the same mistakes.</p>
          <p>In the process of navigating these challenges, I have developed a passion for knowledge and a love of learning that has shaped my current character and contributed to my humble achievements. For me, it is not the unknown that I fear, but the loss of my desire to seek knowledge.</p>
          <p>I am a lifelong learner, driven by an insatiable thirst for education that cannot be quenched. It is this love of learning that sustains me, and I will continue to pursue it for as long as I live. I am grateful for the hardships that have shaped me, for they have helped me to cultivate a deep appreciation for the beauty and complexity of the world.</p>`,
          quote: "For me, it is not the unknown that I fear, but the loss of my desire to seek knowledge."
        },
        {
          id: 'reflection',
          title: 'Reflection',
          heading: 'On Writing and Self-Reflection',
          backgroundImage: "url('/imgs/bg-reflection.jpg'), linear-gradient(135deg, #533e1e 0%, #785529 100%)",
          content: `<p><span class="first-letter">W</span>hen we are unable to access quality mentorship, quality mental health education, to better understand how to heal and self-reflect, we must turn to alternative methods of self-care. One such method is writing, which allows us to express and explore our emotions, thoughts, and experiences.</p>
          <p>By putting our innermost thoughts on paper, we can process and make sense of them in a way that may not be possible through verbal communication alone. Through the act of writing, we may also begin to see patterns and themes emerge in our experiences. This can provide us with valuable insights into how certain events and circumstances have affected us, and may help us to understand ourselves better.</p>
          <p>Ultimately, writing can be a powerful tool for self-discovery and growth—a window to our own minds and a bridge to understanding others. The same principles guide my approach to research: document, reflect, refine, and share.</p>`,
          quote: "Writing is a window to our own minds and a bridge to understanding others."
        },
        {
          id: 'journey',
          title: 'Journey',
          heading: 'How Did I Get Here?',
          backgroundImage: "url('/imgs/bg-journey.jpg'), linear-gradient(135deg, #5c4726 0%, #856030 100%)",
          content: `<p><span class="first-letter">O</span>ne day, I found myself alone and bereft of the people and things that had once been important to me. As I looked around, all I had left was my own mind and the knowledge and skills I had cultivated.</p>
          <p>In the face of loss and adversity, I clung to the belief that I could shape my own destiny, using my complaints about the world as fuel for my curiosity and driving me to take action rather than simply holding onto empty ideals.</p>
          <p>Despite the challenges I faced, I remained true to my identity and my heritage as I embarked on a journey to fulfill my dream of becoming a research scientist from Tamazgha, using computer science to make the world a better place. Each algorithm I write, each model I train, each paper I publish is another step on this path—not just to advance the field, but to represent my roots and inspire others like me to pursue their dreams regardless of where they started.</p>`,
          quote: "Each algorithm I write is another step on this path—not just to advance the field, but to represent my roots."
        },
        {
          id: 'path',
          title: 'Path',
          heading: 'Where Are You Headed? —Iskanmagar',
          backgroundImage: "url('/imgs/bg-path.jpg'), linear-gradient(135deg, #654f2d 0%, #926a36 100%)",
          content: `<p><span class="first-letter">A</span>s I navigate the uncertain path of life, I find myself drawn to experiences that challenge and inspire me. I am not seeking a specific destination, but rather, I am driven by a desire to learn, grow, and make a positive impact on the world around me.</p>
          <p>I do not chase after happiness, for I know that it is fleeting and elusive. Instead, I seek out the things that I fear the most, for it is in confronting these fears that I find true growth and fulfillment.</p>
          <p>I understand that change is the only constant, and I embrace it willingly, knowing that it offers endless opportunities for learning and development. As I journey through life, I will continue to push myself to new heights, ever seeking to improve and evolve.</p>
          <p>This is the path that I have chosen, and I will follow it wherever it may lead. My current focus on developing Neural Matter Networks, refining contrastive learning methods, and creating more transparent AI systems is simply another manifestation of this philosophy—pushing into the unknown, confronting the difficult challenges of our field, and hopefully emerging with something valuable to share.</p>`,
          quote: "I seek out the things that I fear the most, for it is in confronting these fears that I find true growth."
        }
      ],
      educationItems: [
        {
          period: '2022 - 2024',
          degree: 'Master of Science in Electrical and Computer Engineering',
          institution: 'Henry M. Rowan College of Engineering, Rowan University',
          graduation: 'Expected December 2024'
        },
        {
          period: '2020 - 2022',
          degree: 'Master of Science in Data Science',
          institution: 'Faculty of Science Agadir, Ibnou Zohr University',
          graduation: 'July 2022'
        },
        {
          period: '2017 - 2020',
          degree: 'Bachelor of Science in Mathematics and Computer Science',
          institution: 'Faculty of Science Agadir, Ibnou Zohr University',
          graduation: 'September 2020'
        }
      ],
      awardItems: [
        {
          title: 'AI/ML Google Developer Expert',
          description: 'Recognition for expertise and contributions to the AI/ML community',
          icon: 'fas fa-award'
        },
        {
          title: 'Rowan Research Fellowship Award',
          description: 'Award for research excellence at Rowan University',
          icon: 'fas fa-medal'
        },
        {
          title: 'Google Scholarship: Professional Certificate',
          description: 'Recognition of professional development in Google technologies',
          icon: 'fab fa-google'
        },
        {
          title: 'Google Scholarship: TensorFlow Certificate',
          description: 'Recognition of TensorFlow expertise and contributions',
          icon: 'fab fa-tensorflow'
        }
      ]
    }
  },
  methods: {
    toggleSection(section) {
      if (section === 'story') {
        this.story.isExpanded = !this.story.isExpanded;
        this.education.isExpanded = false;
        this.awards.isExpanded = false;
      } else if (section === 'education') {
        this.education.isExpanded = !this.education.isExpanded;
        this.story.isExpanded = false;
        this.awards.isExpanded = false;
      } else if (section === 'awards') {
        this.awards.isExpanded = !this.awards.isExpanded;
        this.story.isExpanded = false;
        this.education.isExpanded = false;
      }
      
      // If expanding, scroll to section after a short delay
      if (this[section].isExpanded) {
        setTimeout(() => {
          const element = document.getElementById(`${section}-section`);
          if (element) {
            const headerHeight = 100; // Approximate header height
            const sectionTop = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
          }
        }, 100);
      }
    },
    setActiveStory(index) {
      this.story.currentIndex = index;
    },
    navigateStory(direction) {
      let newIndex = this.story.currentIndex + direction;
      if (newIndex < 0) newIndex = this.storyItems.length - 1;
      if (newIndex >= this.storyItems.length) newIndex = 0;
      this.story.currentIndex = newIndex;
    }
  },
  mounted() {
    // Add keyboard navigation for stories
    document.addEventListener('keydown', (e) => {
      if (!this.story.isExpanded) return;
      
      if (e.key === 'ArrowRight') {
        this.navigateStory(1);
      } else if (e.key === 'ArrowLeft') {
        this.navigateStory(-1);
      }
    });
    
    // Apply hover effects to profile image
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
      profileImage.addEventListener('mouseenter', () => {
        profileImage.style.transform = 'scale(1.05)';
        profileImage.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        profileImage.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });
      
      profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = '';
        profileImage.style.boxShadow = '';
      });
    }
    
    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        link.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, 300 + (index * 100));
    });
  },
  beforeUnmount() {
    // Remove keyboard event listener
    document.removeEventListener('keydown', (e) => {});
  }
}
</script>

<style scoped>
/* Import some custom styling */
@import '@/assets/aboutme.css';

.section-content h1 {
  animation: none;
  border-right: none;
  display: block;
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

.about-me {
  padding: 20px;
  min-height: 100vh;
}

/* Make the expandable sections work with Vue */
.section-content {
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: height 0.5s ease, opacity 0.5s ease;
}

.section-content.hidden {
  height: 0;
  opacity: 0;
}

.section-content:not(.hidden) {
  height: auto;
  opacity: 1;
  padding: 20px 0;
}

/* First letter styling */
.first-letter {
  font-size: 3.5rem;
  line-height: 1;
  float: left;
  margin-right: 10px;
  margin-top: 5px;
  color: var(--accent-color);
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-family: "Orbitron", sans-serif;
}
</style> 
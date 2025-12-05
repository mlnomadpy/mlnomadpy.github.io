/**
 * AboutMe Section - Adds interactivity to the storytelling format
 */
const AboutMeSection = {
  init() {
    // Check if we're on a page with the aboutme section
    if (document.querySelector('#aboutme')) {
      this.setupStoryScrollEffects();
      this.setupEducationItems();
      this.setupExperienceCards();
      this.setupAwardItems();
      this.setupSocialLinks();
      this.setupProfileHoverEffects();
      this.setupDynamicDividers();
      this.setupBioSummaryEffect();
      this.setupExpandableSections();
      this.setupStoryTimeline();
    }
  },

  // Add scroll effects to story elements
  setupStoryScrollEffects() {
    const chapters = document.querySelectorAll('.story-chapter');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Add staggered animation to paragraphs
          const paragraphs = entry.target.querySelectorAll('p');
          paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            p.style.transition = `all 0.5s ease ${0.2 + (index * 0.1)}s`;
            
            setTimeout(() => {
              p.style.opacity = '1';
              p.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
    
    // Set initial styles and observe chapters
    chapters.forEach(chapter => {
      // Prepare for animation
      chapter.style.opacity = '0';
      chapter.style.transform = 'translateY(30px)';
      chapter.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(chapter);
    });
    
    // Add fade effect to dividers
    const dividers = document.querySelectorAll('.story-divider');
    const dividerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          entry.target.style.opacity = '1';
          dividerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    dividers.forEach(divider => {
      divider.style.opacity = '0';
      divider.style.transition = 'opacity 1s ease';
      dividerObserver.observe(divider);
    });
    
    // Add special effects to first letter of paragraphs
    const firstParagraphs = document.querySelectorAll('.chapter-content p:first-of-type');
    firstParagraphs.forEach(p => {
      // Add subtle animation to draw attention to the first letter
      const firstLetter = p.textContent.charAt(0);
      const restOfText = p.textContent.slice(1);
      
      p.innerHTML = `<span class="first-letter">${firstLetter}</span>${restOfText}`;
      
      // Add hover effects to first letter
      const firstLetterSpan = p.querySelector('.first-letter');
      if (firstLetterSpan) {
        firstLetterSpan.addEventListener('mouseenter', () => {
          firstLetterSpan.style.transform = 'scale(1.1) rotate(5deg)';
          firstLetterSpan.style.color = 'var(--accent-color)';
          firstLetterSpan.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.3)';
        });
        
        firstLetterSpan.addEventListener('mouseleave', () => {
          firstLetterSpan.style.transform = '';
          firstLetterSpan.style.color = '';
          firstLetterSpan.style.textShadow = '';
        });
      }
    });
  },
  
  // Add animation to education items
  setupEducationItems() {
    const educationItems = document.querySelectorAll('.education-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    educationItems.forEach(item => {
      // Set initial state
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      item.style.transition = 'all 0.6s ease';
      
      // Add hover effect
      item.addEventListener('mouseenter', () => {
        item.style.borderLeftColor = 'var(--accent-color)';
        item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        const date = item.querySelector('.education-date');
        if (date) {
          date.style.color = 'var(--accent-color)';
          date.style.transform = 'scale(1.05)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.borderLeftColor = '';
        item.style.boxShadow = '';
        const date = item.querySelector('.education-date');
        if (date) {
          date.style.color = '';
          date.style.transform = '';
        }
      });
      
      observer.observe(item);
    });
  },
  
  // Add animation to experience cards
  setupExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });
    
    experienceCards.forEach((card, index) => {
      // Set animation delay based on index
      card.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
      
      // Add hover effect
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.experience-icon');
        const heading = card.querySelector('h3');
        
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
          icon.style.background = 'rgba(244, 165, 96, 0.2)';
          icon.style.borderColor = 'var(--accent-color)';
        }
        if (heading) {
          heading.style.color = 'var(--accent-color)';
        }
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.experience-icon');
        const heading = card.querySelector('h3');
        
        if (icon) {
          icon.style.transform = '';
          icon.style.background = '';
          icon.style.borderColor = '';
        }
        if (heading) {
          heading.style.color = '';
        }
        card.style.transform = '';
        card.style.boxShadow = '';
      });
      
      observer.observe(card);
    });
  },
  
  // Add animation to award items
  setupAwardItems() {
    const awardItems = document.querySelectorAll('.award-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    awardItems.forEach(item => {
      // Set initial state
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'all 0.5s ease';
      
      // Add hover effect
      item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.award-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(15deg)';
          icon.style.color = 'var(--accent-color)';
        }
        item.style.borderColor = 'var(--accent-color)';
        item.style.background = 'rgba(244, 165, 96, 0.05)';
      });
      
      item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.award-icon');
        if (icon) {
          icon.style.transform = '';
          icon.style.color = '';
        }
        item.style.borderColor = '';
        item.style.background = '';
      });
      
      observer.observe(item);
    });
  },
  
  // Set up animation for social links
  setupSocialLinks() {
    const links = document.querySelectorAll('.social-links a');
    
    links.forEach((link, index) => {
      // Add staggered animation
      link.style.opacity = '0';
      link.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        link.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, 300 + (index * 100));
      
      // Add hover effect
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px)';
        const icon = link.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
        const icon = link.querySelector('i');
        if (icon) {
          icon.style.transform = '';
        }
      });
    });
  },
  
  // Add dynamic effects to profile section
  setupProfileHoverEffects() {
    const profileSection = document.querySelector('.profile-section');
    const profileName = document.querySelector('.profile-name');
    const profileImage = document.querySelector('.profile-image img');
    
    if (profileSection) {
      profileSection.addEventListener('mouseenter', () => {
        profileSection.style.transform = 'translateY(-5px)';
        profileSection.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.25)';
      });
      
      profileSection.addEventListener('mouseleave', () => {
        profileSection.style.transform = '';
        profileSection.style.boxShadow = '';
      });
    }
    
    if (profileName) {
      profileName.addEventListener('mouseenter', () => {
        const after = document.createElement('style');
        after.textContent = '.profile-name::after { width: 100%; }';
        document.head.appendChild(after);
      });
      
      profileName.addEventListener('mouseleave', () => {
        const styles = document.querySelectorAll('style');
        styles.forEach(style => {
          if (style.textContent.includes('.profile-name::after')) {
            style.remove();
          }
        });
      });
    }
    
    // Add interactive effect to profile image
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
      
      // Add subtle movement effect on mouse move
      document.addEventListener('mousemove', (e) => {
        if (profileImage.matches(':hover')) {
          const moveX = (e.clientX - window.innerWidth / 2) / 50;
          const moveY = (e.clientY - window.innerHeight / 2) / 50;
          profileImage.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        }
      });
    }
  },
  
  // Add animated visual dividers
  setupDynamicDividers() {
    const dividers = document.querySelectorAll('.divider-line');
    
    dividers.forEach(divider => {
      // Add decorative elements to dividers
      const leftStar = document.createElement('span');
      leftStar.className = 'divider-star left';
      leftStar.innerHTML = '✦';
      
      const rightStar = document.createElement('span');
      rightStar.className = 'divider-star right';
      rightStar.innerHTML = '✦';
      
      divider.appendChild(leftStar);
      divider.appendChild(rightStar);
      
      // Add hover effects to dividers
      divider.addEventListener('mouseenter', () => {
        divider.style.background = 'linear-gradient(to right, transparent, rgba(244, 165, 96, 0.7) 50%, transparent)';
        leftStar.style.transform = 'translateX(-10px) rotate(-15deg)';
        rightStar.style.transform = 'translateX(10px) rotate(15deg)';
      });
      
      divider.addEventListener('mouseleave', () => {
        divider.style.background = '';
        leftStar.style.transform = '';
        rightStar.style.transform = '';
      });
    });
  },
  
  // Add effect to the bio summary blockquote
  setupBioSummaryEffect() {
    const bioSummary = document.querySelector('.bio-summary blockquote');
    
    if (bioSummary) {
      // Add subtle highlight effect on scroll
      window.addEventListener('scroll', () => {
        const rect = bioSummary.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          bioSummary.style.borderLeftColor = 'var(--accent-color)';
          bioSummary.style.transform = 'translateX(5px)';
        } else {
          bioSummary.style.borderLeftColor = '';
          bioSummary.style.transform = '';
        }
      });
      
      // Add click to copy quote functionality
      bioSummary.addEventListener('click', () => {
        const quoteText = bioSummary.textContent.trim();
        navigator.clipboard.writeText(quoteText).then(() => {
          // Show a temporary tooltip
          const tooltip = document.createElement('div');
          tooltip.className = 'tooltip';
          tooltip.textContent = 'Quote copied!';
          tooltip.style.position = 'absolute';
          tooltip.style.left = '50%';
          tooltip.style.bottom = '-20px';
          tooltip.style.transform = 'translateX(-50%)';
          tooltip.style.background = 'var(--accent-color)';
          tooltip.style.color = 'white';
          tooltip.style.padding = '5px 10px';
          tooltip.style.borderRadius = '3px';
          tooltip.style.fontSize = '12px';
          tooltip.style.opacity = '0';
          tooltip.style.transition = 'opacity 0.3s ease';
          
          bioSummary.style.position = 'relative';
          bioSummary.appendChild(tooltip);
          
          setTimeout(() => { tooltip.style.opacity = '1'; }, 10);
          setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
          }, 2000);
        });
      });
    }
  },
  
  // Setup expandable sections with toggle functionality
  setupExpandableSections() {
    const expandableSections = document.querySelectorAll('.expandable-section');
    
    expandableSections.forEach(section => {
      const sectionHeader = section.querySelector('.section-header');
      const sectionContent = section.querySelector('.section-content');
      const toggleIcon = section.querySelector('.toggle-icon i');
      const sectionPreview = section.querySelector('.section-preview');
      
      if (sectionHeader && sectionContent) {
        // Set initial states
        sectionContent.style.height = '0';
        sectionContent.style.overflow = 'hidden';
        sectionContent.style.transition = 'height 0.5s ease, opacity 0.5s ease';
        sectionContent.style.opacity = '0';
        
        // Add hover effect to preview
        sectionPreview.addEventListener('mouseenter', () => {
          sectionPreview.style.color = 'var(--accent-color)';
          sectionPreview.style.transform = 'translateX(5px)';
        });
        
        sectionPreview.addEventListener('mouseleave', () => {
          sectionPreview.style.color = '';
          sectionPreview.style.transform = '';
        });
        
        // Toggle section on click
        sectionHeader.addEventListener('click', () => {
          const isExpanded = !sectionContent.classList.contains('hidden');
          
          if (isExpanded) {
            // Collapse
            toggleIcon.className = 'fas fa-chevron-down';
            sectionContent.style.opacity = '0';
            setTimeout(() => {
              sectionContent.style.height = '0';
              sectionContent.classList.add('hidden');
            }, 200);
          } else {
            // Expand
            toggleIcon.className = 'fas fa-chevron-up';
            sectionContent.classList.remove('hidden');
            
            // Calculate the height dynamically
            const height = sectionContent.scrollHeight;
            sectionContent.style.height = `${height}px`;
            setTimeout(() => {
              sectionContent.style.opacity = '1';
            }, 100);
            
            // If it's the first section, also execute story timeline
            if (section.id === 'story-section') {
              // Initialize timeline if it hasn't been
              this.setupStoryTimeline();
            }
            
            // Scroll to section after expansion
            const headerHeight = 100; // Approximate header height
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
            
            // Close other sections
            expandableSections.forEach(otherSection => {
              if (otherSection !== section) {
                const otherContent = otherSection.querySelector('.section-content');
                const otherIcon = otherSection.querySelector('.toggle-icon i');
                if (!otherContent.classList.contains('hidden')) {
                  otherIcon.className = 'fas fa-chevron-down';
                  otherContent.style.opacity = '0';
                  setTimeout(() => {
                    otherContent.style.height = '0';
                    otherContent.classList.add('hidden');
                  }, 200);
                }
              }
            });
          }
        });
        
        // Add hover effect to section header
        sectionHeader.addEventListener('mouseenter', () => {
          const h2 = sectionHeader.querySelector('h2');
          if (h2) {
            h2.style.color = 'var(--accent-color)';
          }
          toggleIcon.style.transform = 'scale(1.2)';
        });
        
        sectionHeader.addEventListener('mouseleave', () => {
          const h2 = sectionHeader.querySelector('h2');
          if (h2) {
            h2.style.color = '';
          }
          toggleIcon.style.transform = '';
        });
      }
    });
    
    // Auto-expand a section on initial load (optional)
    setTimeout(() => {
      const firstSection = document.querySelector('#story-section .section-header');
      if (firstSection) {
        // firstSection.click(); // Uncomment to auto-expand the first section
      }
    }, 1000);
  },
  
  // Setup interactive story timeline
  setupStoryTimeline() {
    const storyTimeline = document.querySelector('.story-timeline-container');
    if (!storyTimeline) return;
    
    // Check if timeline is already initialized
    if (storyTimeline.dataset.initialized === 'true') return;
    storyTimeline.dataset.initialized = 'true';
    
    // Inject CSS styles for timeline directly to ensure they're applied
    this.injectTimelineStyles();
    
    const navItems = document.querySelectorAll('.timeline-nav-item');
    const scenes = document.querySelectorAll('.story-scene');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentPageEl = document.querySelector('.current-page');
    const progressBar = document.querySelector('.timeline-progress');
    
    let currentIndex = 0;
    const totalScenes = scenes.length;
    
    // Initialize page indicators
    document.querySelector('.total-pages').textContent = totalScenes;
    currentPageEl.textContent = currentIndex + 1;
    
    // Function to update the timeline progress bar
    const updateProgress = (index) => {
      const progressPercentage = ((index + 1) / totalScenes) * 100;
      progressBar.style.width = `${progressPercentage}%`;
    };
    
    // Function to update current scene
    const updateScene = (index) => {
      // Update scenes
      scenes.forEach((scene, i) => {
        if (i === index) {
          scene.classList.add('active');
        } else {
          scene.classList.remove('active');
        }
      });
      
      // Update navigation
      navItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      
      // Update page indicator
      currentPageEl.textContent = index + 1;
      
      // Update progress bar
      updateProgress(index);
      
      // Update current index
      currentIndex = index;
    };
    
    // Navigation item click handlers
    navItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        updateScene(index);
      });
    });
    
    // Next button handler
    nextBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % totalScenes;
      updateScene(nextIndex);
    });
    
    // Previous button handler
    prevBtn.addEventListener('click', () => {
      const prevIndex = (currentIndex - 1 + totalScenes) % totalScenes;
      updateScene(prevIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Only if story section is expanded
      if (document.querySelector('#story-section .section-content').classList.contains('hidden')) {
        return;
      }
      
      if (e.key === 'ArrowRight') {
        nextBtn.click();
      } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
      }
    });
    
    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleSwipe = () => {
      const minSwipeDistance = 50;
      const swipeDiff = touchEndX - touchStartX;
      
      if (Math.abs(swipeDiff) > minSwipeDistance) {
        if (swipeDiff > 0) {
          // Swiped right, go to previous
          prevBtn.click();
        } else {
          // Swiped left, go to next
          nextBtn.click();
        }
      }
    };
    
    storyTimeline.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    storyTimeline.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    // Create background elements if images are missing
    scenes.forEach((scene) => {
      const bgImg = scene.querySelector('.scene-background');
      if (bgImg && bgImg.style.backgroundImage.includes('missing-image')) {
        // Create a fallback gradient background
        const bgId = scene.id.split('-')[1]; // e.g., "origins", "philosophy"
        
        // Different gradient for each scene
        let gradient;
        switch(bgId) {
          case 'origins':
            gradient = 'linear-gradient(135deg, #412c0f 0%, #5a421c 100%)';
            break;
          case 'philosophy':
            gradient = 'linear-gradient(135deg, #4a3517 0%, #6b4b22 100%)';
            break;
          case 'reflection':
            gradient = 'linear-gradient(135deg, #533e1e 0%, #785529 100%)';
            break;
          case 'journey':
            gradient = 'linear-gradient(135deg, #5c4726 0%, #856030 100%)';
            break;
          case 'path':
            gradient = 'linear-gradient(135deg, #654f2d 0%, #926a36 100%)';
            break;
          default:
            gradient = 'linear-gradient(135deg, #412c0f 0%, #6b4b22 100%)';
        }
        
        bgImg.style.backgroundImage = gradient;
      }
    });
    
    // Initialize first scene
    updateScene(0);
    
    // Auto-cycle through scenes (optional)
    /*
    const autoCycleInterval = 8000; // 8 seconds per scene
    const autoCycle = setInterval(() => {
      if (document.querySelector('#story-section .section-content').classList.contains('hidden')) {
        // Don't cycle if the section is hidden
        return;
      }
      const nextIndex = (currentIndex + 1) % totalScenes;
      updateScene(nextIndex);
    }, autoCycleInterval);
    */
  },
  
  // Inject CSS directly to avoid conflicts with other styles
  injectTimelineStyles() {
    // Check if styles are already injected
    if (document.getElementById('timeline-styles')) return;
    
    const timelineStyles = `
      .story-timeline-container {
        position: relative;
        width: 100%;
        min-height: 500px;
        margin: 2rem 0;
        overflow: hidden;
      }
      
      .timeline-navigation {
        display: flex;
        width: 100%;
        margin-bottom: 1.5rem;
        position: relative;
        padding: 0 1rem;
        flex-wrap: wrap;
      }
      
      .timeline-nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        position: relative;
        padding: 0.5rem;
        cursor: pointer;
        transition: all 0.4s ease;
        z-index: 2;
      }
      
      .timeline-nav-item::after {
        content: '';
        position: absolute;
        right: -15px;
        top: 50%;
        width: 30px;
        height: 2px;
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%);
        z-index: 1;
      }
      
      .timeline-nav-item:last-child::after {
        display: none;
      }
      
      .nav-indicator {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(65, 44, 15, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.5rem;
        position: relative;
        border: 2px solid rgba(244, 165, 96, 0.3);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        overflow: hidden;
      }
      
      .nav-indicator span {
        font-family: "Orbitron", sans-serif;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.8);
        transition: all 0.3s ease;
      }
      
      .nav-label {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        transition: all 0.3s ease;
      }
      
      .timeline-nav-item:hover .nav-indicator,
      .timeline-nav-item.active .nav-indicator {
        background: rgba(244, 165, 96, 0.2);
        border-color: rgb(244, 165, 96);
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(244, 165, 96, 0.3);
      }
      
      .timeline-nav-item:hover .nav-indicator span,
      .timeline-nav-item.active .nav-indicator span {
        color: rgb(244, 165, 96);
      }
      
      .timeline-nav-item:hover .nav-label,
      .timeline-nav-item.active .nav-label {
        color: rgb(244, 165, 96);
        transform: translateY(2px);
        font-weight: 600;
      }
      
      .timeline-progress-bar {
        position: absolute;
        top: 19px;
        left: 0;
        width: 100%;
        height: 2px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 1;
        padding: 0 40px;
      }
      
      .timeline-progress {
        height: 100%;
        width: 0;
        background: linear-gradient(to right, rgb(244, 165, 96), rgba(244, 165, 96, 0.3));
        transition: width 0.5s ease-in-out;
      }
      
      .story-viewport {
        position: relative;
        width: 100%;
        min-height: 450px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }
      
      .story-scene {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
        pointer-events: none;
      }
      
      .story-scene.active {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
        z-index: 5;
      }
      
      .scene-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        z-index: 1;
        transform: scale(1.05);
        transition: transform 0.5s ease-out;
      }
      
      .story-scene.active .scene-background {
        transform: scale(1);
      }
      
      .scene-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, 
          rgba(65, 44, 15, 0.5),
          rgba(65, 44, 15, 0.85)
        );
        z-index: 2;
      }
      
      .scene-content {
        position: relative;
        z-index: 3;
        width: 100%;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .scene-content h3 {
        font-size: 2rem;
        color: rgb(244, 165, 96);
        margin-bottom: 1.5rem;
        position: relative;
        display: inline-block;
        font-family: "Orbitron", sans-serif;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.5s ease 0.2s;
      }
      
      .scene-content h3::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 50px;
        height: 3px;
        background: rgb(244, 165, 96);
        transition: width 0.5s ease 0.4s;
      }
      
      .story-scene.active .scene-content h3 {
        transform: translateY(0);
        opacity: 1;
      }
      
      .story-scene.active .scene-content h3::after {
        width: 100px;
      }
      
      .scene-text {
        max-width: 800px;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.6s ease 0.3s;
      }
      
      .story-scene.active .scene-text {
        transform: translateY(0);
        opacity: 1;
      }
      
      .scene-text p {
        font-size: 1rem;
        line-height: 1.7;
        margin-bottom: 1.2rem;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      }
      
      .scene-quote {
        margin-top: 1.5rem;
        padding: 1rem 0;
        font-size: 1.4rem;
        font-family: "Orbitron", sans-serif;
        color: rgb(244, 165, 96);
        border-left: 3px solid rgb(244, 165, 96);
        padding-left: 1.5rem;
        max-width: 700px;
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.7s ease 0.5s;
        position: relative;
      }
      
      .scene-quote::before {
        content: '"';
        position: absolute;
        top: 0;
        left: -20px;
        font-size: 3rem;
        color: rgba(244, 165, 96, 0.3);
        line-height: 1;
      }
      
      .story-scene.active .scene-quote {
        opacity: 1;
        transform: translateX(0);
      }
      
      .story-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.5rem;
        gap: 1.5rem;
      }
      
      .story-nav-btn {
        background: rgba(65, 44, 15, 0.5);
        border: 1px solid rgba(244, 165, 96, 0.3);
        color: rgb(244, 165, 96);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .story-nav-btn:hover {
        background: rgba(244, 165, 96, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
      
      .story-page-indicator {
        font-family: "Orbitron", sans-serif;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
      }
      
      /* Responsive design for timeline */
      @media (max-width: 768px) {
        .timeline-navigation {
          display: none;
        }
        
        .scene-content {
          padding: 1.5rem;
        }
        
        .scene-content h3 {
          font-size: 1.5rem;
        }
        
        .scene-text p {
          font-size: 0.9rem;
        }
        
        .scene-quote {
          font-size: 1.1rem;
          padding-left: 1rem;
        }
      }
      
      @media (max-width: 480px) {
        .story-scene {
          min-height: 500px;
        }
        
        .scene-content {
          padding: 1rem;
        }
        
        .scene-content h3 {
          font-size: 1.3rem;
        }
        
        .scene-text p {
          font-size: 0.85rem;
        }
        
        .scene-quote {
          font-size: 1rem;
        }
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'timeline-styles';
    styleSheet.innerHTML = timelineStyles;
    document.head.appendChild(styleSheet);
  },
  
  // Re-trigger scroll effects for dynamically shown elements
  triggerScrollEffects() {
    const chapters = document.querySelectorAll('.story-chapter:not(.animated)');
    
    chapters.forEach((chapter, index) => {
      setTimeout(() => {
        chapter.classList.add('animated');
        chapter.style.opacity = '1';
        chapter.style.transform = 'translateY(0)';
        
        // Add staggered animation to paragraphs
        const paragraphs = chapter.querySelectorAll('p');
        paragraphs.forEach((p, pIndex) => {
          p.style.opacity = '0';
          p.style.transform = 'translateY(20px)';
          p.style.transition = `all 0.5s ease ${0.2 + (pIndex * 0.1)}s`;
          
          setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, 300 + (pIndex * 100));
        });
      }, index * 300);
    });
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  AboutMeSection.init();
});

export default AboutMeSection; 
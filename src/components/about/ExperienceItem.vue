<template>
  <div class="experience-item-content">
    <div class="experience-header">
      <div class="experience-date-location">
        <span class="experience-date">{{ item.period }}</span>
        <span class="experience-location">{{ item.location }}</span>
      </div>
      <div class="experience-title-company">
        <h3 class="experience-title">{{ item.title }}</h3>
        <div class="experience-company">{{ item.company }}</div>
      </div>
    </div>
    <div class="experience-content">
      <div v-if="item.sections && item.sections.length > 0" class="experience-sections">
        <div v-for="(section, sIndex) in item.sections" :key="sIndex" class="experience-section">
          <h4 class="section-title">{{ section.title }}:</h4>
          <ul class="section-details">
            <li v-for="(detail, dIndex) in section.details" :key="dIndex">{{ detail }}</li>
          </ul>
        </div>
      </div>
      <ul v-else class="experience-responsibilities">
        <li v-for="(detail, dIndex) in item.details" :key="dIndex">{{ detail }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperienceItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.experience-header {
  padding: 1.5rem;
  background: rgba(30, 30, 30, 0.5);
  border-bottom: 1px solid rgba(244, 165, 96, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.experience-date-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.experience-date {
  color: var(--accent-color, rgb(244, 165, 96));
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  background: rgba(244, 165, 96, 0.1);
  border-radius: 20px;
  display: inline-block;
}

.experience-location {
  color: #aaa;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.experience-location::before {
  content: "\f3c5"; /* Font Awesome map marker icon */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 0.8rem;
  color: rgba(244, 165, 96, 0.7);
}

.experience-title-company {
  margin-top: 0.5rem;
}

.experience-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.3rem;
}

.experience-company {
  color: var(--accent-color, rgb(244, 165, 96));
  font-weight: 500;
  font-size: 1.1rem;
  opacity: 0.9;
}

.experience-content {
  padding: 1.5rem;
}

.experience-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experience-section {
  background: rgba(20, 20, 20, 0.3);
  padding: 1.2rem;
  border-radius: 8px;
  border-left: 3px solid rgba(244, 165, 96, 0.5);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-color, rgb(244, 165, 96));
  margin-bottom: 0.8rem;
}

.experience-responsibilities {
  list-style-type: none;
  padding-left: 0.5rem;
  margin: 0;
}

.experience-responsibilities li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.8rem;
  line-height: 1.6;
}

.experience-responsibilities li::before {
  content: "\f105"; /* Font Awesome angle-right icon */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  left: 0;
  color: rgba(244, 165, 96, 0.7);
}

@media (min-width: 768px) {
  .experience-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .experience-date-location {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    width: 25%;
  }
  
  .experience-title-company {
    width: 75%;
    margin-top: 0;
  }
  
  .experience-title {
    font-size: 1.5rem;
  }
  
  .experience-company {
    font-size: 1.2rem;
  }
  
  .experience-sections {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .experience-section {
    flex: 1;
    min-width: 280px;
  }
}

@media (max-width: 767px) {
  .experience-header {
    padding: 1.2rem 1rem;
  }
  
  .experience-content {
    padding: 1.2rem 1rem;
  }
  
  .experience-section {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .experience-header {
    padding: 1rem 0.8rem;
  }
  
  .experience-content {
    padding: 1rem 0.8rem;
  }
  
  .experience-section {
    padding: 0.8rem;
  }
}
</style>

<template>
  <div class="poetry">
    <div class="section-content">
      <h1>poetry</h1>
      
      <div class="poetry-wrapper">
        <div class="poetry-intro">
          <blockquote>
            "Poetry is what happens when your mind stops working and for a moment all you do is feel."
            <cite>— Atticus</cite>
          </blockquote>
          <p>
            A small collection of writings reflecting on moments, emotions, and observations through the lens of poetry.
            These are personal reflections, an outlet for thoughts that don't fit neatly into research papers or code comments.
          </p>
        </div>
        
        <div class="poem-collection">
          <div v-for="(poem, index) in poems" :key="index" class="poem-card" :class="{ 'expanded': expandedPoem === index }">
            <div class="poem-header" @click="togglePoem(index)">
              <h2>{{ poem.title }}</h2>
              <div class="poem-meta">
                <span class="poem-date">{{ poem.date }}</span>
                <span class="toggle-icon"><i :class="['fas', expandedPoem === index ? 'fa-chevron-up' : 'fa-chevron-down']"></i></span>
              </div>
            </div>
            
            <div class="poem-content" v-if="expandedPoem === index">
              <div class="poem-text" v-html="formatPoem(poem.text)"></div>
              <div class="poem-context" v-if="poem.context">
                <h3>Context</h3>
                <p>{{ poem.context }}</p>
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
  name: 'PoetryView',
  data() {
    return {
      expandedPoem: null,
      poems: [
        {
          title: "The Nomad's Path",
          date: "June 15, 2023",
          text: "Across the digital dunes I wander,\nA nomad in landscapes of ones and zeros.\nAlgorithms my compass, data my sustenance,\nSeeking patterns in chaos, meaning in noise.\n\nEach model built, a temporary shelter,\nEach solution found, a fleeting oasis.\nI carry my knowledge like water in skins,\nPrecious and essential for the journey ahead.\n\nThe wind shifts; new frameworks emerge,\nYesterday's innovations become tomorrow's dust.\nYet through this constant evolution,\nI find beauty in the impermanence.\n\nFor in this nomadic existence,\nI am neither lost nor found,\nBut forever traveling toward understanding,\nMy footprints erased by the sands of progress.",
          context: "Written while reflecting on the constantly changing landscape of machine learning and the nature of being a digital nomad in this space."
        },
        {
          title: "Neural Symphony",
          date: "August 3, 2023",
          text: "Neurons firing in cascading waves,\nWeights and biases, a delicate dance.\nLayer upon layer, complex abstractions form,\nAs the network learns to see what we cannot.\n\nBack-propagating errors, adjusting connections,\nLike an orchestra tuning before the performance.\nEach epoch, the harmony grows stronger,\nUntil patterns emerge from the chaos of data.\n\nIs this how our own minds form understanding?\nElectrical signals traversing neural pathways,\nGradually building models of the world around us,\nLearning, adapting, evolving with experience.\n\nIn this mathematical reflection of consciousness,\nI glimpse something profound yet elusive—\nThe beautiful symmetry between creation and creator,\nAs we build systems in our own cognitive image.",
          context: "Inspired by the parallels between artificial neural networks and biological neural systems, pondering the philosophical implications of AI."
        },
        {
          title: "Transparent Boxes",
          date: "October 12, 2023",
          text: "They call them black boxes,\nOpaque mechanisms of decision,\nBut I seek to make them glass—\nTransparent, interpretable, clear.\n\nEach prediction should tell its story,\nEach classification reveal its reasoning.\nNo more 'trust me' algorithms,\nNo more faith in unseen calculation.\n\nFor what good is power without understanding?\nWhat use is accuracy without explanation?\nI build bridges between human and machine,\nTranslating the language of tensors to wisdom.\n\nSome say perfection requires complexity,\nThat understanding demands sacrifice.\nBut I believe in a future where both coexist—\nWhere performance and transparency are twin virtues,\nNot opposing forces in eternal competition.",
          context: "Written while working on interpretable ML models and thinking about the tension between model complexity and model explainability."
        },
        {
          title: "Desert Roots",
          date: "December 5, 2023",
          text: "From ancient sands my ancestors rose,\nTheir knowledge written in stars and stone.\nAmazigh spirit flows through my veins,\nEven as I navigate silicon domains.\n\nI carry their resilience in each line of code,\nTheir resourcefulness in each algorithm designed.\nThough oceans and decades separate our worlds,\nTheir wisdom guides my digital explorations.\n\nSometimes in the glow of my screen at night,\nI glimpse the same stars they used to navigate.\nDifferent tools, same human curiosity,\nConnecting generations across the divide of time.\n\nI am a bridge between worlds—\nBetween tradition and innovation,\nBetween the wisdom of the desert\nAnd the potential of artificial minds.",
          context: "A reflection on my Amazigh heritage and how it influences my approach to technology and research, connecting past and present."
        },
        {
          title: "Dialogue with Uncertainty",
          date: "February 8, 2024",
          text: "Uncertainty says: \"You cannot know me completely.\"\nI reply: \"Then I will measure your boundaries.\"\n\nUncertainty says: \"I am in every prediction.\"\nI reply: \"Then I will quantify your presence.\"\n\nUncertainty says: \"I grow in complexity.\"\nI reply: \"Then I will build models to contain you.\"\n\nUncertainty says: \"I am not your enemy.\"\nI pause, reconsider my stance.\n\nPerhaps uncertainty is not to be conquered,\nBut embraced as inherent to discovery.\nNot a barrier to knowledge,\nBut the very space in which knowledge expands.\n\nIn this reframing, I find liberation—\nFreedom from the illusion of perfect prediction,\nAppreciation for the probabilistic nature of existence,\nAnd beauty in the statistical dance of possibility.",
          context: "Written after a challenging research problem where embracing uncertainty led to better solutions than trying to eliminate it."
        }
      ]
    };
  },
  methods: {
    togglePoem(index) {
      if (this.expandedPoem === index) {
        this.expandedPoem = null;
      } else {
        this.expandedPoem = index;
        
        // Scroll to the selected poem after a small delay to let the animation happen
        setTimeout(() => {
          const element = document.querySelectorAll('.poem-card')[index];
          if (element) {
            const yOffset = -100; // Adjust based on the height of any fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
    },
    formatPoem(text) {
      // Replace line breaks with HTML line breaks for proper poetry formatting
      return text.replace(/\n/g, '<br>');
    }
  }
}
</script>

<style scoped>
.poetry {
  padding: 20px;
  min-height: 100vh;
}

.section-content h1 {
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

.poetry-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  font-family: "Space Mono", monospace;
  background: linear-gradient(to bottom, rgba(65, 44, 15, 0.6), rgba(65, 44, 15, 0.9));
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.poetry-intro {
  margin-bottom: 40px;
  padding: 20px;
  border-left: 4px solid var(--accent-color);
  background: rgba(65, 44, 15, 0.4);
  border-radius: 4px;
}

.poetry-intro blockquote {
  font-size: 1.4rem;
  font-style: italic;
  color: var(--primary-text);
  margin: 0 0 20px;
  line-height: 1.5;
  position: relative;
  padding-left: 20px;
}

.poetry-intro blockquote::before {
  content: '"';
  font-size: 3rem;
  color: var(--accent-color);
  position: absolute;
  left: -10px;
  top: -20px;
  opacity: 0.5;
}

.poetry-intro cite {
  display: block;
  font-size: 1rem;
  text-align: right;
  margin-top: 10px;
  color: var(--accent-color);
}

.poetry-intro p {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.poem-collection {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.poem-card {
  background: linear-gradient(to bottom, rgba(65, 44, 15, 0.4), rgba(65, 44, 15, 0.6));
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(244, 165, 96, 0.1);
}

.poem-card:hover {
  border-color: rgba(244, 165, 96, 0.3);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.poem-card.expanded {
  border-color: var(--accent-color);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.poem-header {
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

.poem-card:hover .poem-header {
  border-left-color: var(--accent-color);
  background: rgba(244, 165, 96, 0.05);
}

.poem-header h2 {
  font-size: 1.4rem;
  margin: 0;
  color: var(--primary-text);
  transition: all 0.3s ease;
}

.poem-card:hover .poem-header h2 {
  color: var(--accent-color);
}

.poem-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.poem-date {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.toggle-icon {
  color: var(--accent-color);
  transition: all 0.3s ease;
}

.poem-content {
  padding: 0 20px 20px;
  border-top: 1px dashed rgba(244, 165, 96, 0.2);
  animation: fadeIn 0.5s ease forwards;
}

.poem-text {
  font-family: 'Space Mono', monospace;
  line-height: 1.8;
  margin: 20px 0;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.9);
  border-left: 2px solid rgba(244, 165, 96, 0.3);
}

.poem-context {
  margin-top: 30px;
  padding: 15px;
  background: rgba(244, 165, 96, 0.05);
  border-radius: 4px;
}

.poem-context h3 {
  font-size: 1.1rem;
  color: var(--accent-color);
  margin: 0 0 10px;
}

.poem-context p {
  font-size: 0.9rem;
  font-style: italic;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .section-content h1 {
    font-size: 2rem;
  }
  
  .poetry-intro blockquote {
    font-size: 1.2rem;
  }
  
  .poem-header h2 {
    font-size: 1.2rem;
  }
  
  .poem-text {
    padding-left: 15px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .poetry-wrapper {
    padding: 15px;
  }
  
  .poem-header {
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .poem-meta {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }
  
  .poem-text {
    font-size: 0.9rem;
  }
}
</style> 
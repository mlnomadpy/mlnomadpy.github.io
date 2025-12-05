<template>
  <canvas id="sand" ref="sandCanvas"></canvas>
</template>

<script>
export default {
  name: 'SandStorm',
  data() {
    return {
      canvas: null,
      ctx: null,
      particles: [],
      width: 0,
      height: 0,
      animationId: null
    }
  },
  mounted() {
    this.initCanvas();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.animationId);
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.sandCanvas;
      this.ctx = this.canvas.getContext('2d');
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },
    createParticles() {
      this.particles = [];
      const particleCount = Math.floor(this.width * this.height / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(${244}, ${165}, ${96}, ${Math.random() * 0.5 + 0.25})`,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          lifespan: Math.random() * 100 + 100,
          age: 0
        });
      }
    },
    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        
        p.age++;
        if (p.age > p.lifespan) {
          // Reset particle
          p.x = Math.random() * this.width;
          p.y = Math.random() * this.height;
          p.age = 0;
          p.lifespan = Math.random() * 100 + 100;
        }
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around screen edges
        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;
        
        // Random movement changes
        if (Math.random() < 0.01) {
          p.speedX = Math.random() * 2 - 1;
          p.speedY = Math.random() * 2 - 1;
        }
        
        // Calculate opacity based on lifespan
        const opacity = (1 - p.age / p.lifespan) * 0.7;
        
        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color.replace(/[\d.]+\)$/g, `${opacity})`);
        this.ctx.fill();
      }
      
      this.animationId = requestAnimationFrame(this.animate);
    },
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.createParticles();
    }
  }
}
</script>

<style scoped>
canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
}
</style> 
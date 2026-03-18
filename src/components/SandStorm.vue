<template>
  <canvas id="sand" ref="sandCanvas" aria-hidden="true"></canvas>
</template>

<script>
import { debounce } from '@/utils/helpers';

const MAX_PARTICLES_DESKTOP = 200;
const MAX_PARTICLES_MOBILE = 80;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default {
  name: 'SandStorm',
  data() {
    return {
      canvas: null,
      ctx: null,
      particles: [],
      width: 0,
      height: 0,
      animationId: null,
      lastFrameTime: 0,
      reducedMotion: false
    }
  },
  created() {
    this._debouncedResize = debounce(this.handleResize, 250);
  },
  mounted() {
    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion = motionQuery.matches;
    motionQuery.addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      if (this.reducedMotion) {
        cancelAnimationFrame(this.animationId);
        this.ctx && this.ctx.clearRect(0, 0, this.width, this.height);
      } else {
        this.animate(0);
      }
    });

    if (this.reducedMotion) return;

    this.initCanvas();
    this.createParticles();
    this.animate(0);

    window.addEventListener('resize', this._debouncedResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this._debouncedResize);
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
      const isMobile = window.innerWidth < 768;
      const maxParticles = isMobile ? MAX_PARTICLES_MOBILE : MAX_PARTICLES_DESKTOP;
      const divisor = isMobile ? 25000 : 15000;
      const particleCount = Math.min(Math.floor(this.width * this.height / divisor), maxParticles);

      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(244, 165, 96, ${(Math.random() * 0.5 + 0.25).toFixed(2)})`,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          lifespan: Math.random() * 100 + 100,
          age: 0
        });
      }
    },
    animate(timestamp) {
      if (this.reducedMotion) return;

      // Throttle to target FPS
      const elapsed = timestamp - this.lastFrameTime;
      if (elapsed < FRAME_INTERVAL) {
        this.animationId = requestAnimationFrame(this.animate);
        return;
      }
      this.lastFrameTime = timestamp - (elapsed % FRAME_INTERVAL);

      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        p.age++;
        if (p.age > p.lifespan) {
          p.x = Math.random() * this.width;
          p.y = Math.random() * this.height;
          p.age = 0;
          p.lifespan = Math.random() * 100 + 100;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;

        if (Math.random() < 0.01) {
          p.speedX = Math.random() * 2 - 1;
          p.speedY = Math.random() * 2 - 1;
        }

        const opacity = (1 - p.age / p.lifespan) * 0.7;

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
  will-change: transform;
}
</style> 
# MLNomadpy Personal Website

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge)](https://github.com/mlnomadpy/mlnomadpy.github.io)

A modern, SEO-optimized personal portfolio and research website for Taha Bouhsine (MLNomadpy), built with Astro.js for optimal performance and SEO.

> **Note**: This site was migrated from Vue.js PWA to Astro.js for better SEO and GitHub Pages compatibility. The Vue.js version is preserved in the `vue-app` directory for reference.

## 🌐 Website

Visit the live website at [https://mlnomadpy.github.io](https://mlnomadpy.github.io)

## ✨ Features

### Core Features
- **Professional Portfolio**: Showcasing research, projects, and professional background
- **Publications & Research**: Display of academic papers and research contributions
- **Talks & Presentations**: Collection of past and upcoming talks and presentations
- **Life Events Timeline**: Interactive timeline of important life events
- **Interactive UI**: Modern, responsive design with smooth animations

### Technical Features
- **Static Site Generation**: Built with Astro.js for lightning-fast page loads
- **Zero JavaScript by Default**: Optimal performance with HTML + CSS
- **SEO Optimized**: 
  - Enhanced meta tags (title, description, keywords)
  - Open Graph and Twitter Cards for social sharing
  - Structured data (JSON-LD schema)
  - XML sitemap and robots.txt
  - Semantic HTML with proper heading hierarchy
- **Performance Optimized**:
  - Static HTML generation for instant page loads
  - Optimized CSS delivery
  - Minimal bundle sizes
  - Excellent Core Web Vitals scores
- **Accessibility**: WCAG 2.1 compliant with ARIA labels and keyboard navigation
- **Testing**: Unit tests with Vitest
- **Code Quality**: ESLint and Prettier for consistent code style
- **CI/CD**: Automated testing and deployment with GitHub Actions

## 🛠️ Technologies

- **Framework**: Astro.js 5 with Static Site Generation
- **Language**: TypeScript
- **Testing**: Vitest with Happy DOM
- **Linting**: ESLint 9
- **Formatting**: Prettier
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📂 Project Structure

This repository contains two versions:
- **`astro-app/`** - Current production version built with Astro.js (⭐ Active)
- **`vue-app/`** - Legacy Vue.js PWA version (archived for reference)
- **CI/CD**: GitHub Actions

## 🚀 Setup & Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mlnomadpy/mlnomadpy.github.io.git
   cd mlnomadpy.github.io/astro-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The site will be available at `http://localhost:4321/`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to be deployed.

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📁 Project Structure

```
mlnomadpy.github.io/
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Legacy Vue.js workflow (archived)
│       └── deploy-astro.yml     # Active Astro.js CI/CD workflow
├── astro-app/                   # Active Astro.js application
│   ├── public/                  # Static files
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── CNAME
│   ├── src/
│   │   ├── components/          # Astro components
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── layouts/             # Page layouts
│   │   │   └── BaseLayout.astro
│   │   ├── pages/               # Route pages (file-based routing)
│   │   │   ├── index.astro      # Home page
│   │   │   ├── about.astro
│   │   │   ├── research.astro
│   │   │   ├── talks.astro
│   │   │   ├── life.astro
│   │   │   └── 404.astro
│   │   └── styles/              # Global styles
│   │       └── global.css
│   ├── tests/
│   │   ├── setup.ts             # Test setup
│   │   └── unit/                # Unit tests
│   ├── astro.config.mjs         # Astro configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── vitest.config.ts         # Vitest configuration
│   ├── eslint.config.js         # ESLint configuration
│   ├── .prettierrc              # Prettier configuration
│   ├── package.json             # Dependencies and scripts
│   └── README.md                # Astro app documentation
├── vue-app/                     # Legacy Vue.js PWA (archived)
├── robots.txt                   # Root search engine instructions
├── sitemap.xml                  # Root XML sitemap
├── CNAME                        # Custom domain configuration
├── favicon.ico                  # Website favicon
└── README.md                    # This file
```
├── CNAME                    # Custom domain configuration
├── favicon.ico              # Website favicon
└── README.md                # This file
```

## 🧩 Components

The website consists of several main views:

- **HomeView**: Landing page with hero section and highlights
- **AboutView**: Personal information, story, education, and professional experience
- **ResearchView**: Research papers and academic contributions
- **TalksView**: Talks, presentations, and workshops
- **LifeView**: Timeline of important life events
- **NotFoundView**: 404 error page

### Reusable Components

- **HeaderComponent**: Navigation header with responsive mobile menu
- **FooterComponent**: Footer with links and social media

### Composables

- **useResponsive**: Handle responsive behavior and screen sizes
- **useIntersectionObserver**: Implement lazy loading and scroll animations
- **useMeta**: Manage SEO meta tags dynamically

## 🎯 Best Practices Implemented

### Code Organization
- ✅ Composition API for better code reusability
- ✅ Single Responsibility Principle in components
- ✅ Separation of concerns (views, components, composables, utils)
- ✅ DRY (Don't Repeat Yourself) principle

### Performance
- ✅ Lazy loading routes with dynamic imports
- ✅ Code splitting for vendor and app code
- ✅ Optimized bundle sizes
- ✅ Tree shaking for unused code elimination

### Testing
- ✅ Unit tests for components and utilities
- ✅ Test coverage for critical functionality
- ✅ Mocking for browser APIs

### Code Quality
- ✅ ESLint for code linting
- ✅ Prettier for consistent formatting
- ✅ JSDoc comments for documentation
- ✅ Meaningful variable and function names

### SEO & Accessibility
- ✅ Semantic HTML elements
- ✅ Proper heading hierarchy
- ✅ ARIA labels for screen readers
- ✅ Meta tags for search engines and social media
- ✅ Structured data (JSON-LD)
- ✅ Sitemap and robots.txt

### Security
- ✅ No hardcoded secrets
- ✅ Safe external links (noopener noreferrer)
- ✅ Input validation where applicable

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. Runs on push to master or pull requests
2. Installs dependencies
3. Runs linting checks
4. Executes all unit tests
5. Builds the production bundle
6. Deploys to GitHub Pages (on master branch)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm test && npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Taha Bouhsine**
- GitHub: [@mlnomadpy](https://github.com/mlnomadpy)
- LinkedIn: [Taha Bouhsine](https://linkedin.com/in/Tahabsn)
- Website: [MLNomadpy](https://mlnomadpy.github.io)

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Vite team for the blazing-fast build tool
- Open source community for inspiration and tools

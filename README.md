# MLNomadpy Personal Website

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge)](https://github.com/mlnomadpy/mlnomadpy.github.io)

A modern, SEO-optimized personal portfolio and research website for Taha Bouhsine (MLNomadpy), showcasing machine learning research, talks, publications, and professional experience.

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
- **Modern Architecture**: Built with Vue.js 3 Composition API
- **Modular Design**: Reusable components and composables
- **SEO Optimized**: 
  - Enhanced meta tags (title, description, keywords)
  - Open Graph and Twitter Cards for social sharing
  - Structured data (JSON-LD schema)
  - XML sitemap and robots.txt
  - Semantic HTML with proper heading hierarchy
- **Performance Optimized**:
  - Lazy loading for routes and components
  - Code splitting and tree shaking
  - Optimized bundle sizes
  - Efficient asset caching
- **Accessibility**: WCAG 2.1 compliant with ARIA labels and keyboard navigation
- **Testing**: Comprehensive unit tests with Vitest
- **Code Quality**: ESLint and Prettier for consistent code style
- **CI/CD**: Automated testing and deployment with GitHub Actions

## 🛠️ Technologies

- **Frontend Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite 7
- **Routing**: Vue Router 4
- **Testing**: Vitest with Vue Test Utils
- **Linting**: ESLint 9
- **Formatting**: Prettier
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🚀 Setup & Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mlnomadpy/mlnomadpy.github.io.git
   cd mlnomadpy.github.io/vue-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The site will be available at `http://localhost:5173/`

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
│       └── deploy.yml       # CI/CD workflow
├── vue-app/                 # Source code
│   ├── public/              # Static files
│   │   └── index.html       # HTML template with SEO meta tags
│   ├── src/
│   │   ├── assets/          # Global CSS and assets
│   │   │   └── main.css     # Global styles
│   │   ├── components/      # Reusable Vue components
│   │   │   ├── HeaderComponent.vue
│   │   │   └── FooterComponent.vue
│   │   ├── composables/     # Vue composables for reusable logic
│   │   │   ├── useResponsive.js
│   │   │   ├── useIntersectionObserver.js
│   │   │   └── useMeta.js
│   │   ├── router/          # Vue Router configuration
│   │   │   └── index.js
│   │   ├── utils/           # Utility functions
│   │   │   └── helpers.js
│   │   ├── views/           # Page components
│   │   │   ├── HomeView.vue
│   │   │   ├── AboutView.vue
│   │   │   ├── ResearchView.vue
│   │   │   ├── TalksView.vue
│   │   │   ├── LifeView.vue
│   │   │   └── NotFoundView.vue
│   │   ├── App.vue          # Root component
│   │   └── main.js          # Application entry point
│   ├── tests/
│   │   ├── setup.js         # Test setup and mocks
│   │   └── unit/            # Unit tests
│   ├── .eslintrc.json       # ESLint configuration
│   ├── .prettierrc          # Prettier configuration
│   ├── vite.config.js       # Vite build configuration
│   ├── vitest.config.js     # Vitest test configuration
│   ├── package.json         # Dependencies and scripts
│   └── README.md            # Vue app documentation
├── robots.txt               # Search engine crawling instructions
├── sitemap.xml              # XML sitemap for SEO
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

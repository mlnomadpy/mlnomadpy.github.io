# MLNomadpy Personal Website - Astro.js

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge)](https://github.com/mlnomadpy/mlnomadpy.github.io)

A modern, SEO-optimized personal portfolio and research website for Taha Bouhsine (MLNomadpy), built with Astro.js for optimal performance and SEO.

## 🌐 Website

Visit the live website at [https://mlnomadpy.github.io](https://mlnomadpy.github.io)

## ✨ Features

### Core Features
- **Professional Portfolio**: Showcasing research, projects, and professional background
- **Publications & Research**: Display of academic papers and research contributions
- **Talks & Presentations**: Collection of past and upcoming talks and presentations
- **Life Events Timeline**: Interactive timeline of important life events
- **Responsive Design**: Mobile-first design with smooth animations

### Technical Features
- **Static Site Generation**: Built with Astro.js for lightning-fast page loads
- **SEO Optimized**: 
  - Enhanced meta tags (title, description, keywords)
  - Open Graph and Twitter Cards for social sharing
  - Structured data (JSON-LD schema)
  - XML sitemap and robots.txt
  - Semantic HTML with proper heading hierarchy
- **Performance Optimized**:
  - Zero JavaScript by default
  - Optimized CSS delivery
  - Fast build times
  - Excellent Core Web Vitals
- **Accessibility**: WCAG 2.1 compliant with ARIA labels and keyboard navigation
- **Testing**: Unit tests with Vitest
- **Code Quality**: ESLint and Prettier for consistent code style
- **CI/CD**: Automated testing and deployment with GitHub Actions

## 🛠️ Technologies

- **Framework**: Astro.js 5
- **Language**: TypeScript
- **Testing**: Vitest with Happy DOM
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

### Preview Production Build

```bash
npm run preview
```

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
astro-app/
├── public/               # Static files
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── CNAME
├── src/
│   ├── components/       # Astro components
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/          # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/            # Route pages
│   │   ├── index.astro   # Home page
│   │   ├── about.astro
│   │   ├── research.astro
│   │   ├── talks.astro
│   │   ├── life.astro
│   │   └── 404.astro
│   └── styles/           # Global styles
│       └── global.css
├── tests/
│   ├── setup.ts          # Test setup
│   └── unit/             # Unit tests
├── astro.config.mjs      # Astro configuration
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Vitest configuration
├── eslint.config.js      # ESLint configuration
├── .prettierrc           # Prettier configuration
└── package.json          # Dependencies and scripts
```

## 🧩 Pages

The website consists of the following pages:

- **Home**: Landing page with hero section and highlights
- **About**: Personal information, story, education, and experience
- **Research**: Research papers and academic contributions
- **Talks**: Speaking engagements and workshops
- **Life**: Timeline of important life events
- **404**: Custom 404 error page

## 🎯 Best Practices Implemented

### Architecture
- ✅ Static Site Generation for optimal performance
- ✅ Component-based architecture
- ✅ Separation of concerns (layouts, components, pages, styles)
- ✅ TypeScript for type safety

### Performance
- ✅ Zero JavaScript by default (HTML + CSS only)
- ✅ Optimized CSS delivery
- ✅ Fast build times
- ✅ Minimal bundle sizes

### Testing
- ✅ Unit tests for critical functionality
- ✅ Test-driven development approach
- ✅ Good test coverage

### Code Quality
- ✅ ESLint for code linting
- ✅ Prettier for consistent formatting
- ✅ TypeScript for type safety
- ✅ Meaningful variable and function names

### SEO & Accessibility
- ✅ Semantic HTML elements
- ✅ Proper heading hierarchy
- ✅ ARIA labels for screen readers
- ✅ Meta tags for search engines and social media
- ✅ Structured data (JSON-LD)
- ✅ Sitemap and robots.txt
- ✅ Static HTML for search engine crawling

### Security
- ✅ No client-side JavaScript reduces attack surface
- ✅ Safe external links (noopener noreferrer)
- ✅ Content Security Policy ready

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. Runs on push to master or pull requests
2. Installs dependencies
3. Runs linting checks
4. Executes all unit tests
5. Builds the production bundle
6. Deploys to GitHub Pages (on master branch)

## 📊 Performance

Astro.js provides exceptional performance:
- **Fast Time to Interactive**: No JavaScript by default
- **Excellent Lighthouse Scores**: 100/100 in most categories
- **SEO Friendly**: Static HTML for easy indexing
- **Mobile Optimized**: Responsive design with fast load times

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

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 👤 Author

**Taha Bouhsine**
- GitHub: [@mlnomadpy](https://github.com/mlnomadpy)
- LinkedIn: [Taha Bouhsine](https://linkedin.com/in/Tahabsn)
- Website: [MLNomadpy](https://mlnomadpy.github.io)

## 🙏 Acknowledgments

- Astro team for the amazing framework
- Open source community for inspiration and tools
- Vue.js team for the original design inspiration

## 🔄 Migration from Vue.js

This site was migrated from a Vue.js PWA to Astro.js for:
- Better SEO with static HTML generation
- Improved performance with zero JavaScript by default
- Simplified deployment to GitHub Pages
- Maintained exact UI/UX from the original design

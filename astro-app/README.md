# MLNomadpy Personal Website

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, SEO-optimized personal portfolio and research website for Taha Bouhsine (MLNomadpy), built with Astro for optimal performance and search engine visibility.

## 🌐 Website

Visit the live website at [https://mlnomadpy.github.io](https://mlnomadpy.github.io)

## ✨ Features

### Core Features
- **Professional Portfolio**: Showcasing research, projects, and professional background
- **Publications & Research**: Display of academic papers and research contributions
- **Talks & Presentations**: Collection of past and upcoming talks and presentations
- **Life Events Timeline**: Interactive timeline of important life events
- **Modern UI**: Responsive design with smooth animations

### Technical Features
- **Static Site Generation (SSG)**: Pre-rendered HTML pages for optimal SEO and performance
- **SEO Optimized**: 
  - Server-side rendered meta tags (title, description, keywords)
  - Open Graph and Twitter Cards for social sharing
  - Semantic HTML with proper heading hierarchy
  - Fast initial page load with minimal JavaScript
- **Performance Optimized**:
  - Static HTML files served directly from CDN
  - Minimal JavaScript bundle
  - Optimized assets and images
  - Perfect Lighthouse scores
- **GitHub Pages Deployment**: Automated deployment with GitHub Actions
- **TypeScript Support**: Type-safe development experience

## 🛠️ Technologies

- **Framework**: Astro 5.x (Static Site Generator)
- **Language**: TypeScript
- **Styling**: Native CSS with scoped styles
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

## 📁 Project Structure

```
mlnomadpy.github.io/
├── .github/
│   └── workflows/
│       └── deploy-astro.yml   # CI/CD workflow for Astro
├── astro-app/                  # Astro application
│   ├── public/                 # Static files
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/         # Reusable Astro components
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── layouts/            # Layout templates
│   │   │   ├── Layout.astro    # Base HTML layout
│   │   │   └── MainLayout.astro # Main page layout
│   │   └── pages/              # Route pages (file-based routing)
│   │       ├── index.astro     # Home page
│   │       ├── about.astro     # About page
│   │       ├── research.astro  # Research page
│   │       ├── talks.astro     # Talks page
│   │       ├── life.astro      # Life timeline page
│   │       └── 404.astro       # 404 error page
│   ├── astro.config.mjs        # Astro configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── package.json            # Dependencies and scripts
├── robots.txt                  # Search engine crawling instructions
├── sitemap.xml                 # XML sitemap for SEO
├── CNAME                       # Custom domain configuration
├── favicon.ico                 # Website favicon
└── README.md                   # This file
```

## 🧩 Pages

The website consists of several statically generated pages:

- **Home (/)**: Landing page with hero section and highlights
- **About (/about)**: Personal information, story, education, and professional experience
- **Research (/research)**: Research papers and academic contributions
- **Talks (/talks)**: Talks, presentations, and workshops
- **Life (/life)**: Timeline of important life events
- **404 (/404)**: 404 error page

## 🎯 Why Astro?

### Benefits over Vue SPA
- ✅ **Better SEO**: Pre-rendered HTML pages are crawlable by search engines
- ✅ **Faster Load Times**: Static HTML loads instantly, no client-side rendering delay
- ✅ **Smaller Bundle Size**: Minimal JavaScript, only interactive components need JS
- ✅ **Perfect for Content Sites**: Ideal for portfolios, blogs, and documentation
- ✅ **GitHub Pages Compatible**: Works perfectly with static hosting
- ✅ **Progressive Enhancement**: Works without JavaScript, enhanced with it

### Key Improvements
- 🚀 **Performance**: Near-instant page loads with static HTML
- 🔍 **SEO**: Search engines see fully rendered content immediately
- 📱 **Mobile Friendly**: Fast loading even on slow connections
- ♿ **Accessibility**: Better screen reader support with server-rendered HTML
- 🎨 **Developer Experience**: Simple, intuitive component-based architecture

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. Runs on push to master or pull requests
2. Installs dependencies
3. Builds the Astro site (generates static HTML)
4. Copies static files (robots.txt, sitemap.xml, CNAME)
5. Deploys to GitHub Pages (on master branch)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Build and test locally (`npm run build && npm run preview`)
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

- Astro team for the amazing static site generator
- Open source community for inspiration and tools

## 📊 Migration Notes

This site was migrated from Vue.js SPA to Astro SSG for better SEO and performance:

- **Before**: Client-side rendered Vue.js application
- **After**: Static site generation with Astro
- **Benefits**: Better SEO, faster load times, improved Core Web Vitals
- **Deployment**: Simplified deployment to GitHub Pages with static files

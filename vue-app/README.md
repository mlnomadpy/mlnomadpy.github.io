# MLNomadpy Portfolio - Vue.js Application

This is the source code for Taha Bouhsine's personal portfolio website, built with Vue.js 3 and modern web development best practices.

## 🚀 Features

- **Modern Vue.js 3**: Built with Composition API for better code organization
- **Modular Architecture**: Reusable components and composables
- **SEO Optimized**: Enhanced meta tags, structured data, and semantic HTML
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance**: Lazy loading, code splitting, and optimized builds
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **Type Safety**: JSDoc comments for better IDE support
- **Unit Tests**: Comprehensive test coverage with Vitest
- **Code Quality**: ESLint and Prettier for consistent code style

## 📁 Project Structure

```
vue-app/
├── public/              # Static files
│   └── index.html       # HTML template with SEO meta tags
├── src/
│   ├── assets/          # Global CSS and assets
│   ├── components/      # Reusable Vue components
│   │   ├── HeaderComponent.vue
│   │   └── FooterComponent.vue
│   ├── composables/     # Vue composables for reusable logic
│   │   ├── useResponsive.js
│   │   ├── useIntersectionObserver.js
│   │   └── useMeta.js
│   ├── router/          # Vue Router configuration
│   │   └── index.js
│   ├── utils/           # Utility functions
│   │   └── helpers.js
│   ├── views/           # Page components
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   ├── ResearchView.vue
│   │   ├── TalksView.vue
│   │   ├── LifeView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── tests/
│   └── unit/            # Unit tests
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── vite.config.js       # Vite build configuration
├── vitest.config.js     # Vitest test configuration
└── package.json         # Dependencies and scripts
```

## 🛠️ Technologies

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Official routing library
- **Vite** - Next-generation frontend tooling
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🧪 Development

```bash
# Start development server
npm run dev

# The site will be available at http://localhost:5173/
```

## 🏗️ Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `../dist` folder (parent directory).

## ✅ Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎨 Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta tags for search engines
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: JSON-LD schema for rich snippets
- **Canonical URLs**: Prevent duplicate content
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Sitemap**: XML sitemap for search engine crawlers
- **Robots.txt**: Search engine crawling instructions

## ♿ Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Responsive Design**: Mobile-friendly and touch-optimized

## 🎯 Performance Optimizations

- **Lazy Loading**: Routes and components loaded on demand
- **Code Splitting**: Automatic vendor chunk separation
- **Asset Optimization**: Minified CSS and JavaScript
- **Tree Shaking**: Unused code elimination
- **Caching**: Optimized for browser caching

## 📝 Best Practices

- **Composition API**: Modern Vue.js patterns
- **Composables**: Reusable logic extraction
- **TypeScript-ready**: JSDoc for type hints
- **Error Handling**: Global and component-level error handling
- **Scroll Behavior**: Smooth scrolling and position restoration
- **Transitions**: Smooth page transitions

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see the LICENSE file for details

## 👤 Author

**Taha Bouhsine**
- GitHub: [@mlnomadpy](https://github.com/mlnomadpy)
- LinkedIn: [Taha Bouhsine](https://linkedin.com/in/Tahabsn)
- Website: [MLNomadpy](https://mlnomadpy.github.io)

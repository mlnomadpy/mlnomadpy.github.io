# Quick Start Guide

This guide helps you get started with the MLNomadpy Portfolio project quickly.

## 🚀 Getting Started (5 minutes)

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/mlnomadpy/mlnomadpy.github.io.git
cd mlnomadpy.github.io/vue-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` to see the site.

### 2. Make Changes

Edit files in `vue-app/src/`:
- `views/` - Page components
- `components/` - Reusable components
- `composables/` - Reusable logic
- `utils/` - Utility functions

Changes will hot-reload automatically.

### 3. Test Your Changes

```bash
# Run tests
npm test

# Run linter
npm run lint

# Build for production
npm run build
```

## 📁 Project Structure

```
mlnomadpy.github.io/
├── vue-app/              # Source code (work here)
│   ├── src/              # Vue.js application
│   │   ├── views/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── composables/  # Composition API logic
│   │   └── utils/        # Helper functions
│   ├── tests/            # Unit tests
│   └── public/           # Static files
├── docs/                 # Documentation
├── .github/workflows/    # CI/CD
└── dist/                 # Built files (auto-generated)
```

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # Check code quality
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
```

## 📝 Common Tasks

### Add a New Page

1. Create view in `src/views/NewView.vue`
2. Add route in `src/router/index.js`
3. Add navigation link in `src/components/HeaderComponent.vue`
4. Write tests in `tests/unit/NewView.spec.js`

### Add a New Component

1. Create component in `src/components/ComponentName.vue`
2. Import and use in your view
3. Write tests in `tests/unit/ComponentName.spec.js`

### Update SEO

1. Edit meta tags in `public/index.html`
2. Update `src/router/index.js` for page-specific meta
3. Update `sitemap.xml` in root directory

## 🐛 Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Tests failing
```bash
npm test -- --run
# Check error messages for details
```

### Build errors
```bash
npm run lint
npm test
# Fix any errors before building
npm run build
```

## 📚 Learn More

- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Project README](../README.md)
- [Contributing Guide](../CONTRIBUTING.md)

## 💡 Tips

- Use VSCode with Vue extension for best experience
- Run tests before committing (`npm test`)
- Check linting before committing (`npm run lint`)
- Keep components small and focused
- Write tests for new features
- Update documentation when adding features

## 🤝 Need Help?

- Check [CONTRIBUTING.md](../CONTRIBUTING.md)
- Review [docs/](../docs/) for detailed guides
- Create an issue on GitHub

---

Happy coding! 🎉

# Contributing to MLNomadpy Portfolio

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please be respectful and considerate in all interactions.

## 🐛 Reporting Bugs

If you find a bug, please create an issue with:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (browser, OS, Node version)

## 💡 Suggesting Features

Feature suggestions are welcome! Please create an issue with:

- A clear, descriptive title
- Detailed description of the proposed feature
- Use cases and benefits
- Any potential drawbacks or considerations

## 🔧 Development Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/mlnomadpy/mlnomadpy.github.io.git
   cd mlnomadpy.github.io
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set up development environment**
   ```bash
   cd vue-app
   npm install
   npm run dev
   ```

4. **Make your changes**
   - Follow the existing code style
   - Write meaningful commit messages
   - Add tests for new features
   - Update documentation as needed

5. **Test your changes**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Follow conventional commit format:
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation changes
   - `style:` code style changes (formatting, etc.)
   - `refactor:` code refactoring
   - `test:` adding or updating tests
   - `chore:` maintenance tasks

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all checks pass

## 📝 Coding Standards

### JavaScript/Vue.js

- Use ES6+ features
- Follow Vue.js style guide
- Use Composition API for new components
- Write JSDoc comments for functions
- Keep components focused and single-purpose

### CSS

- Use scoped styles in Vue components
- Follow BEM naming convention for classes
- Use CSS variables for theming
- Ensure responsive design

### Testing

- Write unit tests for new components
- Maintain test coverage above 80%
- Test edge cases and error conditions
- Use descriptive test names

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for functions
- Update inline comments for complex logic
- Keep documentation concise and clear

## 🎨 Component Guidelines

### Creating New Components

```vue
<template>
  <!-- Use semantic HTML -->
  <div class="component-name">
    <!-- Component content -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props definition
const props = defineProps({
  propName: {
    type: String,
    required: true,
    default: ''
  }
})

// Composables
// State
// Computed properties
// Methods
// Lifecycle hooks
</script>

<style scoped>
/* Scoped component styles */
.component-name {
  /* Styles */
}
</style>
```

### Composables

```javascript
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable description
 * @param {Object} options - Options object
 * @returns {Object} Composable state and methods
 */
export function useComposableName(options = {}) {
  // Implementation
  
  return {
    // Exposed state and methods
  }
}
```

## 🧪 Testing Guidelines

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '@/components/Component.vue'

describe('Component', () => {
  it('should render correctly', () => {
    const wrapper = mount(Component)
    expect(wrapper.exists()).toBe(true)
  })
  
  it('should handle user interaction', async () => {
    const wrapper = mount(Component)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('event')).toBeTruthy()
  })
})
```

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] PR description is clear and complete

## 🚀 Release Process

Releases are managed by project maintainers:

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to GitHub Pages

## 📞 Getting Help

If you need help:

- Check existing issues and discussions
- Read the documentation
- Create a new issue with your question

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to MLNomadpy Portfolio! 🎉

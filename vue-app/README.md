# MLNomadpy Personal Website

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A personal portfolio and research website for Taha Bouhsine (MLNomadpy), showcasing machine learning research, talks, publications, and professional experience.

## 🌐 Website

Visit the live website at [https://mlnomadpy.github.io](https://mlnomadpy.github.io)

## ✨ Features

- **Professional Portfolio**: Showcasing research, projects, and professional background
- **Publications & Research**: Display of academic papers and research contributions
- **Talks & Presentations**: Collection of past and upcoming talks and presentations
- **Life Events Timeline**: Interactive timeline of important life events
- **Interactive UI**: Modern, responsive design with smooth animations
- **SEO Optimized**: Enhanced metadata for better search engine visibility

## 🛠️ Technologies

- **Frontend Framework**: Vue.js 3
- **Routing**: Vue Router
- **Icons**: Font Awesome
- **CSS**: Custom CSS with responsive design
- **Deployment**: GitHub Pages

## 🚀 Setup & Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

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
   npm run serve
   ```

The site will be available at `http://localhost:8080/`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to be deployed.

## 📁 Project Structure

```
vue-app/
├── public/                  # Static files
│   ├── index.html           # Main HTML template
│   └── favicon.ico          # Website favicon
├── src/                     # Source files
│   ├── assets/              # Assets (images, global CSS)
│   ├── components/          # Vue components
│   ├── data/                # JSON data files
│   ├── router/              # Vue Router configuration
│   ├── views/               # Page components
│   ├── App.vue              # Root component
│   └── main.js              # Entry point
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🧩 Components

The website consists of several main views:

- **AboutMeView**: Personal information, story, education, and professional experience
- **ResearchView**: Research papers and academic contributions
- **TalksView**: Talks, presentations, and workshops
- **LifeView**: Timeline of important life events

## 🤝 Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Taha Bouhsine**
- GitHub: [@mlnomadpy](https://github.com/mlnomadpy)
- LinkedIn: [Taha Bouhsine](https://linkedin.com/in/Tahabsn)
- Website: [MLNomadpy](https://mlnomadpy.github.io)

# Research View - Modular Vue.js Component

This project demonstrates a modular approach to building Vue.js components. The Research view has been refactored into smaller, reusable components following Vue.js best practices.

## Component Structure

The Research section is organized as follows:

```
ResearchView.vue (main container)
├── SearchBar.vue
├── CategoryFilter.vue
├── ResearchStats.vue
├── ResearchCard.vue
└── NoResults.vue
```

### Component Responsibilities

1. **ResearchView.vue**
   - Main container component
   - Loads and manages research data
   - Handles filtering logic
   - Coordinates child components

2. **SearchBar.vue**
   - Provides search input functionality
   - Emits search query changes
   - Handles clear search action

3. **CategoryFilter.vue**
   - Displays available research categories
   - Manages category selection
   - Assigns appropriate icons to categories

4. **ResearchStats.vue**
   - Shows statistics about the research collection
   - Displays counts for total items, categories, and filtered results

5. **ResearchCard.vue**
   - Displays individual research items
   - Provides expandable details view
   - Handles accordion-like expansion/collapse

6. **NoResults.vue**
   - Displays when no matching research items are found
   - Provides a reset filters button

## Best Practices Applied

- **Single Responsibility Principle**: Each component has a clear, focused purpose
- **Prop-based Communication**: Components receive data through props
- **Event-based Communication**: Child components emit events to notify parent
- **Scoped CSS**: Styles are scoped to prevent leakage between components
- **Component Reusability**: Components are designed to be reusable
- **Computed Properties**: Complex calculations are handled through computed properties
- **Responsive Design**: All components adapt to different screen sizes

## Benefits of Modularization

- **Better maintainability**: Smaller, focused components are easier to understand and maintain
- **Improved testability**: Components can be tested in isolation
- **Enhanced reusability**: Components can be reused across the application
- **Reduced complexity**: Breaking down large components simplifies the codebase
- **Better performance**: Vue.js can optimize updates for smaller components
- **Easier collaboration**: Team members can work on different components simultaneously

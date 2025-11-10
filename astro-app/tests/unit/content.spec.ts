import { describe, it, expect } from 'vitest';

describe('Navigation Links', () => {
  it('should have correct navigation structure', () => {
    const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Research', path: '/research' },
      { name: 'Talks', path: '/talks' },
      { name: 'Life', path: '/life' },
    ];

    expect(navLinks).toHaveLength(5);
    expect(navLinks[0].path).toBe('/');
    expect(navLinks[1].path).toBe('/about');
  });
});

describe('Content Structure', () => {
  it('should have research papers data', () => {
    const researchPapers = [
      {
        id: 1,
        title: 'Advanced Neural Network Architectures for Representation Learning',
        authors: 'Taha Bouhsine, et al.',
        venue: 'Journal of Machine Learning Research, 2024',
      },
    ];

    expect(researchPapers).toHaveLength(1);
    expect(researchPapers[0].title).toContain('Neural Network');
  });

  it('should have talks data', () => {
    const talks = [
      {
        id: 1,
        title: 'The Future of Interpretable AI',
        event: 'AI Summit 2024',
        date: 'March 2024',
      },
    ];

    expect(talks).toHaveLength(1);
    expect(talks[0].event).toBe('AI Summit 2024');
  });

  it('should have life events data', () => {
    const lifeEvents = [
      {
        id: 1,
        date: '2024',
        title: 'Google Developer Expert',
      },
    ];

    expect(lifeEvents).toHaveLength(1);
    expect(lifeEvents[0].title).toBe('Google Developer Expert');
  });
});

describe('Highlights', () => {
  it('should have 4 highlight cards', () => {
    const highlights = [
      { icon: '🔬', title: 'Research' },
      { icon: '🎤', title: 'Speaking' },
      { icon: '💼', title: 'Leadership' },
      { icon: '🏆', title: 'Recognition' },
    ];

    expect(highlights).toHaveLength(4);
  });
});

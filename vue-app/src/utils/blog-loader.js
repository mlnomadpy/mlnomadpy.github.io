import MarkdownIt from 'markdown-it';
import katex from 'markdown-it-katex';
import matter from 'gray-matter';

// Initialize Markdown parser with KaTeX support
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

md.use(katex);

/**
 * Retrieves all blog posts sorted by date.
 * @returns {Promise<Array>} List of blog objects with metadata and excerpt.
 */
export async function getAllBlogs() {
    // Load all markdown files from the data/blogs directory
    // as: 'raw' gives us the file content string
    const modules = import.meta.glob('/src/data/blogs/*.md', { as: 'raw' });
    const blogs = [];

    for (const path in modules) {
        try {
            const content = await modules[path]();
            const { data, content: markdownContent } = matter(content);

            // Extract filename as ID (e.g., /path/to/my-blog.md -> my-blog)
            const id = path.split('/').pop().replace('.md', '');

            // Create a plain text excerpt if one isn't provided in frontmatter
            const excerpt = data.excerpt ||
                markdownContent
                    .replace(/[#*`]/g, '') // Remove basic markdown syntax
                    .split('\n')
                    .filter(line => line.trim().length > 0)
                    .slice(0, 3)
                    .join(' ')
                    .slice(0, 200) + '...';

            blogs.push({
                id,
                title: data.title || id.replace(/-/g, ' '), // Fallback title
                date: data.date || 'Recent',
                tags: data.tags || [],
                ...data,
                excerpt
            });
        } catch (e) {
            console.error(`Error loading blog at ${path}:`, e);
        }
    }

    // Sort by date (newest first)
    return blogs.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (isNaN(dateA) || isNaN(dateB)) return 0;
        return dateB - dateA;
    });
}

/**
 * Retrieves a single blog post by ID.
 * @param {string} id - The blog ID (filename without extension).
 * @returns {Promise<Object|null>} The blog object with rendered HTML content.
 */
export async function getBlogById(id) {
    try {
        const modules = import.meta.glob('/src/data/blogs/*.md', { as: 'raw' });
        const path = `/src/data/blogs/${id}.md`;

        if (!modules[path]) {
            console.error(`Blog not found: ${path}`);
            return null;
        }

        const content = await modules[path]();
        const { data, content: markdownContent } = matter(content);
        const html = md.render(markdownContent);

        return {
            id,
            title: data.title || id.replace(/-/g, ' '),
            date: data.date || 'Recent',
            tags: data.tags || [],
            ...data,
            html
        };
    } catch (e) {
        console.error(`Error loading blog ${id}:`, e);
        return null;
    }
}

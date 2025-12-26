/**
 * Composable for meta tags management (SEO)
 * @returns {Object} Methods to update meta tags
 */
export function useMeta() {
  const updateTitle = title => {
    document.title = title
  }

  const updateMeta = (name, content) => {
    let meta = document.querySelector(`meta[name="${name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = name
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  const updateOgMeta = (property, content) => {
    let meta = document.querySelector(`meta[property="${property}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  const setPageMeta = ({ title, description, keywords, ogTitle, ogDescription, ogImage }) => {
    if (title) updateTitle(title)
    if (description) updateMeta('description', description)
    if (keywords) updateMeta('keywords', keywords)
    if (ogTitle) updateOgMeta('og:title', ogTitle)
    if (ogDescription) updateOgMeta('og:description', ogDescription)
    if (ogImage) updateOgMeta('og:image', ogImage)
  }

  return {
    updateTitle,
    updateMeta,
    updateOgMeta,
    setPageMeta,
  }
}

// Utility functions for the application

/**
 * Combines class names conditionally
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

/**
 * Format price with currency
 * @param {number} price - Price to format
 * @param {string} currency - Currency symbol (default: '$')
 * @returns {string} Formatted price
 */
export function formatPrice(price, currency = '$') {
    return `${currency}${price.toLocaleString()}`;
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, length = 100) {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}

/**
 * Generate slug from text
 * @param {string} text - Text to convert to slug
 * @returns {string} Slug
 */
export function generateSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
/**
 * Get valid image source with fallback
 * @param {string} src - Potential image source
 * @param {string} fallback - Fallback URL (default: placeholder)
 * @returns {string} Balanced image source
 */
export function getOptimizedImage(src, fallback = "https://picsum.photos/1200/800?grayscale&blur=2") {
    if (!src) return fallback;

    // Handle object input (e.g., gallery items like {url: '...'})
    let cleanedSrc = typeof src === 'object' && src.url ? src.url : String(src);
    cleanedSrc = cleanedSrc.replace(/\\/g, '/');

    // If it's already an absolute URL (http/https), return it
    if (cleanedSrc.startsWith('http')) return cleanedSrc;

    // Remove leading slash for consistency
    if (cleanedSrc.startsWith('/')) {
        cleanedSrc = cleanedSrc.substring(1);
    }

    // Use URL constructor for robust origin derivation
    let backendUrl = 'http://localhost:8000';
    try {
        if (process.env.NEXT_PUBLIC_API_URL) {
            backendUrl = new URL(process.env.NEXT_PUBLIC_API_URL).origin;
        }
    } catch (e) {
        // Fallback to simple replacement if URL parsing fails
        backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
    }

    // 1. If it's in public images (e.g., 'images/categories/...')
    if (cleanedSrc.startsWith('images/')) {
        return `${backendUrl}/${cleanedSrc}`;
    }

    // 2. If it's already prefixed with storage/ or images/ (for categories)
    if (cleanedSrc.startsWith('storage/') || cleanedSrc.startsWith('images/')) {
        return `${backendUrl}/${cleanedSrc}`;
    }

    // 3. Fallback: assume it's a raw path that belongs in storage
    return `${backendUrl}/storage/${cleanedSrc}`;
}

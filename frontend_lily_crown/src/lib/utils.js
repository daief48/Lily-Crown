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
    if (!src || src === "") return fallback;

    // If it's already an absolute URL (http/https), return it
    if (src.startsWith('http')) return src;

    // Otherwise, prepend the backend storage URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';

    // Ensure we don't end up with storage/storage/
    const path = src.startsWith('/storage') ? src : `/storage/${src}`;

    return `${backendUrl}${path}`;
}

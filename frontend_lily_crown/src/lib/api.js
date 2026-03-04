const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const cache = new Map();

export async function fetchFromApi(endpoint, options = {}) {
    const cacheKey = `${endpoint}-${JSON.stringify(options)}`;

    // Only cache GET requests and if not explicitly disabled
    if ((!options.method || options.method === 'GET') && options.cache !== false) {
        if (cache.has(cacheKey)) {
            const cachedData = cache.get(cacheKey);
            if (Date.now() - cachedData.timestamp < (options.cacheTime || 300000)) { // 5 mins default
                return cachedData.data;
            }
            cache.delete(cacheKey);
        }
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            next: { revalidate: options.revalidate || 60 },
            ...options,
            headers: {
                'Accept': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${response.status}`);
        }

        const json = await response.json();
        const result = options.fullResponse ? json : (json.data !== undefined ? json.data : json);

        // Store in cache if applicable
        if ((!options.method || options.method === 'GET') && options.cache !== false) {
            cache.set(cacheKey, {
                data: result,
                timestamp: Date.now()
            });
        }

        return result;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

export const api = {
    getProducts: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return fetchFromApi(`products${queryString ? `?${queryString}` : ''}`);
    },
    searchProducts: (query) => fetchFromApi(`products?search=${query}`),
    getProduct: (id) => fetchFromApi(`products/${id}`),
    getBlogs: () => fetchFromApi('blogs'),
    getBlog: (slug) => fetchFromApi(`blogs/${slug}`),
    getHeroSlides: () => fetchFromApi('hero-slides'),
    getCategories: () => fetchFromApi('categories'),
    getLookbook: (page = 1, limit = 8) => fetchFromApi(`lookbook?page=${page}&per_page=${limit}`, { fullResponse: true }),
    getTestimonials: () => fetchFromApi('testimonials'),
    getSettings: () => fetchFromApi('settings'),
    getInstagramPosts: () => fetchFromApi('instagram-posts'),
    getFeatures: () => fetchFromApi('features'),
    getOrders: (token) => fetchFromApi('orders', {
        headers: token ? {
            'Authorization': `Bearer ${token}`
        } : {}
    }),
    updateProfile: (userData, token) => fetchFromApi('user/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(userData)
    }),
    subscribe: (email) => fetchFromApi('subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    }),
};

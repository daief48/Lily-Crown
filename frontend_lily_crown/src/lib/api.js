const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchFromApi(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            next: { revalidate: 60 }, // Default revalidation
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

        if (options.fullResponse) {
            return json;
        }

        // Some endpoints might not wrap in 'data' (like settings)
        return json.data !== undefined ? json.data : json;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

export const api = {
    getProducts: () => fetchFromApi('products'),
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

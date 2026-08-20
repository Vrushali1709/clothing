import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// 1. Request Interceptor: access_token ચકાસીને Header માં ઉમેરશે
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token'); // 👈 'token' ની જગ્યાએ 'access_token' કર્યું
    if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 2. Response Interceptor: 401 એરર આવે તો access_token ડિલીટ કરી દેશે
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token'); // 👈 'access_token' કર્યું
        }
        return Promise.reject(error);
    }
);

export const fetchProducts = () => API.get('products/');
export const fetchCategories = () => API.get('categories/');
export const fetchProductDetails = (id) => API.get(`products/${id}/`);

// Wishlist APIs
export const getWishlist = () => API.get('wishlist/');
export const addToWishlist = (productId) => API.post('wishlist/', { product: productId });
export const removeFromWishlist = (wishlistId) => API.delete(`wishlist/${wishlistId}/`);

export default API;
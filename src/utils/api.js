const DEFAULT_LOCAL_API_URL = 'http://localhost:5000';

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? DEFAULT_LOCAL_API_URL : '')
).replace(/\/$/, '');

export const hasApiBaseUrl = Boolean(API_BASE_URL);

export function apiUrl(path) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function apiFetch(path, options) {
  if (!hasApiBaseUrl) {
    return Promise.reject(new Error('API URL is not configured'));
  }

  return fetch(apiUrl(path), options);
}

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Requests to /api/... are forwarded to the Spring Boot server, so the browser
// never makes a cross-origin call and no CORS setup is needed on the API.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

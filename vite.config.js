import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173, // Ensure Vite uses the correct port
    strictPort: true, // Ensures Vite fails if the port is already in use
  },
});

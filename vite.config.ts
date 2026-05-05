import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at https://<user>.github.io/The-path-so-far/, so all
// asset URLs need to resolve under that subpath in production.
// The Vite dev server still serves at "/".
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/The-path-so-far/' : '/',
  plugins: [react()],
}))

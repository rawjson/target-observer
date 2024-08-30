import path from 'path'
import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        emptyOutDir: false,
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            formats: ['es'],
            name: 'UseInView'
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: {
                    React: 'react'
                }
            }
        }
    },
    plugins: [react(), dts()]
})

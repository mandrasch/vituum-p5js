import vituum from 'vituum'
import liquid from '@vituum/vite-plugin-liquid'

export default {
    build: {
        rollupOptions: {
            input: [
                './src/pages/**/*.html',
                './src/pages/**/*.liquid'
            ]
        }
    },
    plugins: [vituum(), liquid({
        root: './src'
    })]
}
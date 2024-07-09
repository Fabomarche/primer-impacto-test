import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import checker from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react({
            tsDecorators: true,
        }),
        checker({
            typescript: true,
        }),
        VitePWA({
            registerType: 'autoUpdate',
        }),
        babel({
            babelConfig: {
                babelrc: false,
                configFile: false,
                plugins: [['@babel/plugin-proposal-decorators', { loose: true, version: '2022-03' }]],
                exclude: path.resolve(__dirname, 'node_modules/'),
            },
            apply: 'build',
        }),
        nodePolyfills({
            protocolImports: true,
        }),
    ],
    server: {
        watch: {
            usePolling: true,
        },
        host: true, // needed for the Docker Container port mapping to work
        strictPort: true,
        port: 80, // you can replace this port with any port
    },
});

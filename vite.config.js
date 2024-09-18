import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 "" 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '');
    // vite 配置
    return {
        root: './', // 项目根目录（index.html 文件所在的位置）
        base: './', // 开发或生产环境服务的公共基础路径
        envDir: './config', // 用于加载 .env 文件的目录
        // 配置路径别名
        resolve: {
            alias: {
                '@': '/src'
            }
        },
        define: {
            __APP_ENV__: env.APP_ENV // 定义全局常量替换方式
        },
        server: {
            host: '0.0.0.0',
            port: 8081,
            open: true, // 自动打开浏览器
            hmr: true // 开启热更新
        },
        plugins: [
            vue(),
            VitePWA({
                injectRegister: 'auto',
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true // 是否支持开发模式下也使 pwa 生效
                },
                // MANIFEST PWA https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html
                includeAssets: ['logo.svg'],
                manifest: {
                    name: 'NA活码系统',
                    short_name: '活码系统',
                    theme_color: '#FFFFFF',
                    start_url: './',
                    display: 'fullscreen',
                    background_color: '#FFFFFF',
                    icons: [
                        {
                            src: 'qrcode2.svg',
                            sizes: '512x512',
                            type: 'image/svg+xml',
                            purpose: 'any'
                        },
                        {
                            src: 'qrcode2.svg',
                            sizes: '180x180',
                            type: 'image/png',
                            purpose: 'any'
                        }
                    ]
                }
            })
        ],
        // 打包时自动去除 console 和 debugger
        esbuild: {
            drop: env?.VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : []
        }
    };
});

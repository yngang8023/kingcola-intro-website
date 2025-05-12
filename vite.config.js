import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VueMcp } from 'vite-plugin-vue-mcp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    [VueMcp()],
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000, // 指定端口
    open: true, // 自动打开浏览器
    cors: true, // 允许跨域
    host: '0.0.0.0', // 允许局域网访问
    hmr: {
      overlay: false // 关闭热更新错误遮罩层
    },
    allowedHosts: [
      '5f8ee3ad.r35.cpolar.top' // 内网穿透 只写域名，不要加 https://
    ]
  },
  build: {
    outDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录
    minify: 'terser', // 使用terser压缩
    sourcemap: false, // 不生成sourcemap
    terserOptions: {
      compress: {
        drop_console: true, // 移除console
        drop_debugger: true // 移除debugger
      }
    },
    chunkSizeWarningLimit: 1500, // 块大小警告的限制（kb）
    
    // 添加CSS优化
    cssCodeSplit: true,
    cssMinify: true,
    
    // 改进性能的构建配置
    rollupOptions: {
      output: {
        // 优化chunk分割策略
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'element-plus': ['element-plus'],
          'three': ['three']
        },
        // 自定义chunk输出名称
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/.test(assetInfo.name)) {
            extType = 'img'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts'
          }
          return `assets/${extType}/[name]-[hash][extname]`
        }
      }
    }
  },
  
  // 性能优化配置
  optimizeDeps: {
    include: ['vue', 'vue-router', 'three', 'element-plus'],
    exclude: [] // 排除不需要预构建的依赖
  },
  
  // 添加浏览器兼容性配置
  esbuild: {
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1']
  }
})

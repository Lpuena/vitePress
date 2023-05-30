import Theme from 'vitepress/theme'
import './style/var.css'

// 图片放大/预览
import "viewerjs/dist/viewer.min.css";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import { useRoute } from "vitepress";

export default {
  ...Theme,
  enhanceApp({ app }) {
    // 注册全局组件，如果你不想使用也可以不添加
    app.component("vImageViewer", vImageViewer);
  },
  setup() {
    // 获取路由
    const route = useRoute();
    // 使用
    imageViewer(route);
  },
}
import DefaultTheme from 'vitepress/theme';
import './style/var.css'


// 图片放大/预览
import { useRoute } from "vitepress";
import { onMounted, watch, nextTick } from 'vue';
import mediumZoom from "medium-zoom"



export default {
  ...DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); 
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  }
}


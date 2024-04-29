import { ref, watch, onMounted, onUnmounted } from 'vue';

export interface UseWindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  /**
   * @default true
   */
  listenOrientation?: boolean

  /**
   * @default true
   */
  includeScrollbar?: boolean
};

export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const {
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    includeScrollbar = true,
  } = options;

  const width = ref(initialWidth);
  const height = ref(initialHeight);

  const update = () => {
    if (window) {
      if (includeScrollbar) {
        width.value = window.innerWidth
        height.value = window.innerHeight
      }
      else {
        width.value = window.document.documentElement.clientWidth
        height.value = window.document.documentElement.clientHeight
      }
    }
  }

  update();
  onMounted(update);
  useEventListener('resize', update, { passive: true });

  return { width, height };
};

export type UseWindowSizeReturn = ReturnType<typeof useWindowSize>;
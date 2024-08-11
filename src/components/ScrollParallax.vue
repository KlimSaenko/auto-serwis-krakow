<script setup lang="ts">
  import { ref, toRefs, onMounted, onUnmounted } from 'vue';

  const props = defineProps({ 
    speed: {
      type: Number,
      required: true,
      default: 0.15
    }
  });

  const { speed } = toRefs(props);
  const scrollOffset = ref(0);

  const handleScroll = () => {
    window.requestAnimationFrame(() => {
      scrollOffset.value = window.scrollY * speed.value;
    });
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<template>
  <div class="max-md:!bg-center bg-center will-change-[background-position]" :style="{ backgroundPositionY: `calc(50% + ${scrollOffset}px)` }">
    <slot>
    </slot>
  </div>
</template>
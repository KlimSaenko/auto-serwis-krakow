<script setup lang="ts">
  import { ref, toRefs } from 'vue';

  const props = defineProps({ 
    speed: {
      type: Number,
      required: true,
      default: 0.15
    }
  });

  const { speed } = toRefs(props);
  const scrollOffset = ref('0px');

  window.addEventListener('scroll', () => {
    scrollOffset.value = `${window.scrollY * speed.value}px`;
  });
</script>

<template>
  <div class="max-md:hidden" :style="{ translate: `0 ${scrollOffset}` }">
    <slot>
    </slot>
  </div>
  <div class="md:hidden">
    <slot >
    </slot>
  </div>
</template>
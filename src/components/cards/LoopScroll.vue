<script setup lang="ts">
    defineProps({ 
        imgSrcList: {
            type: Array<string>, 
            required: true
        },
        reversed: {
            type: Boolean, 
            required: false
        }
    });
</script>

<template>
    <div class="inline-flex my-3 h-[3.75rem] flex-nowrap w-full">
        <ul :style="`width: ${imgSrcList.length * 15}rem`" :class="reversed ? 'animate-loop-scroll-reverse' : 'animate-loop-scroll'" class="flex items-center justify-center absolute pl-10 space-x-10">
            <li v-for="imgSrc in imgSrcList">
                <img :src="imgSrc" alt="car logo" />
            </li>
            <li v-for="imgSrc in imgSrcList">
                <img :src="imgSrc" alt="car logo" />
            </li>
        </ul>
    </div>
</template>
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
    <div class="inline-flex my-3 h-12 flex-nowrap w-full">
        <ul :style="`width: ${imgSrcList.length * 12}rem`" class="flex items-center justify-center absolute pl-12 space-x-12 animate-loop-scroll">
            <li v-for="imgSrc in imgSrcList">
                <img :src="imgSrc" alt="car logo" />
            </li>
            <li v-for="imgSrc in imgSrcList">
                <img :src="imgSrc" alt="car logo" />
            </li>
        </ul>
    </div>
</template>
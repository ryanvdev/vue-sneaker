<script setup lang="ts">
import { className } from '@/utils/template_utils';

interface Props {
    class?: string;
}
const props = defineProps<Props>();
</script>

<template>
    <div :class="className(style['big-sneaker'], props.class)">
        <div :class="className('stack', style['wrap'])">
            <div class="d-flex justify-center align-center">
                <div :class="style['circle']"></div>
            </div>
            <div class="d-flex justify-center align-center">
                <div :class="style['image']" :style="{ '--image': `url('/img/home-sneaker.png')` }"></div>
            </div>
        </div>
    </div>
</template>

<style module="style" lang="scss">
.big-sneaker {
    display: block;
    overflow: hidden;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
}

.wrap {
    display: block;
    overflow: hidden;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
}

.circle {
    display: block;

    width: 40%;
    height: auto;
    aspect-ratio: 1;

    border-radius: 50%;

    background-color: rgba(var(--v-theme-primary), 0.9);
    box-shadow: 0px 0px 10px rgba(var(--v-theme-primary), 0.8), 0px 0px 20px rgba(var(--v-theme-primary), 0.7),
        0px 0px 30px rgba(var(--v-theme-primary), 0.6), 0px 0px 40px rgba(var(--v-theme-primary), 0.5);
}
.image {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80%;
    height: auto;
    aspect-ratio: 1;

    rotate: -18deg;

    background-image: var(--image);
    background-position: center;
    background-size: contain;
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppBar from '@/components/AppBar.vue';

</script>

<template>
    <div :class="style['page']">
        <app-bar :class="style['app-bar']" />
        <main :class="style['main']">
            <router-view/>
        </main>
        <footer>
            .................................
        </footer>
    </div>
</template>


<style module="style" lang="scss">
.page{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    width: 100vw;
    height: auto;
}

.app-bar{
    position: sticky;
    z-index: 10;
    top: 0px;
}
.main{
    display: block;

    width: 100%;
    height: auto;
}
</style>
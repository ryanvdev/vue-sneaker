<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { VBtn } from 'vuetify/components';


interface Props {
    class?: string;
    logo?: string;
    webName?: string;
    href?: string;
}


const props = withDefaults(defineProps<Props>(), {
    logo: '/img/logo.png',
    webName: 'WEB NAME',
    href: '/',
});

</script>

<template>
    <v-btn :class="props.class" :to="props.href" variant="text" stacked height="60px" >
        <div :class="style['wrapper']">
            <img :src="props.logo" :alt="props.webName"/>
            <span v-show="props.webName.length>0">{{ props.webName }}</span>
        </div>
    </v-btn>
</template>

<style module="style" lang="scss">
.wrapper{
    display: block;
    width: fit-content;
    height: 60px;

    >img{
        display: block;
        float: left;
    }
    >span{
        display: block;
        float: left;

        width: fit-content;
        height: 60px;
        
        line-height: 60px;
        font-weight: 700;
        font-size: 24px;
        color: rgb(var(--v-theme-white));
    }
}

</style>
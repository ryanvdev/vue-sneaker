<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { VBtn } from 'vuetify/components';


interface Props {
    class?: string;
    logo?: string;
    webName?: string;
    href?: string;
    displayWebName?:boolean;
}


const props = withDefaults(defineProps<Props>(), {
    logo: '/img/logo.png',
    webName: 'WEB NAME',
    href: '/',
});

</script>

<template>
    <v-btn 
        :class="`${style['btn']} ${props.class}`" 
        :to="props.href" 
        variant="text" 
        stacked 
        height="60px"
        color="rgb(var(--v-theme-tertiary))"
    >
        <div :class="style['wrapper']">
            <img :src="props.logo" :alt="props.webName"/>
            <span 
                v-show="Boolean(props.displayWebName)"
            >
                {{ props.webName }}
            </span>
        </div>
    </v-btn>
</template>

<style module="style" lang="scss">
.btn{
    > :global(.v-btn__overlay){
        background-color: transparent;
    }
}


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
        color: rgb(var(--v-theme-tertiary));
    }
}

</style>
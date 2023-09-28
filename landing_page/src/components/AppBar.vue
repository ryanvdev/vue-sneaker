<script setup lang="ts">
import { defineProps } from 'vue';
import {VContainer} from 'vuetify/components';

import { className } from '@/utils/template_utils';

import HeadLogo from './HeadLogo.vue';
import HeaderButtons from './HeaderButtons.vue';
import SearchField from './SearchField.vue';

interface Props {
    class?:string;
}

const props = defineProps<Props>();


</script>

<template>
    <header :class="className(style['header'],  props.class)">
        <v-container :class="style['wrapper']">
            <div :class="`stack ${style['stack']}`">
                <div>
                    <HeadLogo :class="style['logo']"/>
                    <HeaderButtons :class="style['buttons']"/>
                </div>
                <div>
                    <SearchField :class="style['search-field']"/>
                </div>
            </div>
        </v-container>
    </header>
</template>

<style module="style" lang="scss">
.header{
    display: block;

    width: 100vw;
    height: 80px;

    background-color: rgb(var(--v-theme-primary));
}

.wrapper{
    height: 100%;
    padding-top: 10px;
}

.stack {
    display: block;
    width: 100%;
    height: 60px;
}


.logo{
    position: relative;
    z-index: 1;
    float: left;
}

.search-field{
    position: relative;
    z-index: 1;

    width: 550px;

    margin-left: auto;
    margin-right: auto;
}

.buttons{
    position: relative;
    z-index: 1;
    float: right;
}


</style>
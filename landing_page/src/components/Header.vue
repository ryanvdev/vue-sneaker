<script setup lang="ts">
import {VContainer} from 'vuetify/components';

import HeadLogo from './HeadLogo.vue';
import HeaderButtons from './HeaderButtons.vue';
import SearchField from './SearchField.vue';


</script>

<template>
    <div :class="style['header']">
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
    </div>
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
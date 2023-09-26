<script setup lang="ts">
import HeadLogo from './HeadLogo.vue';
import HeaderButtons from './HeaderButtons.vue';
import SearchField from './SearchField.vue';


</script>

<template>
    <div :class="style['header']">
        <div :class="style['wrapper']">
            <div :class="`stack ${style['stack']}`">
                <div>
                    <HeadLogo :class="style['logo']"/>
                    <HeaderButtons :class="style['buttons']"/>
                </div>
                <div>
                    <SearchField :class="style['search-field']"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style module="style" lang="scss">
.header{
    display: block;

    width: 100vw;
    height: 80px;

    background-color: rgb(var(--v-theme-secondary));
}

.wrapper{
    display: block;

    width: var(--container-width);
    height: 100%;
    max-width: 100%;

    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
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
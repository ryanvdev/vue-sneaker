<script setup lang="ts">
import { ref, computed, defineProps, withDefaults } from 'vue';
import { RouterLink } from 'vue-router';


interface Props {
    id?:string;
    name?:string;
    class?:string;
    placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Type something...',
});

const inputValue = ref<string>('');
const isFocused = ref<boolean>(false);


// TODO: 
const suggestions = computed<[string, string, string][]>(() => {
    const items = inputValue.value.split(' ');
    if (items.length === 1 && items[0].length === 0) return [];

    return items.map((item, index) => {
        return [`${index}-${item}`, `#${item}`, item];
    });
});

</script>

<template>
    <div :class="`${style['search-field']} ${style[isFocused?'focus':'blur']} ${props.class||''}`">
        <div :class="style['cover-wrapper']">
            <div :class="style['cover']" v-show="isFocused" @mousedown="isFocused = false"></div>
        </div>
        <div :class="style['wrapper']">
            <div :class="style['input-wrapper']">
                <input 
                    type="text" 
                    autocomplete="off" 
                    :id="props.id"
                    :name="props.name"
                    :placeholder="props.placeholder"
                    v-model="inputValue"
                    @focus="isFocused=true"
                />
                <button v-ripple>Search</button>
            </div>
            <div :class="`${style['line-break']} ${isFocused&&style['display']}`"></div>
            <div :class="style['suggestion-wrapper']" v-show="isFocused">
                <div :class="style['suggestion-placeholder']" v-show="suggestions.length===0">
                    {{ props.placeholder }}
                </div>
                <ul :class="style['suggestion']">
                    <li v-for="[key, href, label] of suggestions" :key="key">
                        <router-link v-ripple :to="href">
                            {{ label }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style module="style" lang="scss">
.search-field {
    --height: 60px;
    --input-height: calc(var(--height) - 20px);

    display: block;
    position: relative;
    z-index: 0;

    width: 690px;
    height: var(--height);

    &.focus{
        z-index: 100;
    }
}

.cover-wrapper {
    display: block;
    position: relative;
    z-index: 0;

    width: 100%;
    height: 0px;
}

.cover {
    display: block;
    position: fixed;

    top: 0px;
    left: 0px;

    width: 100vw;
    height: 100vh;

    background-color: transparent;
}

.wrapper {
    display: block;
    position: relative;
    z-index: 1;

    width: 100%;
    height: auto;

    border-radius: 5px;

    background-color: rgb(var(--v-theme-tertiary));
}

.input-wrapper {
    display: block;

    width: 100%;
    height: calc(var(--height) - 2px);

    >input {
        display: block;
        float: left;

        width: calc(100% - 130px);
        height: var(--input-height);

        border: none;
        outline: none;

        margin-left: 10px;
        margin-top: 10px;

        color: rgb(var(--v-theme-dark));
        background-color: transparent;
    }

    >button {
        float: right;

        width: 100px;
        height: var(--input-height);

        border: none;
        border-radius: 5px;
        outline: none;

        margin-top: 10px;
        margin-right: 10px;

        font-size: 18px;
        font-weight: 600;
        color: rgb(var(--v-theme-tertiary));

        background-color: rgb(var(--v-theme-primary));
    }
}

.line-break {
    display: block;
    transition: width 0.2s;

    width: 0px;
    height: 2px;

    margin-left: auto;
    margin-right: auto;

    border-radius: 1px;
    background-color: rgb(var(--v-theme-primary));

    &.display {
        width: calc(100% - 20px);
    }
}

.suggestion-wrapper {
    display: block;
    overflow: hidden;

    width: 100%;
    height: auto;
}

.suggestion-placeholder{
    display: block;
    width: 100%;

    color: rgba(0,0,0,0.3);
    font-size: 0.8em;
    line-height: var(--input-height);
    padding-left: 10px;
}

.suggestion {
    display: block;
    overflow: hidden;

    width: 100%;
    height: auto;

    >li {
        display: block;
        width: 100%;
        height: var(--input-height);

        >a {
            display: block;

            width: 100%;
            height: 100%;

            padding-left: 10px;

            line-height: var(--input-height);
            color: rgba(0,30,30,0.8);

            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
        }
    }
}

.search-field.focus{
    .wrapper{
        background-color: rgb(var(--v-theme-white));
    }

    .input-wrapper {
        > button {
            color: rgb(var(--v-theme-white));
        };
    }
}
</style>
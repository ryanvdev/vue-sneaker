<script setup lang="ts">
import { useRootStore } from '@/stores/root_store';
import { className } from '@/utils/template_utils';
import { ref, computed, defineProps, withDefaults } from 'vue';

interface Props {
    id?: string;
    name?: string;
    class?: string;
    placeholder?: string;

    isFocused?: boolean;
}

const rootStore = useRootStore();

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Type something...',
});

const emit = defineEmits<{
    'update:isFocused': [e: boolean];
}>();

const inputValue = ref<string>('');
const isFocused = computed<boolean>({
    get: () => props.isFocused,
    set: (v) => {
        emit('update:isFocused', v);
    },
});

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
    <div
        :class="`${style['search-field']} ${style[isFocused ? 'focus' : 'blur']} ${
            props.class || ''
        }`"
    >
        <div :class="style['cover-wrapper']">
            <div :class="style['cover']" v-show="isFocused" @mousedown="isFocused = false"></div>
        </div>
        <div
            :class="
                className(style['wrapper'], 'rounded-lg', isFocused ? 'elevation-2' : 'elevation-0')
            "
        >
            <div :class="style['input-wrapper']">
                <input
                    type="text"
                    autocomplete="off"
                    :id="props.id"
                    :name="props.name"
                    :placeholder="props.placeholder"
                    v-model="inputValue"
                    @focus="isFocused = true"
                />
                <v-btn
                    icon="mdi:mdi-magnify"
                    variant="text"
                    rounded="lg"
                    color="surface"
                    density="default"
                    height="var(--input-height)"
                    :width="
                        rootStore.isMobile ? 'var(--input-height)' : 'calc(var(--input-height)*2)'
                    "
                    class="bg-secondary float-right"
                >
                    <template v-slot:default>
                        <v-icon />
                    </template>
                </v-btn>
            </div>
            <div :class="`${style['line-break']} ${isFocused && style['display']}`"></div>
            <div :class="style['suggestion-wrapper']" v-show="isFocused">
                <div :class="style['suggestion-placeholder']" v-show="suggestions.length === 0">
                    {{ props.placeholder }}
                </div>
                <v-list class="w-100" v-show="suggestions.length > 0">
                    <v-list-item v-for="[key, href, label] of suggestions" :key="key" :href="href">
                        <template v-slot:prepend>
                            <v-icon icon="mdi:mdi-magnify" />
                        </template>
                        <v-list-item-title>
                            {{ label }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
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

    &.focus {
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
    height: fit-content;

    border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));

    background-color: rgb(var(--v-theme-surface));
}

.input-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    width: 100%;
    height: calc(var(--height) - 2px);

    padding: 0px 10px;

    > input {
        display: block;
        float: left;

        width: 100%;
        height: var(--input-height);

        border: none;
        outline: none;

        background-color: transparent;
    }
}

:global(.is-mobile) .input-wrapper {
    > input {
        width: calc(100% - var(--input-height) - 30px);
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
    background-color: rgba(var(--v-theme-secondary), 0.8);

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

.suggestion-placeholder {
    display: block;
    width: 100%;

    font-size: 0.8em;
    line-height: var(--input-height);
    padding-left: 10px;
}
</style>

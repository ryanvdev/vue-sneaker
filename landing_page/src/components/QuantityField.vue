<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect, onMounted, withDefaults } from 'vue';

interface Props {
    modelValue: number;
    class?: string;
    min?: number;
}

const inputRef = ref<HTMLInputElement | null>(null);
const props = withDefaults(defineProps<Props>(), {
    min: 1,
});

const emit = defineEmits<{
    'update:modelValue': [e: number];
}>();

const updateInputValue = () => {
    if (!inputRef || !inputRef.value) return;
    inputRef.value.value = props.modelValue.toString();
};

const handleSubmit = () => {
    if (!inputRef || !inputRef.value) return;
    const inputValue = inputRef.value.value.trim();

    inputRef.value.blur();

    // case: Input empty
    if (inputValue.length === 0) {
        updateInputValue();
        return;
    }

    const v = parseInt(inputValue);
    if (!isFinite(v) || !Number.isInteger(v) || v < props.min) {
        if (props.modelValue === props.min) {
            updateInputValue();
        } else {
            emit('update:modelValue', props.min);
        }
        return;
    }

    emit('update:modelValue', v);
};

const handleBtnClick = (increase: number) => {
    const v = props.modelValue + increase;
    if (v < props.min) {
        if (props.modelValue === props.min) {
            updateInputValue();
        } else {
            emit('update:modelValue', props.min);
        }
        return;
    }
    emit('update:modelValue', v);
};

watchEffect(() => {
    if (!inputRef || !inputRef.value) return;
    inputRef.value.value = props.modelValue.toString();
});

onMounted(() => {
    updateInputValue();
});
</script>

<template>
    <form @submit.prepend="handleSubmit">
        <v-btn-group variant="outlined">
            <v-btn
                icon="mdi-minus"
                value="decrease"
                @click="handleBtnClick(-1)"
                :disabled="props.modelValue <= props.min"
            />
            <input
                :class="`${styles['text-field']} text-center disable-spin-button ${props.class}`"
                ref="inputRef"
                type="number"
                autocomplete="off"
                :placeholder="props.modelValue.toString()"
                @blur="handleSubmit"
            />
            <v-btn icon="mdi-plus" value="increase" @click="handleBtnClick(1)" />
        </v-btn-group>
        <button type="submit" style="display: none"></button>
    </form>
</template>

<style module="styles" lang="scss">
.text-field {
    outline: none;
    border: thin solid;
    border-color: inherit;
    width: 70px;
}
</style>

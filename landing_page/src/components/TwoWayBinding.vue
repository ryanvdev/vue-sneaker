<script setup lang="ts">
interface Props{
    color1:string;
    color2:string;
    class?:string;
}

const props = defineProps<Props>();
defineOptions({
    inheritAttrs: false,
});

defineEmits<{
    'update:color1': [color:string],
    'update:color2': [value:string],
    'click': [],
}>();

</script>


<template>
    <div :class="props.class||'undefined'">
        <button @click="$emit('update:color1', 'blue')">
            Click 1 {{ color1 }}
        </button>
        <button @click="$emit('update:color2', 'blue')">
            Click 2 {{ color2 }}
        </button>
        <button @click="$emit('click')">
            Click me
        </button>
    </div>
</template>
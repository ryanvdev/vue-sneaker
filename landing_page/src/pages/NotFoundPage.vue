<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const params = Object.entries(route.params);
</script>

<template>
    <h1>Page not found</h1>
    <h2>Name - {{ route.name }}</h2>

    <section>
        <table>
            <tr v-for="param of params">
                <th>
                    {{ param[0] }}
                </th>
                <td>
                    {{ param[1] }}
                </td>
            </tr>
        </table>
    </section>
</template>

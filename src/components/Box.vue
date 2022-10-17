<template>
    <div class="box has-text-weight-bold tarefa-definida">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'BoxTarefa',
})
</script>

<style scoped>
.tarefa-definida{
    background-color: #fad6ca;
}
</style>
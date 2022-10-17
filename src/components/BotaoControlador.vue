<template>
    <button class="button" :disabled="habilitarBotao" @click="clicado">
        <span class="icon">
            <i :class="icone"></i>
        </span>
        <span>{{ texto }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'BotaoControlador',
    emits: ['clicado'],
    props :{
        texto : {
            type: String,
            default: '',
        },
        habilitarBotao: {
            type: Boolean
        },
        icone: {
            type: String
        }
    },
    methods: {
        clicado(): void{
            this.$emit('clicado')
        }
    }
})
</script>
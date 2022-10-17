<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo principal">
        </h1>
        <button class="button" @click="mudarTema()">
            Mudar para {{ textoBotao }}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BarraLateral',
    data(){
        return{
            temaEscuro: false,
        }
    },
    computed:{
        textoBotao(){
            if(this.temaEscuro){
                return 'Claro'
            }
            return 'Escuro'
        }
    },
    emits: ['aoMudarTema'],
    methods: {
        mudarTema(){
            this.temaEscuro = !this.temaEscuro;
            console.log(this.temaEscuro)
            this.$emit('aoMudarTema', this.temaEscuro);
        }
    },
})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100%;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

</style>
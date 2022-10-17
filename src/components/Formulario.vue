<template>
    <div class="box pesquisa-area">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input
                    type="text"
                    class="input input-tarefa"
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                />
            </div>
            <div class="column">
                <Temporizador @temporizadorFinalizado="finalizarTemporizador" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Temporizador from './Temporizador.vue'

export default defineComponent({
    name: 'FormularioTarefa',
    data() {
        return {
            descricao: ''
        }
    },
    emits: ['salvarNovaTarefa'],
    components: {
        Temporizador
    },
    methods: {
        finalizarTemporizador(tempoEmSegundos: number) {
            this.$emit('salvarNovaTarefa', {
                TempoEmSegundos: tempoEmSegundos,
                descricao: this.descricao
            });
            this.descricao = ''
        }
    }
})
</script>


<style scoped>
.display{
    color: var(--tx-color-primario);
}
</style>
<style >
.pesquisa-area{
    background-color: var(--bg-color-primario);
    color: var(--tx-color-primario);
}
</style>

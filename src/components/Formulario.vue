<template>
    <div class="box pesquisa-area">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input
                    type="text"
                    class="input input-tarefa"
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                />
            </div>

            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="column">
                <Temporizador @temporizadorFinalizado="finalizarTemporizador" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Temporizador from './Temporizador.vue'
import { useStore } from 'vuex'

import { key } from '@/store'


export default defineComponent({
    name: 'FormularioTarefa',
    data() {
        return {
            descricao: '',
            idProjeto: ''
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
                descricao: this.descricao,
                projeto: this.projetos.find(p => p.id == this.idProjeto)
            });
            this.descricao = ''
        }
    },
    setup() {
        const store = useStore(key);

        return {
            projetos: computed(() => store.state.projeto.projetos)
        }
    }

})
</script>


<style scoped>
.display {
    color: var(--tx-color-primario);
}
</style>
<style >
.pesquisa-area {
    background-color: var(--bg-color-primario);
    color: var(--tx-color-primario);
}
</style>

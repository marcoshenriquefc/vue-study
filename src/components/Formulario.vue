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
import { defineComponent, computed, ref } from 'vue'
import Temporizador from './Temporizador.vue'
import { useStore } from 'vuex'

import { key } from '@/store'


export default defineComponent({
    name: 'FormularioTarefa',
    emits: ['salvarNovaTarefa'],
    components: {
        Temporizador
    },
    setup(props, { emit }) {
        const store = useStore(key);
        const descricao =  ref('');
        const idProjeto =  ref('');
        
        const projetos = computed(() => store.state.projeto.projetos)

        const finalizarTemporizador = (tempoEmSegundos: number) => {
            emit('salvarNovaTarefa', {
                TempoEmSegundos: tempoEmSegundos,
                descricao: descricao.value,
                projeto: projetos.value.find(p => p.id == idProjeto.value)
            });
            descricao.value = ''
        }


        return {
            descricao,
            idProjeto,
            projetos,
            finalizarTemporizador
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

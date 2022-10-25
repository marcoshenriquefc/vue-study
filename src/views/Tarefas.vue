<template>
    <FormularioTarefa @salvar-nova-tarefa="salvarTarefas" />
    <div class="lista-tarefa">
        <TarefaDefinida v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @tarefa-selecionada="tarefaClicada"/>

        <BoxTarefa v-if="listaEstaVazia">
            <p>
                Você ainda não possui nenhuma tarefa!
            </p>
        </BoxTarefa>
    </div>


    <div class="modal" :class="{'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Modal title</p>
                <button @click="fecharModal" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <input
                    type="text"
                    class="input input-tarefa"
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="tarefaSelecionada.descricao"
                />
            </section>
            <footer class="modal-card-foot">
                <button @click="alterarTarefa" class="button is-success">Save changes</button>
                <button @click="fecharModal" class="button">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Componentes
import FormularioTarefa from '../components/Formulario.vue'
import TarefaDefinida from '../components/Tarefa.vue'
import BoxTarefa from '../components/Box.vue'

import useStore from '@/store'

//Interfaces
import ITarefas from '../interfaces/ITarefas.js'
import { computed } from '@vue/reactivity';
import { CADASTRAR_TAREFA, EDITAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acao';

export default defineComponent({
    name: 'BaseTarefa',
    components: {
        FormularioTarefa,
        TarefaDefinida,
        BoxTarefa
    },
    data(){
        return{
            tarefaSelecionada: null as ITarefas | null
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length <= 0;
        }
    },
    methods: {
        salvarTarefas(tarefa: ITarefas): void {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        tarefaClicada(tarefa: ITarefas){
            this.tarefaSelecionada = tarefa
        },
        fecharModal(){
            this.tarefaSelecionada = null;
        },
        alterarTarefa(){
            this.store.dispatch(EDITAR_TAREFA, this.tarefaSelecionada)
        }
    },
    setup() {
        const store = useStore();

        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        return {
            store,
            tarefas: computed(() => store.state.tarefas),
        }
    }
});
</script>

<style scoped>
.lista-tarefa {
    padding: 1.25rem;
}
</style>

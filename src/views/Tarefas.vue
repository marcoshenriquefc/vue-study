<template>
    <FormularioTarefa @salvar-nova-tarefa="salvarTarefas" />
    <div class="lista-tarefa">
        <TarefaDefinida v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />

        <BoxTarefa v-if="listaEstaVazia">
            <p>
                Você ainda não possui nenhuma tarefa!
            </p>
        </BoxTarefa>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Componentes
import FormularioTarefa from '../components/Formulario.vue'
import TarefaDefinida from '../components/Tarefa.vue'
import BoxTarefa from '../components/Box.vue'

//Interfaces
import ITarefas from '../interfaces/ITarefas.js'
import useStore from '@/store';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacao'
import { computed } from '@vue/reactivity';

export default defineComponent({
    name: 'BaseTarefa',
    components: {
        FormularioTarefa,
        TarefaDefinida,
        BoxTarefa
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length <= 0;
        }
    },
    methods: {
        salvarTarefas(tarefa: ITarefas): void {
            // this.tarefas.push(tarefa);
            this.store.commit(ADICIONA_TAREFA, tarefa)
        },
    },
    setup() {
        const store = useStore()
        // const tarefas = computed( () => store.state.tarefas)
        return {
            store,
            tarefas: computed( () => store.state.tarefas)
        }
    }
});
</script>

<style scoped>
.lista-tarefa {
    padding: 1.25rem;
}
</style>

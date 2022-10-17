<template>
    <BoxTarefa>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao }}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.TempoEmSegundos" />
            </div>
        </div>
    </BoxTarefa>
</template>

<script lang="ts">
import ITarefas from '@/inferfaces/ITarefas';
import { defineComponent, PropType } from 'vue'
import Cronometro from './Cronometro.vue'
import BoxTarefa from './Box.vue';

export default defineComponent({
    name: "TarefaDefinida",
    components: {
        Cronometro,
        BoxTarefa
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefas>,
            required: true
        }
    }
})
</script>

<style scoped>
.tarefa-definida{
    background-color: #cafadc;
}
</style>
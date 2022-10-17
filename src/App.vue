<template>
  <main class="columns is-gapless is-multiline base-area" :class="{'modo-escuro': modoEscuro}">
    <div class="column is-one-quarter">
      <barraLateral @ao-mudar-tema="mudarTema"/>
    </div>
    <div class="is-three-quarters fundo-formulario">
      <FormularioTarefa @salvar-nova-tarefa="salvarTarefas" />
      <div class="lista-tarefa">
        <TarefaDefinida
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :tarefa="tarefa"
        />

          <BoxTarefa v-if="listaEstaVazia">
            <p>
              Você ainda não possui nenhuma tarefa!
            </p>
          </BoxTarefa>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Componentes
import BarraLateral from './components/Barra-lateral.vue'
import FormularioTarefa from './components/Formulario.vue'
import TarefaDefinida from './components/Tarefa.vue'
import BoxTarefa from './components/Box.vue'

//Interfaces
import ITarefas from './inferfaces/ITarefas.js'

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioTarefa,
    TarefaDefinida,
    BoxTarefa
  },
  data() {
    return {
      tarefas: [] as ITarefas[],
      modoEscuro: false
    }
  },
  computed: {
    listaEstaVazia(): boolean{
      return this.tarefas.length <= 0;
    }
  },
  methods: {
    salvarTarefas(tarefa: ITarefas): void {
      this.tarefas.push(tarefa);
    },
    mudarTema(modoEscuro: boolean){
      this.modoEscuro = modoEscuro;
    }
  }
});
</script>



<style scoped>
.base-area {
  min-height: 100vh;
}

.is-three-quarters {
  min-width: 75%;
}

.lista-tarefa {
  padding: 1.25rem;
}
</style>


<style>
main{
  --bg-color-primario: #F8F8F8;
  --tx-color-primario: #333;
}

main.modo-escuro{
  --bg-color-primario: #1f1f1f;
  --tx-color-primario: #F8F8F8;
}

.fundo-formulario{
  background-color: var(--bg-color-primario);
  color: var(--tx-color-primario);
}

</style>
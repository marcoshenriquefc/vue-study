<template>
  <main class="columns is-gapless is-multiline base-area" :class="{'modo-escuro': modoEscuro}">
    <div class="column is-one-quarter">
      <barraLateral @ao-mudar-tema="mudarTema"/>
    </div>
    <div class="is-three-quarters fundo-formulario">
      <!-- <RouterView></RouterView> -->
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Componentes
import BarraLateral from './components/Barra-lateral.vue'

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
  },
  data() {
    return {
      modoEscuro: false
    }
  },
  methods: {
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
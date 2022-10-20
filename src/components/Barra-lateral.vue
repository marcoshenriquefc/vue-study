<template>
    <header>
        <div class="has-text-centered">
        <h1>
            <img src="../assets/logo.png" alt="Logo principal">
        </h1>
            <button class="button" @click="mudarTema()">
                Mudar para {{ textoBotao }}
            </button>
        </div>
        <nav class="panel mt-5">
            <ul>
                <RouterLink to="/" class="link">
                    <li>
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </li>
                </RouterLink>
                <RouterLink to="/projetos" class="link">
                    <li>
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </li>
                </RouterLink>
            </ul>
        </nav>
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
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}

</style>
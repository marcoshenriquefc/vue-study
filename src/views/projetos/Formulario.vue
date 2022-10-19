<template>
    <section class="projetos">
        <h1 class="title"> Projetos </h1>
        <form @submit.prevent="salvar()">
            <input
                type="text"
                class="input"
                v-model="nomeDoProjeto"
            />
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import useStore from '@/store';
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'FormularioProjetoView',
    data(){
        return{
            nomeDoProjeto: '',
        }
    },
    methods: {
        salvar(): void{
            if(this.idProjeto){
                this.store.commit('EDITA_PROJETO', {
                    id:this.idProjeto,
                    nome: this.nomeDoProjeto || 'Nome não definido'
                })
            }
            else{
                this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto || 'Nome não definido');
            }

            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
        }
    },
    props: {
        idProjeto: {
            type: String
        }
    },
    mounted() {
        if(this.idProjeto){
            const projeto = this.store.state.projetos.find(proj => {
                return proj.id == this.idProjeto;
            })

            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    setup(){
        const store = useStore();

        return {
            store,
        }
    }
})
</script>

<style scoped>
.projetos{
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
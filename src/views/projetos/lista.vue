<template>
    <router-link to="/projetos/novo" class="button botao">
        <span class="icon is-small">
            <i class="fas fa-plus"></i>
        </span>
        <span>Novo projeto</span>
    </router-link>

    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="projeto in projetos" :key="projeto.id">
                <td>{{ projeto.id }}</td>
                <td>{{ projeto.nome }}</td>
                <td>
                    <router-link :to="`/projetos/${projeto.id}`" class="button botao">
                        <span class="icon is-small">
                            <i class="fas fa-pencil-alt">Edit</i>
                        </span>
                    </router-link>
                    <button class="button ml-2 is-danger" @click="excluirProjeto(projeto.id)">
                        <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                            Del
                        </span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import useStore, { store } from '@/store';
import { EXCLUIR_PROJETO } from '@/store/tipo-mutacao';
import { defineComponent, computed } from 'vue';


export default defineComponent({
    name: 'ListaProjetos',
    methods: {
        excluirProjeto(idProjeto: string) {
            store.commit(EXCLUIR_PROJETO ,idProjeto);
        }
    },
    setup() {
        const store = useStore();
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style scoped>
.botao {
    width: fit-content;
}
</style>
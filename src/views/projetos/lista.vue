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
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                    </router-link>
                    <button class="button ml-2 is-danger" @click="excluirProjeto(projeto.id)">
                        <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import useStore, { store } from '@/store';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acao';
import { EXCLUIR_PROJETO } from '@/store/tipo-mutacao';
import { defineComponent, computed } from 'vue';
import useNotificador from '@/hooks/notificador'
import { TipoDeNotificacao } from '@/interfaces/INotificacao';


export default defineComponent({
    name: 'ListaProjetos',
    methods: {
        excluirProjeto(idProjeto: string) {
            store.dispatch(REMOVER_PROJETO, idProjeto)
                .then(() => store.commit(EXCLUIR_PROJETO, idProjeto))
                .catch(() => {
                    this.notificar(
                        TipoDeNotificacao.FALHA,
                        'Falha',
                        'Falha ao deletar o projeto'
                    )
                })
        }
    },
    setup() {
        const store = useStore();
        const { notificar } = useNotificador();

        store.dispatch(OBTER_PROJETOS);
        return {
            store,
            projetos: computed(() => store.state.projetos),
            notificar
        }
    }
})
</script>

<style scoped>
.botao {
    width: fit-content;
}
</style>
<template>
    <form @submit.prevent="salvar()">
        <h2 class="title is-5">Cadastrar novo projeto</h2>
        <input type="text" class="input" v-model="nomeDoProjeto" />
        <div class="field">
            <button class="button" type="submit">Salvar</button>
        </div>
    </form>
</template>

<script lang="ts">
import useStore from '@/store';
import { defineComponent } from 'vue';
import { ADICIONA_PROJETO, EDITA_PROJETO, NOTIFICAR } from '@/store/tipo-mutacao'
import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import { notificacaoMixin } from '@/mixins/notificar'

export default defineComponent({
    name: 'FormularioProjetoView',
    mounted() {
        if (this.idProjeto) {
            const projeto = this.store.state.projetos.find(proj => {
                return proj.id == this.idProjeto;
            })

            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    mixins: [ notificacaoMixin ],
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    methods: {
        salvar(): void {
            if (this.idProjeto) {
                this.store.commit(EDITA_PROJETO, {
                    id: this.idProjeto,
                    nome: this.nomeDoProjeto || 'Nome não definido'
                })
            }
            else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto || 'Nome não definido');
            }

            this.notificar( TipoDeNotificacao.SUCESSO, 'Falha', 'Cadastrado com sucesso');
            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
        },
        
    },
    props: {
        idProjeto: {
            type: String
        }
    },
    setup() {
        const store = useStore();

        return {
            store,
        }
    }
})
</script>

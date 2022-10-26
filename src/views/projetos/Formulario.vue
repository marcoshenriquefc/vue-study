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
import { TipoDeNotificacao } from '@/interfaces/INotificacao';

import useNotificador from '@/hooks/notificador'
import { CADASTRAR_PROJETO, EDITAR_PROJETO } from '@/store/tipo-acao';

export default defineComponent({
    name: 'FormularioProjetoView',
    mounted() {
        if (this.idProjeto) {
            const projeto = this.store.state.projeto.projetos.find(proj => {
                return proj.id == this.idProjeto;
            })

            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    // mixins: [ notificacaoMixin ],
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    methods: {
        salvar(): void {
            if (this.idProjeto) {
                this.store.dispatch(EDITAR_PROJETO,
                    {
                        id: this.idProjeto,
                        nome: this.nomeDoProjeto || 'Nome não definido'
                    }
                )
                .then(()=> this.cadastroSucesso())
                    .catch(err =>{
                        this.notificar(
                            TipoDeNotificacao.FALHA,
                            'Falha',
                            'Erro ao editar o projeto :('
                        );
                        console.log(err)
                    });
            }
            else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto || 'Nome não definido')
                    .then(()=> this.cadastroSucesso())
                    .catch(err =>{
                        this.notificar(
                            TipoDeNotificacao.FALHA,
                            'Falha',
                            'Erro ao cadastrar o projeto :('
                        );
                        console.log(err)
                    });
            }

        },
        cadastroSucesso(){
            this.notificar(
                TipoDeNotificacao.SUCESSO,
                'Sucesso',
                'Cadastrado com sucesso ;)'
            );
            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
        }
        
    },
    props: {
        idProjeto: {
            type: String
        }
    },
    setup() {
        const store = useStore();

        const { notificar } = useNotificador();
        return {
            store,
            notificar
        }
    }
})
</script>

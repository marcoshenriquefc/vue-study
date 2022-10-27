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
import { defineComponent, ref } from 'vue';
import { TipoDeNotificacao } from '@/interfaces/INotificacao';

import useNotificador from '@/hooks/notificador'
import { CADASTRAR_PROJETO, EDITAR_PROJETO } from '@/store/tipo-acao';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'FormularioProjetoView',
    // mixins: [ notificacaoMixin ],
    props: {
        idProjeto: {
            type: String
        }
    },
    setup(props) {
        const store = useStore();
        const { notificar } = useNotificador();
        const nomeDoProjeto = ref('');
        const router = useRouter();


        if (props.idProjeto) {
            const projeto = store.state.projeto.projetos.find(proj => {
                return proj.id == props.idProjeto;
            })

            nomeDoProjeto.value = projeto?.nome || '';
        }
        

        //METODOS
        const salvar = (): void => {
            if (props.idProjeto) {
                store.dispatch(EDITAR_PROJETO,
                    {
                        id: props.idProjeto,
                        nome: nomeDoProjeto.value || 'Nome não definido'
                    }
                )
                .then(() => cadastroSucesso())
                    .catch(err =>{
                        notificar(
                            TipoDeNotificacao.FALHA,
                            'Falha',
                            'Erro ao editar o projeto :('
                        );
                        console.log(err)
                    });
            }
            else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value || 'Nome não definido')
                    .then(()=> cadastroSucesso())
                    .catch(err =>{
                        notificar(
                            TipoDeNotificacao.FALHA,
                            'Falha',
                            'Erro ao cadastrar o projeto :('
                        );
                        console.log(err)
                    });
            }
        }


        const cadastroSucesso = ():void  => {
            notificar(
                TipoDeNotificacao.SUCESSO,
                'Sucesso',
                'Cadastrado com sucesso ;)'
            );
            nomeDoProjeto.value = '';
            router.push('/projetos');
        }



        return {
            store,
            notificar,
            nomeDoProjeto,
            salvar
        }
    }
})
</script>

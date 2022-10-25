import {createStore, Store, useStore as vuexUseStore} from 'vuex'
import { InjectionKey } from 'vue'

import { ADICIONA_PROJETO, EDITA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR, ADICIONA_TAREFA } from './tipo-mutacao'

import { INotificacao, TipoDeNotificacao } from "@/interfaces/INotificacao";
import IProjetos from "@/interfaces/IProjetos";
import ITarefas from "@/interfaces/ITarefas";

interface Estado{
    projetos: IProjetos[],
    notificacoes: INotificacao[],
    tarefas: ITarefas[]
}

export const key: InjectionKey<Store<Estado>> = Symbol(); 

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [],
        tarefas: [],
    },
    mutations: {

        // MUTATIONS PARA ADICIONAR PROJETO
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjetos

            state.projetos.push(projeto)
        },
        [EDITA_PROJETO](state, projeto: IProjetos){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);

            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, idProjeto: string){
            state.projetos = state.projetos.filter((proj) => {
                return proj.id != idProjeto
            });
        },

        //MUTATIONS PARA ADICIONAR TAREFAS
        [ADICIONA_TAREFA](state, tarefa: ITarefas): void {
            state.tarefas.push(tarefa)
        },

        // MUTATIONS PARA NOTIFICAR
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() =>{
                state.notificacoes = state.notificacoes.filter( notificacao =>{
                    notificacao.id != novaNotificacao.id
                })
            }, 3000)
        }
    }
})

export default function useStore(): Store<Estado>{
    return vuexUseStore(key);
}
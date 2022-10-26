import {createStore, Store, useStore as vuexUseStore} from 'vuex'
import { InjectionKey } from 'vue'
import { NOTIFICAR, DEFINIR_TAREFAS, ADICIONAR_TAREFA, EDITA_TAREFA } from './tipo-mutacao'
import { INotificacao } from "@/interfaces/INotificacao";
import { CADASTRAR_TAREFA, EDITAR_TAREFA, OBTER_TAREFAS } from "./tipo-acao";

import http from '@/http'
import ITarefas from "@/interfaces/ITarefas";
import { EstadoProjeto, projeto } from './modulos/projetos'

export interface Estado{
    notificacoes: INotificacao[],
    tarefas: ITarefas[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol(); 

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        tarefas: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        // TAREFAS
        [DEFINIR_TAREFAS](state, tarefas: ITarefas[]){
            state.tarefas = tarefas
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefas){
            state.tarefas.push(tarefa);
        },
        [EDITA_TAREFA](state, tarefa: ITarefas){
            const index = state.tarefas.findIndex(t => t.id == tarefa.id);

            state.tarefas[index] = tarefa;
        },

        // NOTIFICAÇÃO
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() =>{
                state.notificacoes = state.notificacoes.filter( notificacao =>{
                    notificacao.id != novaNotificacao.id
                })
            }, 3000)
        }
    },


    actions:{
        // TAREFAS
        [OBTER_TAREFAS]({ commit }){
            http.get('tarefas')
                .then(res => {
                    // console.log(res.data)
                    commit(DEFINIR_TAREFAS, res.data)
                })
                .catch(err => console.log(err))
        },
        [CADASTRAR_TAREFA](contexto, tarefa: ITarefas){
            return http.post('/tarefas', tarefa)
                .then(res => {
                    this.commit(ADICIONAR_TAREFA, res.data);
                });
        },
        [EDITAR_TAREFA]({ commit }, tarefa: ITarefas){
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
            .then(() => {
                this.commit(EDITA_TAREFA, tarefa)
            });
        },
    },
    modules:{
        projeto
    }
})

export default function useStore(): Store<Estado>{
    return vuexUseStore(key);
}
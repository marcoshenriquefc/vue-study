import IProjetos from "@/interfaces/IProjetos";
import {createStore, Store, useStore as vuexUseStore} from 'vuex'
import { InjectionKey } from 'vue'
import { ADICIONA_PROJETO, EDITA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS, NOTIFICAR, DEFINIR_TAREFAS, ADICIONAR_TAREFA, EDITA_TAREFA } from './tipo-mutacao'
import { INotificacao, TipoDeNotificacao } from "@/interfaces/INotificacao";
import { CADASTRAR_PROJETO, CADASTRAR_TAREFA, EDITAR_PROJETO, EDITAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acao";
import http from '@/http'
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
        
        // PROJETOS
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
        [DEFINIR_PROJETOS](state, projetos: IProjetos[]){
            state.projetos = projetos
        },

        
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

        // PROJETOS
        [OBTER_PROJETOS]({ commit }){
            http.get('projetos')
                .then(res => {
                    // console.log(res.data)
                    commit(DEFINIR_PROJETOS, res.data)
                })
                .catch(err => console.log(err))
        },
        [CADASTRAR_PROJETO](contexto, nomeProjeto: string){
            return http.post('/projetos', {
                // id: new Date().toISOString(),
                nome: nomeProjeto
            })
        },
        [EDITAR_PROJETO](contexto, projeto: IProjetos){
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO]({commit}, id: string){
            return http.delete(`/projetos/${id}`)
        },

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
        }

    }
})

export default function useStore(): Store<Estado>{
    return vuexUseStore(key);
}
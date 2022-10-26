import http from "@/http";
import IProjetos from "@/interfaces/IProjetos";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, EDITAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acao";
import { ADICIONA_PROJETO, EDITA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-mutacao";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjetos[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        // PROJETOS
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjetos

            state.projetos.push(projeto)
        },
        [EDITA_PROJETO](state, projeto: IProjetos) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);

            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, idProjeto: string) {
            state.projetos = state.projetos.filter((proj) => {
                return proj.id != idProjeto
            });
        },
        [DEFINIR_PROJETOS](state, projetos: IProjetos[]) {
            state.projetos = projetos
        },
    },

    actions: {
        // PROJETOS
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(res => {
                    // console.log(res.data)
                    commit(DEFINIR_PROJETOS, res.data)
                })
                .catch(err => console.log(err))
        },
        [CADASTRAR_PROJETO](contexto, nomeProjeto: string) {
            return http.post('/projetos', {
                // id: new Date().toISOString(),
                nome: nomeProjeto
            })
        },
        [EDITAR_PROJETO](contexto, projeto: IProjetos) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO]({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
        },
    }
}
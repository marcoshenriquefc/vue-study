import IProjetos from "@/interfaces/IProjetos";
import {createStore, Store, useStore as vuexUseStore} from 'vuex'
import { InjectionKey } from 'vue'
import { ADICIONA_PROJETO, EDITA_PROJETO, EXCLUIR_PROJETO } from './tipo-mutacao'

interface Estado{
    projetos: IProjetos[]
}

export const key: InjectionKey<Store<Estado>> = Symbol(); 

export const store = createStore<Estado>({
    state: {
        projetos: []
    },
    mutations: {
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
        }
    }
})

export default function useStore(): Store<Estado>{
    return vuexUseStore(key);
}
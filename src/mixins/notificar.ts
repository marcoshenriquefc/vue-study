import { TipoDeNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/tipo-mutacao";
import { store } from "@/store";


export const notificacaoMixin = {
    methods: {
        notificar( tipo: TipoDeNotificacao, titulo: string, texto: string){
            store.commit(NOTIFICAR, {
                texto,
                titulo,
                tipo
            })
        }
    }
}
<template>
    <div class="notificacoes">
        <article
            v-for="notificacao in notificacoes"
            :key="notificacao.id"
            class="message"
            :class="contexto[notificacao.tipo]"
        >

            <div class="message-header">
                {{ notificacao.titulo }}
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useStore from '@/store'
import { computed } from "@vue/reactivity";
import { TipoDeNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
    name: 'NotificacaoMensagem',
    data() {
        return {
            contexto: {
                [TipoDeNotificacao.SUCESSO]: 'is-success',
                [TipoDeNotificacao.FALHA]: 'is-danger',
                [TipoDeNotificacao.ATENCAO]: 'is-warning'
            }
        }
    },
    setup() {
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 100;
}
</style>
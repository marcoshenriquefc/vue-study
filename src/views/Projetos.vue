<template>
<section class="projetos">
    <NotificacaoMensagem></NotificacaoMensagem>
    <h1 class="title"> Projetos </h1>
    <router-view></router-view>
</section>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotificacaoMensagem from '@/components/notificacao.vue';

export default defineComponent({
    name: "ProjetosView",
    components: { NotificacaoMensagem }
})
</script>


<style scoped>
.projetos{
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>

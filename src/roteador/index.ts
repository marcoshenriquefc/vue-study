import { createRouter, createWebHashHistory, RouteRecordRaw, } from "vue-router";
import TarefaView from '../views/Tarefas.vue'
import ProjetosView from '../views/Projetos.vue'
import FormularioProjetosView from '../views/projetos/Formulario.vue'

const rotas: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Tarefas',
        component: TarefaView
    },
    {
        path: '/projetos',
        name: 'Projetos',
        component: ProjetosView
    },
    {
        path: '/projetos/novo',
        name: 'Novo projeto',
        component: FormularioProjetosView
    },
    {
        path: '/projetos/:idProjeto',
        name: 'Editar projeto',
        component: FormularioProjetosView,
        props: true,
    },
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas,
});

export default roteador;
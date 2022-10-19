import { createRouter, createWebHashHistory, RouteRecordRaw, } from "vue-router";
import TarefaView from '../views/Tarefas.vue'
import ProjetosView from '../views/Projetos.vue'

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
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas,
});

export default roteador;
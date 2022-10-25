import IProjetos from "./IProjetos";

export default interface ITarefas{
    id: number;
    TempoEmSegundos: number;
    descricao: string;
    projeto: IProjetos;
}
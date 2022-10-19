import IProjetos from "./IProjetos";

export default interface ITarefas{
    TempoEmSegundos: number;
    descricao: string;
    projeto: IProjetos;
}
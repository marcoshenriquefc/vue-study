export enum TipoDeNotificacao{
    SUCESSO,
    ATENCAO,
    FALHA
}
export interface INotificacao{
    id: number
    titulo: string,
    texto: string,
    tipo: TipoDeNotificacao,
}
export interface PainelModel {
    totalQuitado: number;
    totalVendido: number;
    totalDebitos: number;
    totalQuitadoPorUsuario?: number;
    totalVendidoPorUsuario?: number;
    totalDebitosPorUsuario?: number;
    dataAtual?: string;
}
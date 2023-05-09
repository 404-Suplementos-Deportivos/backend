import { CreateDetalleNPDto } from "./createDetalleNPDto";

export interface CreateNotaPedidoDto {
  version: number;
  fechaVencimiento: string;
  usuarioId: number;
  proveedorId: number;
  tipoCompraId: number;
  detalleNotaPedido: CreateDetalleNPDto[];
}

// Id -> Crea POST
// Version -> Crea POST
// Fecha -> Crea POST
// UsuarioId -> Toma de JWT
// Estado NP -> Crea POST
// Tipo Compra -> Crea POST
import { UpdateDetalleNPDto } from "./updateDetalleNPDto";

export interface UpdateNotaPedidoDto {
  id: number;
  version: number;
  fechaVencimiento: string;
  estadoNPId: number;
  tipoCompraId: number;
  detalleNotaPedido: UpdateDetalleNPDto[];
}
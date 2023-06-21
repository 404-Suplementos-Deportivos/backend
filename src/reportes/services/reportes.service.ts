import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { productos as ProductoAPI } from '@prisma/client';
import { FechasDto } from '../dto/FechasDto';
import { formatDate } from 'src/utils/helpers';

@Injectable()
export class ReportesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlertStockMinimo(): Promise<any> {
    const productos = await this.prisma.productos.findMany({
      select: {
        id: true,
        nombre: true,
        stock: true,
        stock_minimo: true,
      },
    });
    const productosAlerta = productos.filter((producto: ProductoAPI) => {
      return producto.stock <= producto.stock_minimo;
    });
    return productosAlerta;
  }

  async getLastSells(): Promise<any> {
    const ordenes = await this.prisma.facturas.findMany({
      where: {
        fecha: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
        id_estado: 1,
      },
      orderBy: {
        fecha: 'desc',
      },
      take: 5,
      select: {
        numero_factura: true,
        fecha: true,
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
          },
        },
        estados_factura: {
          select: {
            nombre: true,
          },
        },
        detalles_facturas: {
          select: {
            cantidad: true,
            precio: true,
          },
        },
      },
    });
    return ordenes.map((orden: any) => {
      return {
        numero_factura: Number(orden.numero_factura),
        fecha: formatDate(orden.fecha),
        usuario: `${orden.usuarios.nombre} ${orden.usuarios.apellido}`,
        estado: orden.estados_factura.nombre,
        total: orden.detalles_facturas.reduce((acc: number, curr: any) => {
          return acc + curr.cantidad * curr.precio;
        }, 0),
      };
    });
  }

  async getCantidadRegistrosMensual(fechasDto: FechasDto): Promise<any> {
    const { fechaDesde, fechaHasta, tipoUsuario } = fechasDto;
    let cantidadUsuariosMensual: any;

    if (tipoUsuario !== 0) {
      cantidadUsuariosMensual = await this.prisma.$queryRaw`
        SELECT 
          to_char(date_trunc('month', fecha_creacion), 'MM') AS mes,
          CAST(COUNT(*) AS INTEGER) AS cantidad_usuarios
        FROM usuarios
        WHERE fecha_creacion >= ${new Date(fechaDesde)}
        AND fecha_creacion <= ${new Date(fechaHasta)}
        AND id_rol = ${tipoUsuario}
        GROUP BY mes
        ORDER BY mes ASC
      `;
    } else {
      cantidadUsuariosMensual = await this.prisma.$queryRaw`
        SELECT
          to_char(date_trunc('month', fecha_creacion), 'MM') AS mes,
          CAST(COUNT(*) AS INTEGER) AS cantidad_usuarios
        FROM usuarios
        WHERE fecha_creacion >= ${new Date(fechaDesde)}
        AND fecha_creacion <= ${new Date(fechaHasta)}
        GROUP BY mes
        ORDER BY mes ASC
      `;
    }

    const result = [];
    for (let i = 0; i < 12; i++) {
      const mes = i < 9 ? `0${i + 1}` : `${i + 1}`;
      const cantidad = cantidadUsuariosMensual.find(
        (item: any) => item.mes === mes,
      );
      result.push({
        mes,
        cantidadUsuarios: cantidad ? cantidad.cantidad_usuarios : 0,
      });
    }
    return result;
  }

  async getLastSellsBuys(fechasDto: FechasDto): Promise<any> {
    const { fechaDesde, fechaHasta } = fechasDto;

    let ventasMensuales: any;
    let comprasMensuales: any;

    if (fechaDesde !== fechaHasta) {
      ventasMensuales = await this.prisma.$queryRaw`
      SELECT
        to_char(date_trunc('month', F.fecha), 'MM') AS mes,
        SUM(DF.precio * DF.cantidad) as resultado
      FROM facturas F
      INNER JOIN detalles_facturas DF ON F.id = DF.id_factura
      WHERE fecha >= ${new Date(fechaDesde)}
      AND fecha <= ${new Date(fechaHasta)}
      AND F.id_estado = 1
      GROUP BY mes
      ORDER BY mes ASC
    `;

      comprasMensuales = await this.prisma.$queryRaw`
      SELECT
        to_char(date_trunc('month', NP.fecha), 'MM') AS mes,
        SUM(DNP.precio * DNP.cantidad_pedida) as resultado
      FROM notas_pedido NP
      INNER JOIN detalles_np DNP ON NP.id = DNP.id_nota_pedido
      WHERE NP.id_estado_np = 3
      AND fecha >= ${new Date(fechaDesde)}
      AND fecha <= ${new Date(fechaHasta)}
      GROUP BY mes
      ORDER BY mes ASC
    `;
    } else {
      ventasMensuales = await this.prisma.$queryRaw`
      SELECT
        to_char(date_trunc('month', F.fecha), 'MM') AS mes,
        SUM(DF.precio * DF.cantidad) as resultado
      FROM facturas F
      INNER JOIN detalles_facturas DF ON F.id = DF.id_factura
      WHERE fecha >= ${new Date(fechaDesde)}
      AND F.id_estado = 1
      GROUP BY mes
      ORDER BY mes ASC
    `;
      comprasMensuales = await this.prisma.$queryRaw`
      SELECT
        to_char(date_trunc('month', NP.fecha), 'MM') AS mes,
        SUM(DNP.precio * DNP.cantidad_pedida) as resultado
      FROM notas_pedido NP
      INNER JOIN detalles_np DNP ON NP.id = DNP.id_nota_pedido
      WHERE NP.id_estado_np = 3
      AND fecha >= ${new Date(fechaDesde)}
      GROUP BY mes
      ORDER BY mes ASC
    `;
    }

    const resultadoVentas = [];
    const resultadoCompras = [];
    for (let i = 0; i < 12; i++) {
      const mes = i < 9 ? `0${i + 1}` : `${i + 1}`;
      const cantidadVentas = ventasMensuales.find(
        (item: any) => item.mes === mes,
      );
      const cantidadCompras = comprasMensuales.find(
        (item: any) => item.mes === mes,
      );
      resultadoVentas.push({
        mes,
        monto: cantidadVentas ? cantidadVentas.resultado : 0,
      });
      resultadoCompras.push({
        mes,
        monto: cantidadCompras ? cantidadCompras.resultado : 0,
      });
    }

    return {
      ventas: resultadoVentas,
      compras: resultadoCompras,
    };
  }

  async getCategorySells(fechasDto: FechasDto): Promise<any> {
    const { fechaDesde, fechaHasta } = fechasDto;
    const cantidadVentas: any = await this.prisma.$queryRaw`
      SELECT
        CA.nombre AS categoria,
        SUM(DF.cantidad) AS cantidad_vendida
      FROM detalles_facturas DF
      INNER JOIN (
        SELECT
          id
        FROM facturas
        WHERE fecha >= ${new Date(fechaDesde)} AND fecha <= ${new Date(
      fechaHasta,
    )}
        AND id_estado = 1
      ) AS F ON F.id = DF.id_factura
      INNER JOIN productos PR ON PR.id = DF.id_producto
      RIGHT JOIN categorias CA ON CA.id = PR.id_categoria
      GROUP BY CA.nombre;
    `;

    const result = cantidadVentas.map((item: any) => {
      return {
        categoria: item.categoria,
        cantidadVendida: Number(item.cantidad_vendida),
      };
    });
    return result;
  }

  async getMostSelledProducts(fechasDto: FechasDto): Promise<any> {
    const { fechaDesde, fechaHasta, tipoCategoria } = fechasDto;
    let productosMasVendidos: any;

    if (tipoCategoria === 0) {
      productosMasVendidos = await this.prisma.$queryRaw`
        SELECT
          CA.nombre AS categoria,
          PR.nombre AS producto_mas_vendido,
          SUM(DF.cantidad) AS cantidad_vendida
        FROM detalles_facturas DF
        INNER JOIN (
          SELECT id
          FROM facturas
          WHERE fecha >= ${new Date(fechaDesde)} AND fecha <= ${new Date(
        fechaHasta,
      )}
        ) AS F ON F.id = DF.id_factura
        INNER JOIN productos PR ON PR.id = DF.id_producto
        RIGHT JOIN categorias CA ON CA.id = PR.id_categoria
        GROUP BY CA.nombre, PR.nombre
        HAVING SUM(DF.cantidad) = (
          SELECT MAX(total_vendido)
          FROM (
            SELECT CA.nombre AS categoria, PR.nombre AS producto, SUM(DF.cantidad) AS total_vendido
            FROM detalles_facturas DF
            INNER JOIN (
              SELECT id
              FROM facturas
              WHERE fecha >= ${new Date(fechaDesde)} AND fecha <= ${new Date(
        fechaHasta,
      )}
            ) AS F ON F.id = DF.id_factura
            INNER JOIN productos PR ON PR.id = DF.id_producto
            RIGHT JOIN categorias CA ON CA.id = PR.id_categoria
            GROUP BY CA.nombre, PR.nombre
          ) AS subquery
          WHERE subquery.categoria = CA.nombre
        ) OR SUM(DF.cantidad) IS NULL
        ORDER BY cantidad_vendida DESC
        LIMIT 7;
      `;
    } else {
      productosMasVendidos = await this.prisma.$queryRaw`
        SELECT
          CA.nombre AS categoria,
          PR.nombre AS producto_mas_vendido,
          SUM(DF.cantidad) AS cantidad_vendida
        FROM detalles_facturas DF
        INNER JOIN (
          SELECT id
          FROM facturas
          WHERE fecha >= ${new Date(fechaDesde)} AND fecha <= ${new Date(
        fechaHasta,
      )}
        ) AS F ON F.id = DF.id_factura
        INNER JOIN productos PR ON PR.id = DF.id_producto
        RIGHT JOIN categorias CA ON CA.id = PR.id_categoria
        WHERE CA.id = ${tipoCategoria}
        GROUP BY CA.nombre, PR.nombre
        HAVING SUM(DF.cantidad) = (
          SELECT MAX(total_vendido)
          FROM (
            SELECT CA.nombre AS categoria, PR.nombre AS producto, SUM(DF.cantidad) AS total_vendido
            FROM detalles_facturas DF
            INNER JOIN (
              SELECT id
              FROM facturas
              WHERE fecha >= ${new Date(fechaDesde)} AND fecha <= ${new Date(
        fechaHasta,
      )}
            ) AS F ON F.id = DF.id_factura
            INNER JOIN productos PR ON PR.id = DF.id_producto
            RIGHT JOIN categorias CA ON CA.id = PR.id_categoria
            WHERE CA.id = ${tipoCategoria}
            GROUP BY CA.nombre, PR.nombre
          ) AS subquery
          WHERE subquery.categoria = CA.nombre
        ) OR SUM(DF.cantidad) IS NULL
        ORDER BY categoria ASC
        LIMIT 7;
      `;
    }

    const result = productosMasVendidos.map((item: any) => {
      return {
        categoria: item.categoria,
        productoMasVendido: item.producto_mas_vendido,
        cantidadVendida: Number(item.cantidad_vendida),
      };
    });
    return result;
  }

  async getTiposUsuario(): Promise<any> {
    const tiposUsuario: any = await this.prisma.roles.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
    return tiposUsuario;
  }

  async getCategorias(): Promise<any> {
    const categorias: any = await this.prisma.categorias.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
    return categorias;
  }
}

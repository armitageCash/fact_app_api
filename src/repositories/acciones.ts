import Repository from "@/shared/repository";
import { Input } from "@/cases/get-actions-data/types";
import { Input as InputDetailed } from "@/cases/get-actions-detail/types";
import { Acciones } from "@/domain/acciones";
import { Input as InputUpdate } from "@/cases/update-actions-data/types";
export default class ActionsRepository extends Repository {
  constructor() {
    super();
  }

  async getActions(params: Input): Promise<Acciones | undefined> {
    return this.database.instance.raw(
      "SELECT * FROM acciones WHERE acciones.Nitempresa = ?",
      [params.nit]
    );
  }

  async updateAction(params: InputUpdate): Promise<Acciones | undefined> {
    await this.database.instance.raw(
      `
  UPDATE acciones
  SET 
    ID = ?,
    Ins_arqueos = ?,
    Eje_accion = ?,
    Accion = ?,
    Comp_ventas = ?,
    Prefijo_caja = ?,
    Nitempresa = ?,
    Usuario = ?,
    Accion1 = ?,
    Accion2 = ?,
    Accion3 = ?,
    Tope = ?,
    Transaccionespen = ?,
    Almacen = ?,
    Estado = ?,
    Fecha1 = ?,
    Fecha2 = ?,
    Auditar = ?
  WHERE Prefijo_caja = ? AND Nitempresa = ?;
  `,
      [
        0, // ID
        params.Acciones.Ins_arqueos, // Ins_arqueos
        params.Acciones.Eje_accion, // Eje_accion
        params.Acciones.Accion, // Accion
        params.Acciones.Comp_ventas, // Comp_ventas
        params.Acciones.Prefijo_caja, // Prefijo_caja
        params.Acciones.Nitempresa, // Nitempresa
        params.Acciones.Usuario, // Usuario
        params.Acciones.Accion1, // Accion1
        params.Acciones.Accion2, // Accion2
        params.Acciones.Accion3, // Accion3
        params.Acciones.Tope, // Tope
        params.Acciones.Transaccionespen, // Transaccionespen
        params.Acciones.Almacen, // Almacen
        params.Acciones.Estado, // Estado
        params.Acciones.Fecha1, // Fecha1
        params.Acciones.Fecha2, // Fecha2
        params.Acciones.Auditar, // Auditar
        params.Acciones.Prefijo_caja, // Where: Prefijo_caja
        params.Acciones.Nitempresa, // Where: Nitempresa
      ]
    );
    // Realiza un SELECT para obtener el registro actualizado
    const [updatedAction] = await this.database
      .instance<Acciones>("acciones")
      .where("Prefijo_caja", params.Acciones.Prefijo_caja)
      .andWhere("Nitempresa", params.Acciones.Nitempresa)
      .select();

    // Retorna el registro actualizado o undefined si no se encuentra
    return updatedAction || undefined;
  }

  async getAction(params: InputDetailed): Promise<Acciones | undefined> {
    return this.database.instance.raw(
      "SELECT * FROM acciones WHERE acciones.Prefijo_caja = ?",
      [params.id]
    );
  }
}

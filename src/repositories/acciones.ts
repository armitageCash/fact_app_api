import Repository from "@/shared/repository";
import { Input } from "@/cases/get-actions-data/types";
import { Input as InputDetailed } from "@/cases/get-actions-detail/types";
import { Acciones } from "@/domain/acciones";
import { Input as InputUpdate } from "@/cases/update-actions-data/types";
import { Input as inputUpdateState } from "@/cases/update-actions-state/types";

export default class ActionsRepository extends Repository {
  constructor() {
    super();
  }

  async getActions(params: Input): Promise<any> {
    return this.database.instance.raw(
      "SELECT * FROM Acciones WHERE Acciones.Nitempresa = ?",
      [params.nit]
    );
  }

  async updateAction(params: InputUpdate): Promise<Acciones | undefined> {
    await this.database.instance.raw(
      `
    UPDATE Acciones
    SET 
      Ins_arqueos = ?,
      Eje_accion = ?,
      Accion = ?,
      Comp_ventas = ?,
      Accion1 = ?,
      Accion2 = ?,
      Accion3 = ?,
      Tope = ?,
      Transaccionespen = ?,
      Estado = ?,
      Fecha1 = ?,
      Fecha2 = ?,
      Auditar = ?
    WHERE Nitempresa = ? AND Almacen = ?;
    `,
      [
        params.Acciones.Ins_arqueos, // Ins_arqueos
        params.Acciones.Eje_accion, // Eje_accion
        params.Acciones.Accion, // Accion
        params.Acciones.Comp_ventas, // Comp_ventas
        params.Acciones.Accion1, // Accion1
        params.Acciones.Accion2, // Accion2
        params.Acciones.Accion3, // Accion3
        params.Acciones.Tope, // Tope
        params.Acciones.Transaccionespen, // Transaccionespen
        params.Acciones.Estado, // Estado
        params.Acciones.Fecha1, // Fecha1
        params.Acciones.Fecha2, // Fecha2
        params.Acciones.Auditar, // Auditar
        params.Acciones.Nitempresa, // Nitempresa (WHERE)
        params.Acciones.Almacen, // Almacen (WHERE)
      ]
    );

    // Realiza un SELECT para obtener el registro actualizado
    const [updatedAction] = await this.database
      .instance<Acciones>("Acciones")
      .where("Nitempresa", params.Acciones.Nitempresa)
      .andWhere("Almacen", params.Acciones.Almacen)
      .select();

    // Retorna el registro actualizado o undefined si no se encuentra
    return updatedAction;
  }

  async updateActionState(
    params: inputUpdateState
  ): Promise<Acciones | undefined> {
    await this.database.instance.raw(
      `
    UPDATE Acciones
    SET 
      Tope = ?,
      Estado = ?
    WHERE Nitempresa = ?
    `,
      [
        params.Acciones.Tope, // Tope
        params.Acciones.Estado, // Estado
        params.Acciones.Nitempresa, // Nitempresa
      ]
    );

    // Realiza un SELECT para obtener el registro actualizado
    const [updatedAction] = await this.database
      .instance<Acciones>("Acciones")
      .where("Nitempresa", params.Acciones.Nitempresa)
      .select();

    // Retorna el registro actualizado o undefined si no se encuentra
    return updatedAction;
  }

  async getAction(params: InputDetailed): Promise<Acciones | undefined> {
    return this.database.instance.raw(
      "SELECT * FROM Acciones WHERE Acciones.Prefijo_caja = ?",
      [params.id]
    );
  }

  async getActionbyNit(params: Input): Promise<Acciones | undefined> {
    const result = await this.database.instance.raw(
      "SELECT * FROM Acciones WHERE Acciones.Nitempresa = ? LIMIT 1",
      [params.nit]
    );

    // En Knex.js, el resultado de raw devuelve un array. Accede al primer elemento.
    return result[0]?.[0];
  }
}

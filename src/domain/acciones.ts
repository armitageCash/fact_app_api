export type Acciones = {
  ID: number;                          // tinyint NOT NULL DEFAULT 0
  Ins_arqueos: number;                 // tinyint NOT NULL DEFAULT 0
  Eje_accion: number;                  // tinyint NOT NULL DEFAULT 0
  Accion?: string;                     // varchar(500) DEFAULT '-'
  Comp_ventas: number;                 // tinyint NOT NULL DEFAULT 0
  Prefijo_caja: string;                // varchar(4) NOT NULL DEFAULT '0'
  Nitempresa: string;                  // varchar(15) NOT NULL DEFAULT '0'
  Usuario: string;                     // varchar(20) NOT NULL DEFAULT '0'
  Accion1: string;                     // varchar(500) NOT NULL DEFAULT '0'
  Accion2: string;                     // varchar(500) NOT NULL DEFAULT '0'
  Accion3: string;                     // varchar(500) NOT NULL DEFAULT '0'
  Tope: number;                        // int NOT NULL DEFAULT 0
  Transaccionespen: number;            // int NOT NULL DEFAULT 0
  Almacen: string;                     // varchar(50) NOT NULL DEFAULT '0'
  Estado: number;                      // tinyint NOT NULL DEFAULT 0
  Fecha1: Date;                        // date NOT NULL DEFAULT curdate()
  Fecha2: Date;                        // date NOT NULL DEFAULT curdate()
  Auditar: number;                     // tinyint NOT NULL DEFAULT 0
};

export type Conexiones = {
  Id: number;                         // int NOT NULL AUTO_INCREMENT
  con_Tipo: string;                   // varchar(10) NOT NULL
  con_Nitempresa: string;             // varchar(10) NOT NULL
  con_Prefijo: string;                // varchar(4) NOT NULL
  con_Facpendientes: number;          // int NOT NULL
  Ultimaconexion: Date;               // datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  Log?: string | null;                // varchar(1000) DEFAULT NULL
};

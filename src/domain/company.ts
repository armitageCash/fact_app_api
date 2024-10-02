export type Company = {
  Nit: number;
  Razonsocial: string;
  Direccion: string;
  Pais: string;
  Departamento: string;
  Ciudad: string;
  Telefono: string;
  TipoPersona: "PERSONA_NATURAL" | "PERSONA_JURIDICA"; // Suponiendo dos tipos posibles
  RegFiscal: "NO_APLICA" | "APLICA"; // Ajustar según los valores posibles
  RespFiscal: "RESPONSABLE" | "NO_RESPONSABLE"; // Ajustar según los valores posibles
  RespTributaria: "APLICA" | "NO_APLICA"; // Ajustar según los valores posibles
  Email: string;
  NombreCertificado: string;
  PwdCertificado: string;
  Filecons: number;
  Replay: number;
  Activate: number;
  id: number;
  Nitempresa: number;
  Idusuario: number;
  Idalmacen: number;
};

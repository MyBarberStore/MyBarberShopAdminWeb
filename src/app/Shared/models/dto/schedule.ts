// Representa un turno individual tal como lo espera el JSON de la API
export interface ShiftRequest {
  startTime: string;
  endTime: string;
}

// Representa el horario completo: Una clave por día y un array de turnos como valor
export type FullScheduleRequest = Record<string, ShiftRequest[]>;
export interface AppointmentRequest {
  //modelo necesario para el post y put
  id?: number; // Opcional para creación, requerido para edición
  date: string; 
  startTime: string;     
  telNumber: string;
  clientId: number;
  employeeId: number;
  serviceId: number;
  status: string; 
}

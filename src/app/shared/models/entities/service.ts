export interface Service {
  id?: number;           
  name: string;
  price: number;
  durationMinutes: number;
  isEditing?: boolean; // Propiedad para controlar el estado de edición en la UI
  
}
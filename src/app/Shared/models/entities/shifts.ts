export interface DayShift {
  active: boolean;
  startTime: string;
  endTime: string;
}

export interface DayConfig {
  name: string;      // "MONDAY", "TUESDAY", etc.
  label: string;     // "Lunes", "Martes", etc.
  isOpen: boolean;   // Checkbox del día principal
  morning: DayShift;
  afternoon: DayShift;
}
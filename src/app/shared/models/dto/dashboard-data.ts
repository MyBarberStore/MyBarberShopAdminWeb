import { ServiceCountDTO } from "./service-count";

export interface DashboardData {
    employeesNumber: number;
    availableSlots: number;
    serviceCountDTO: ServiceCountDTO[];
}
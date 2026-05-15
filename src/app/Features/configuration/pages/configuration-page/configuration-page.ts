import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { ShiftService } from '../../shift-service';
import { DayConfig } from '../../../../shared/models/entities/shifts';
import { FullScheduleRequest, ShiftRequest } from '../../../../shared/models/dto/schedule';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../appointment/appointment-service';
import { Service } from '../../../../shared/models/entities/service';
import { serviceService } from '../../service-service';

@Component({
  selector: 'app-configuration-page',
  imports: [FormsModule],
  templateUrl: './configuration-page.html',
  styleUrl: './configuration-page.css',
})
export class ConfigurationPage {
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  newService: Service = {
  name: '',
  price: 0,
  durationMinutes: 0
};

  shiftService = inject(ShiftService);
  cdRef = inject(ChangeDetectorRef);
  appointmentService = inject(AppointmentService);
  serviceService = inject(serviceService);

  // Inicializamos el Signal con los 7 días de la semana
  daysConfig = signal<DayConfig[]>([
    { name: 'MONDAY', label: 'Lunes', isOpen: true, morning: { active: true, startTime: '09:00', endTime: '14:00' }, afternoon: { active: true, startTime: '16:00', endTime: '21:00' } },
    { name: 'TUESDAY', label: 'Martes', isOpen: true, morning: { active: true, startTime: '09:00', endTime: '14:00' }, afternoon: { active: true, startTime: '16:00', endTime: '21:00' } },
    { name: 'WEDNESDAY', label: 'Miércoles', isOpen: true, morning: { active: true, startTime: '09:00', endTime: '14:00' }, afternoon: { active: true, startTime: '16:00', endTime: '21:00' } },
    { name: 'THURSDAY', label: 'Jueves', isOpen: true, morning: { active: true, startTime: '09:00', endTime: '14:00' }, afternoon: { active: true, startTime: '16:00', endTime: '21:00' } },
    { name: 'FRIDAY', label: 'Viernes', isOpen: true, morning: { active: true, startTime: '09:00', endTime: '14:00' }, afternoon: { active: true, startTime: '16:00', endTime: '21:00' } },
    { name: 'SATURDAY', label: 'Sábado', isOpen: false, morning: { active: true, startTime: '10:00', endTime: '14:00' }, afternoon: { active: false, startTime: '16:00', endTime: '21:00' } },
    { name: 'SUNDAY', label: 'Domingo', isOpen: false, morning: { active: false, startTime: '09:00', endTime: '14:00' }, afternoon: { active: false, startTime: '16:00', endTime: '21:00' } }
  ]);

  services = signal<Service[]>([
    { name: 'Corte de pelo', price: 15, durationMinutes: 30 },
    { name: 'Afeitado clásico', price: 12, durationMinutes: 20 },
    { name: 'Barba completa', price: 10, durationMinutes: 15 }
  ]);

  ngOnInit() {
    this.getServices();
  }

  saveSchedule() {
  const finalSchedule: FullScheduleRequest = {};

  this.daysConfig().forEach(day => {
    const shifts: ShiftRequest[] = [];
    
    if (day.isOpen) {
      if (day.morning.active) {
        shifts.push({ 
          startTime: day.morning.startTime, 
          endTime: day.morning.endTime 
        });
      }
      if (day.afternoon.active) {
        shifts.push({ 
          startTime: day.afternoon.startTime, 
          endTime: day.afternoon.endTime 
        });
      }
    }
    
    
    finalSchedule[day.name] = shifts;
  });

  this.shiftService.updateAllHours(finalSchedule).subscribe({
    next: () => {
      Swal.fire('Éxito', 'Horario global actualizado', 'success');
    },
    error: (err) => {
      Swal.fire('Error', 'No se pudo sincronizar el horario', 'error');
    }
  });
}

  getServices() {
    this.appointmentService.getServices().subscribe({
      next: (services) => {
        this.services.set(services);
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudieron cargar los servicios, ' + err.message, 'error'); 
      }
     });
    }

    createService() {
      if (!this.newService.name || this.newService.price <= 0) return;

    
      this.serviceService.createService(this.newService).subscribe({
        next: () => {
          Swal.fire('Creado', 'Servicio creado con éxito', 'success');
          this.getServices();
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo crear el servicio, ' + err.message, 'error'); 
         }
       });
      }

    deleteService(service: Service) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar el servicio ${service.name}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, mantener',
        confirmButtonColor: '#f89900',  
        cancelButtonColor: '#64748b',
      }).then((result) => { 
        if (result.isConfirmed) {
          this.serviceService.deleteService(service.id!).subscribe({
            next: () => {
              Swal.fire('Eliminado', 'El servicio ha sido eliminado correctamente', 'success'); 
              this.getServices();
            },
            error: (err) => {
              Swal.fire('Error', 'No se pudo eliminar el servicio, ' + err.message, 'error');
            }
           });  
        }
      });
    }

    startEdit(service: Service) {
      service.isEditing = true;
  }

  cancelEdit(service: Service) {
    service.isEditing = false;
    this.cdRef.detectChanges();
  }

  updateService(service: Service) {
  this.serviceService.updateService(service.id!, service).subscribe({
    next: () => {
      this.cancelEdit(service);
      Swal.fire('¡Éxito!', 'Servicio actualizado', 'success');
    },
    error: (err) => Swal.fire('Error', err.error, 'error')
  });
}

}

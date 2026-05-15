# 💻 BarberPro - Web Admin Suite

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Reactive-Programming](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)

**BarberPro Web** es el centro de control operativo del ecosistema BarberPro. Esta plataforma permite la gestión integral del negocio, desde la monitorización de la agenda diaria hasta el control administrativo de empleados, ausencias y flujos de facturación.

---

## 🛠️ Funcionalidades Detalladas

### 📅 1. Gestión de Citas (Capa Operativa)
El sistema ofrece un control total sobre el flujo de clientes en el local:
* **Agenda en Tiempo Real:** Visualización dinámica de las citas del día, consumiendo datos de forma reactiva para asegurar que la información esté siempre actualizada.
* **Clasificación y Estados:** Gestión de estados de cita (Pendiente, Completada, Cancelada) con feedback visual inmediato.
* **Ordenación Cronológica Inteligente:** Uso de **Angular Signals** y `computed` para ordenar automáticamente el listado por hora de inicio, facilitando la lectura al personal.
* **Filtros Avanzados:** Capacidad de filtrar la agenda por barbero o tipo de servicio para una mejor organización interna.

### 👥 2. Gestión de Empleados (Recursos Humanos)
Módulo completo para la administración del personal de la barbería:
* **Perfiles de Barbero:** CRUD (Crear, Leer, Actualizar, Borrar) de empleados, incluyendo fotos, especialidades y horarios.
* **Asignación de Servicios:** Control de qué servicios puede realizar cada empleado (ej. un barbero junior vs. un especialista en barba).
* **Control de Carga:** Visualización de la cantidad de citas asignadas por profesional para equilibrar el trabajo.

### 🏖️ 3. Gestión de Ausencias y Disponibilidad
Un motor lógico diseñado para evitar errores en las reservas:
* **Calendario de Ausencias:** Registro de vacaciones, bajas médicas o días libres.
* **Bloqueo de Reservas:** Integración directa con el backend para que, si un empleado tiene una ausencia registrada, el sistema de la App Android bloquee automáticamente esas franjas horarias.
* **Historial de Inasistencias:** Registro histórico para el control administrativo de la empresa.

### 💰 4. Facturación y Reportes (Capa de Negocio)
Transformación de las citas completadas en datos financieros:
* **Generación de Facturas:** Integración con el servicio de generación de PDFs. Cada cita completada genera un registro de facturación único.
* **Consulta de Ingresos:** Visualización del precio total de los servicios realizados.
* **Exportación de Datos:** Preparación del sistema para la descarga de reportes detallados de actividad económica por periodos de tiempo.

---

## 🏗️ Arquitectura de Software

* **Componentes Standalone:** Arquitectura moderna de Angular para una carga más rápida y modular.
* **Gestión de Estado (Signals):** Implementación de la nueva reactividad de Angular para minimizar las detecciones de cambios innecesarias y mejorar el rendimiento.
* **Intercepción de Peticiones:** Uso de `HttpInterceptors` para gestionar el envío de tokens de seguridad y el manejo global de errores de la API.
* **Services Layer:** Desacoplamiento total entre la lógica de interfaz (componentes) y el consumo de datos (servicios REST).

---

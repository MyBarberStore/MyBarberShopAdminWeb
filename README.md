# 💻 BarberPro - Web Admin Panel

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**BarberPro Web** es el panel de administración desarrollado en Angular para la gestión integral de la barbería. Permite a los administradores y barberos visualizar la agenda en tiempo real, gestionar citas y controlar el flujo diario de trabajo de manera eficiente.

---

## 🚀 Funcionalidades Principales

El panel administrativo ofrece una interfaz limpia y optimizada para la toma de decisiones:

### 1. Dashboard de Citas Diarias
* **Control de Agenda:** Visualización clara de todas las citas programadas para el día actual.
* **Orden Cronológico:** Implementación de lógica avanzada (Signals & Computed) para ordenar las citas automáticamente por hora.
* **Scroll Optimizado:** Contenedores con scroll personalizado para manejar grandes volúmenes de citas sin romper el diseño.

### 2. Gestión de Servicios y Personal
* **Visualización Dinámica:** Tarjetas de citas detalladas que incluyen cliente, servicio solicitado, barbero asignado y hora.
* **Arquitectura de Componentes:** Uso de componentes reutilizables (`AppointmentItem`, `AppointmentCard`) para una interfaz consistente.

### 3. Experiencia de Usuario (UX)
* **Diseño Moderno:** Estética profesional con sombras suaves, bordes redondeados y tipografía clara.
* **Reactividad:** Uso de **Angular Signals** para una actualización de la interfaz ultra rápida y eficiente.
* **Responsive Design:** Adaptado para su uso tanto en monitores de oficina como en tablets dentro del local.

---

## 🛠️ Stack Tecnológico

* **Framework:** [Angular](https://angular.io/) (Última versión con sintaxis de control flow `@for`).
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/).
* **Estado de la App:** [Angular Signals](https://angular.io/guide/signals) para una gestión reactiva del estado.
* **Comunicación:** `HttpClient` para el consumo de la API REST de Spring Boot.
* **Estilos:** CSS3 nativo con metodologías modernas (Flexbox y Grid).

---

## 📂 Estructura del Proyecto

```text
src/app/
├── components/      # Componentes reutilizables (Citas, Cards, Header)
├── models/          # Interfaces y modelos de datos (Appointment, User)
├── services/        # Servicios para llamadas a la API (DataService)
├── pages/           # Vistas principales del panel (Home, Dashboard)
└── app.config.ts    # Configuración global y rutas

# MEDI
# Estructura de archivos propuesta
medi-project/
│
├── backend/                    # Backend (Node.js + Express)
│   ├── config/                 # Configuración (bases de datos, autenticación, etc.)
│   │   ├── db.js               # Configuración de la base de datos
│   │   └── auth.js             # Configuración de autenticación
│   ├── controllers/            # Lógica de los controladores (funcionalidades de las rutas)
│   │   ├── appointmentController.js   # Controlador para citas médicas
│   │   ├── patientController.js       # Controlador para pacientes
│   │   └── medicalRecordController.js # Controlador para historias clínicas
│   ├── middleware/             # Middlewares personalizados
│   │   └── authMiddleware.js   # Middleware de autenticación y permisos
│   ├── models/                 # Modelos de la base de datos (MongoDB + Mongoose)
│   │   ├── Appointment.js      # Modelo para citas
│   │   ├── Patient.js          # Modelo para pacientes
│   │   └── MedicalRecord.js    # Modelo para historia clínica
│   ├── routes/                 # Definición de rutas
│   │   ├── appointmentRoutes.js   # Rutas para citas médicas
│   │   ├── patientRoutes.js       # Rutas para pacientes
│   │   └── medicalRecordRoutes.js # Rutas para historia clínica
│   ├── services/               # Servicios para lógica más compleja o integraciones externas
│   │   └── emailService.js     # Servicio para envío de emails
│   ├── tests/                  # Pruebas unitarias y de integración
│   │   ├── appointment.test.js # Pruebas para el módulo de citas médicas
│   │   └── patient.test.js     # Pruebas para pacientes
│   ├── utils/                  # Utilidades o helpers reutilizables
│   │   └── logger.js           # Utilidad para logs
│   ├── .env                    # Variables de entorno
│   ├── server.js               # Archivo principal del servidor
│   └── package.json            # Dependencias del backend
│
├── frontend/                   # Frontend (React)
│   ├── public/                 # Archivos públicos (index.html, favicon, etc.)
│   ├── src/                    # Código fuente del front-end
│   │   ├── assets/             # Imágenes, fuentes, etc.
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── Navbar.js       # Barra de navegación
│   │   │   └── Sidebar.js      # Menú lateral
│   │   ├── pages/              # Páginas principales de la aplicación
│   │   │   ├── Dashboard.js    # Panel de control del usuario
│   │   │   ├── Appointments.js # Gestión de citas médicas
│   │   │   ├── Patients.js     # Gestión de pacientes
│   │   │   └── MedicalRecords.js  # Gestión de historias clínicas
│   │   ├── services/           # Servicios de llamadas API
│   │   │   ├── appointmentService.js  # Servicio para citas
│   │   │   ├── patientService.js      # Servicio para pacientes
│   │   │   └── authService.js         # Servicio para autenticación
│   │   ├── hooks/               # Custom hooks (opcional)
│   │   ├── context/             # Context API (gestión de estado global)
│   │   ├── styles/              # Archivos de estilos (CSS o preprocesadores)
│   │   │   └── main.css         # Estilos generales
│   │   ├── App.js               # Componente principal de la aplicación
│   │   └── index.js             # Punto de entrada del front-end
│   ├── package.json             # Dependencias del frontend
│   └── .env                     # Variables de entorno del frontend
│
├── database/                   # Configuraciones y migraciones de la base de datos
│   ├── seeders/                # Scripts para poblar la base de datos con datos iniciales
│
├── docs/                       # Documentación del proyecto
│   ├── API.md                  # Documentación de la API
│   ├── frontend-guidelines.md  # Guía de desarrollo del front-end
│   └── backend-guidelines.md   # Guía de desarrollo del back-end
│
├── tests/                      # Pruebas end-to-end o de integración general
│   ├── e2e/                    # Pruebas end-to-end
│   └── integration/            # Pruebas de integración
├── README.md                   # Documentación general del proyecto
├── .gitignore                  # Configuración para ignorar archivos en Git
└── .prettierrc                 # Configuración de Prettier para el formato del código

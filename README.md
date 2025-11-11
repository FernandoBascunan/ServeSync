# PROYECTO DE TÍTULO: SERVESYNC 

Página web de gestión de inventario, manejo de pedidos y predicción de stock con ayuda de inteligencia artificial

## Contenido

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Problemas](#problemas-comunes)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Tecnologías](#tecnologías-utilizadas)


## Requisitos

- Python 3.8 o superior 
- Java 21 o superior
- MySQL 8.0 o superior
- Node.js 18 o superior
- Maven 3.9 o superior
- npm 9 o superior
- XAMPP
- IntelliJ IDEA / VS Code

## Instalación

### 1. Clonar el repositorio
```bash 
    git clone https://github.com/FernandoBascunan/ServeSync.git
    cd ServeSync
```
### 2. Configurar la base de datos

1. Inicia XAMPP y habilita MySQL
2. Crea 3 bases de datos con los siguientes nombres: 
        - `servesync_users` → MS-Users
        - `servesync_storage` → MS-Inventario
        - `servesync_tables` → MS-Mesas
3. No es necesario importar ningún script — las tablas se crearán automáticamente cuando el backend se inicie.

### 3. Instalar dependencias

1. Backend (Spring Boot)
Cada microservicio Java descarga automáticamente sus dependencias con Maven:
```bash
cd MS-Inventario
.\mvnw.cmd clean install
```
Haz lo mismo para MS-Mesas, MS-Users y Gateway.

2. Microservicio de IA (MS-Prophet – FastAPI)
Instala las dependencias de Python:
```bash
cd MS-Prophet
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```
3. Frontend (React)
Instala las dependencias de Node:
```bash
cd FrontServeSync
npm install --legacy-peer-deps
```

### 4. Configurar el Backend

1. Abrir el proyecto:
2. En el archivo application.properties de cada microservicio, ajusta: 
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/"base de datos de cada microservicio"
spring.datasource.username=root
spring.datasource.password=
# IMPORTANTE: Usa la MISMA clave en todos los microservicios
jwt.secret= clave_secreta_local
```
Abrir una terminal por microservicio en el orden que se indica: 
```bash
# Terminal 1 cd Gateway .\mvnw.cmd spring-boot:run
# Terminal 2
cd MS-Prophet 
uvicorn main:app --reload

# Terminal 3
cd MS-Inventario
.\mvnw.cmd spring-boot:run

# Terminal 4
cd MS-Mesas
.\mvnw.cmd spring-boot:run

# Terminal 5
cd MS-Users
.\mvnw.cmd spring-boot:run
```
4. Iniciar Frontend
```bash
cd FrontServeSync
npm start 
```
## Problemas comunes


**Puerto ocupado**: Cambia el puerto en application.properties con server.port=XXXX
**Error de conexión a BD**: Verifica que MySQL esté corriendo en XAMPP
**Error de JWT**: Asegúrate de usar la misma clave en todos los microservicios

## Arquitectura del proyecto

ServeSync utiliza una arquitectura de microservicios con los siguientes componentes:
```
┌─────────────┐
│   Frontend  │ (React - Puerto 3000)
│  ServeSync  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Gateway   │ (Spring Cloud - Puerto 8080)
└──────┬──────┘
       │
       ├──────→ MS-Users (Puerto 8081) ──→ servesync_users
       │
       ├──────→ MS-Inventario (Puerto 8082) ──→ servesync_storage
       │
       ├──────→ MS-Mesas (Puerto 8083) ──→ servesync_tables
       │
       └──────→ MS-Prophet (FastAPI - Puerto 8000)
```

### Componentes principales:
- **Frontend (React)**: Interfaz de usuario para gestión de inventario y pedidos
- **Gateway (Spring Cloud)**: Punto de entrada único, enrutamiento y autenticación
- **MS-Users**: Gestión de usuarios y autenticación JWT
- **MS-Inventario**: Control de stock y productos
- **MS-Mesas**: Manejo de mesas y pedidos del restaurante
- **MS-Prophet**: Predicción de demanda usando IA (Facebook Prophet)

## Estructura del Proyecto
```
ServeSync/
│
├── Back/                       # Backend microservicios
│   ├── Gateway/                # API Gateway (Spring Cloud)
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── mvnw.cmd
│   │
│   ├── MS-Users/               # Microservicio de usuarios
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── mvnw.cmd
│   │
│   ├── MS-Inventario/          # Microservicio de inventario
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── mvnw.cmd
│   │
│   ├── MS-Mesas/               # Microservicio de mesas
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── mvnw.cmd
│   │
│   └── MS-Prophet/             # Microservicio de IA
│       ├── main.py
│       ├── requirements.txt
│       └── models/
│
├── Front/                      # Frontend
│   └── FrontServeSync/         # Aplicación React
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── node_modules/
│
├── .idea/                      # Configuración IntelliJ
├── .venv/                      # Entorno virtual Python
└── README.md                   # Este archivo
```

## Uso

### Acceso a la aplicación
Una vez iniciados todos los servicios, accede a:
- **Aplicación web**: http://localhost:3000

### Credenciales
Una vez en la página web puedes crear tu usuario desde 0 y acceder a las funcionalidades de esta

### Funcionalidades principales

#### 1. Gestión de Inventario
- Agregar, editar y eliminar productos
- Control de stock en tiempo real
- Alertas de stock bajo

#### 2. Gestión de Mesas y Pedidos
- Visualización del estado de mesas
- Creación y seguimiento de pedidos
- Asignación de meseros

#### 3. Predicción de Demanda (IA)
- Análisis histórico de ventas
- Predicción de demanda futura usando Prophet
- Recomendaciones de reabastecimiento


## Tecnologías utilizadas

### Backend
- **Spring Boot 3.x**: Framework principal
- **Spring Cloud Gateway**: API Gateway
- **Spring Security + JWT**: Autenticación y autorización
- **JPA/Hibernate**: ORM para MySQL
- **Maven**: Gestión de dependencias

### Inteligencia Artificial
- **FastAPI**: Framework web para Python
- **Prophet (Meta)**: Modelo de predicción de series temporales
- **Pandas/NumPy**: Procesamiento de datos

### Frontend
- **React 18**: Librería de UI
- **React Router**: Navegación
- **Axios**: Cliente HTTP
- **Tailwind CSS / Material-UI**: Estilos (especifica cuál usas)

### Base de Datos
- **MySQL 8.0**: Base de datos relacional

# PROYECTO DE TÍTULO: SERVESYNC 

Página web de gestión de inventario, manejo de pedidos y predicción de stock con ayuda de inteligencia artificial

## Contenido

- [Requisitos](#requisitos)
- [Dependencias](#dependencias)
- [Instalación](#instalación)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Uso](#uso)

## Requisitos

- Python 3.8 o superior 
- Java 21 o superior
- MySQL 8.0 o superior
- Node.js 18 o superior
- Maven 3.9 o superior
- npm 9 o superior
- XAMPP
- IntelliJ IDEA / VS Code
- 

## Dependencias

- Requirements.txt

## Instalación

### 1. Clonar el repositorio
```bash 
    git clone https://github.com/FernandoBascunan/ServeSync.git
    cd ServeSync
```
### 2. Configurar la base de datos

1. Inicia XAMPP y habilita MySQL
2. Crea 3 bases de datos con los siguientes nombres: servesync_users, servesync_storage, servesync_tables
3. No es necesario importar ningún script — las tablas se crearán automáticamente cuando el backend se inicie.

### 3. Configurar el Backend

1. Abrir el proyecto 
2. En el archivo application.properties de cada microservicio, ajusta:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/"base de datos de cada microservicio"
spring.datasource.username=root
spring.datasource.password=
jwt.secret=clave_secreta_local
```
3. Abrir una terminal por microservicio 
```bash
# Terminal 1
cd Gateway
.\mvnw.cmd spring-boot:run

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
´´´
4. Iniciar Frontend
´´´bash
cd FrontServeSync
npm start 
```

## Arquitectura del proyecto

## Estructura del Proyecto



## Uso
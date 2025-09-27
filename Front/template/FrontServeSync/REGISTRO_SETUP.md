# Configuración de Registro - ServeSync

## ✅ Cambios Implementados

### 1. Peticiones Directas al Gateway
- ✅ Configurado para hacer peticiones directas al Gateway en puerto 8080
- ✅ Uso de `fetch()` nativo para enviar datos al endpoint `/api/usuarios/register`
- ✅ Manejo de errores y respuestas del servidor
- ✅ Sin necesidad de servicio API adicional

### 2. Componente Register (`src/app/user-pages/Register.js`)
- ✅ Convertido a componente con estado
- ✅ Formulario controlado con validación
- ✅ Campos mapeados según el DTO `RegisterRequest` del backend:
  - `nombreUsuario` (requerido)
  - `correo` (requerido)
  - `direccion` (requerido)
  - `rutEmpresa` (requerido)
  - `nombreEmpresa` (requerido)
  - `telefono` (opcional)
  - `rut` (opcional)
  - `password` (requerido, mínimo 6 caracteres)
- ✅ Validación de campos requeridos
- ✅ Manejo de estados de carga
- ✅ Mensajes de éxito y error
- ✅ Redirección automática al dashboard tras registro exitoso

## 🔧 Cómo Probar la Conexión

### Paso 1: Verificar que los servicios estén ejecutándose

1. **Gateway** (puerto 8080):
   ```bash
   cd Back/Gateway
   mvn spring-boot:run
   ```

2. **MS-Users** (puerto 8081):
   ```bash
   cd Back/MS-Users
   mvn spring-boot:run
   ```

3. **Frontend React**:
   ```bash
   cd Front/template/FrontServeSync
   npm start
   ```

### Paso 2: Probar el registro

1. Navegar a `http://localhost:3000/user-pages/register-1`
2. Llenar el formulario con datos de prueba:
   - **Nombre de Usuario**: `testuser`
   - **Correo**: `test@empresa.com`
   - **Dirección**: `Av. Principal 123`
   - **RUT Empresa**: `12345678-9`
   - **Nombre Empresa**: `Empresa Test SPA`
   - **Teléfono**: `+56912345678` (opcional)
   - **RUT Personal**: `12345678-0` (opcional)
   - **Contraseña**: `password123`
   - ✅ Aceptar términos y condiciones

3. Hacer clic en "Registrarse"

### Paso 3: Verificar respuesta

**Éxito**: Debería mostrar mensaje de éxito y redirigir al dashboard
**Error**: Mostrará el mensaje de error específico del backend

## 🔍 Flujo de Datos

```
Frontend (React) → Gateway (8080) → MS-Users (8081) → Base de Datos
```

1. **Frontend**: Usa `fetch()` para enviar POST directamente a `http://localhost:8080/api/usuarios/register`
2. **Gateway**: Rutea `/api/usuarios/**` al MS-Users en puerto 8081
3. **MS-Users**: Procesa el registro y guarda en base de datos
4. **Respuesta**: Gateway devuelve la respuesta al frontend

## 🐛 Posibles Problemas y Soluciones

### Error de CORS
Si aparece error de CORS, agregar al `application.yml` del Gateway:
```yaml
spring:
  cloud:
    gateway:
      globalcors:
        corsConfigurations:
          '[/**]':
            allowedOrigins: "http://localhost:3000"
            allowedMethods: "*"
            allowedHeaders: "*"
```

### Error de Conexión
- Verificar que ambos servicios (Gateway y MS-Users) estén ejecutándose
- Verificar que los puertos 8080 y 8081 estén disponibles
- Revisar logs del Gateway para errores de routing

### Error de Validación
- Verificar que todos los campos requeridos estén completos
- El RUT de empresa debe ser único en la base de datos
- La contraseña debe tener al menos 6 caracteres

## 📝 Notas Técnicas

- El frontend hace peticiones directas al Gateway usando `fetch()` nativo
- No se requiere servicio API adicional - las APIs ya están en el Gateway
- Los datos se envían como JSON en el cuerpo de la petición
- El backend valida la unicidad del RUT de empresa
- La contraseña se encripta usando BCrypt en el backend
- El usuario se crea con estado `activo = true` por defecto

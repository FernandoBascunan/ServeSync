// Script para probar la conexión con el Gateway
// Ejecutar con: node test-connection.js

const registerData = {
  nombreUsuario: "Eduardo",
  correo: "Engelsope@gmail.com",
  direccion: "Colcuira 565",
  rutEmpresa: "78.856.546-5",
  nombreEmpresa: "Peneparao",
  telefono: "4545645654",
  rut: "21.315.306-4",
  password: "password123"
};

const loginData = {
  rutEmpresa: "78.856.546-5",
  password: "password123"
};

async function testRegister() {
  console.log('🔍 Probando REGISTRO con el Gateway...');
  
  try {
    console.log('📡 Enviando petición a: http://localhost:8080/api/usuarios/register');
    
    const response = await fetch('http://localhost:8080/api/usuarios/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    console.log('📊 Status:', response.status);
    console.log('📊 Status Text:', response.statusText);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Registro exitoso! Respuesta:', result);
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ Error en registro:', errorText);
      return false;
    }

  } catch (error) {
    console.log('💥 Error de conexión en registro:', error.message);
    return false;
  }
}

async function testLogin() {
  console.log('\n🔍 Probando LOGIN con el Gateway...');
  
  try {
    console.log('📡 Enviando petición a: http://localhost:8080/api/usuarios/login');
    
    const response = await fetch('http://localhost:8080/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    console.log('📊 Status:', response.status);
    console.log('📊 Status Text:', response.statusText);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Login exitoso! Respuesta:', result);
      
      if (result.success) {
        console.log('🎉 Token recibido:', result.token);
        console.log('👤 Usuario:', result.username);
        console.log('🔑 ID:', result.privateKey);
      }
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ Error en login:', errorText);
      return false;
    }

  } catch (error) {
    console.log('💥 Error de conexión en login:', error.message);
    
    if (error.message.includes('fetch')) {
      console.log('🔧 Posibles soluciones:');
      console.log('   1. Verificar que el Gateway esté ejecutándose en puerto 8080');
      console.log('   2. Verificar que el MS-Users esté ejecutándose en puerto 8081');
      console.log('   3. Reiniciar el Gateway después de agregar la configuración CORS');
    }
    return false;
  }
}

async function runTests() {
  console.log('🚀 Iniciando pruebas de conexión...\n');
  
  // Primero probar registro
  const registerSuccess = await testRegister();
  
  if (registerSuccess) {
    // Si el registro fue exitoso, probar login
    await testLogin();
  } else {
    console.log('\n⚠️  Saltando prueba de login porque el registro falló');
  }
  
  console.log('\n✨ Pruebas completadas');
}

// Ejecutar las pruebas
runTests();

// Script para crear un usuario de prueba con contraseña conocida
console.log('🔍 Creando usuario de prueba...');

const testUserData = {
  nombreUsuario: "testuser",
  correo: "test@test.com",
  direccion: "Dirección Test 123",
  rutEmpresa: "12345678-9",
  nombreEmpresa: "Empresa Test SPA",
  telefono: "123456789",
  rut: "12345678-0",
  password: "test123"
};

async function createTestUser() {
  try {
    console.log('📡 Registrando usuario de prueba...');
    
    const response = await fetch('http://localhost:8080/api/usuarios/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testUserData),
    });

    console.log('📊 Status:', response.status);
    console.log('📊 Status Text:', response.statusText);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Usuario de prueba creado exitosamente!');
      console.log('   ID:', result.id);
      console.log('   RUT Empresa:', result.rutEmpresa);
      console.log('   Nombre Empresa:', result.nombreEmpresa);
      console.log('\n🎉 Ahora puedes hacer login con:');
      console.log('   RUT Empresa: 12345678-9');
      console.log('   Contraseña: test123');
    } else {
      const errorText = await response.text();
      console.log('❌ Error al crear usuario:', errorText);
    }

  } catch (error) {
    console.log('💥 Error de conexión:', error.message);
  }
}

createTestUser();

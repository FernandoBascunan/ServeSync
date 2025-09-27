// Script que simula exactamente lo que hace el frontend
console.log('🔍 Simulando petición del frontend...');

const loginData = {
  rutEmpresa: "78.856.546-5",
  password: "password123"
};

async function testFrontendLogin() {
  try {
    console.log('📡 Enviando petición desde frontend (localhost:3000) a Gateway (localhost:8080)...');
    
    const response = await fetch('http://localhost:8080/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(loginData),
    });

    console.log('📊 Status:', response.status);
    console.log('📊 Status Text:', response.statusText);
    console.log('📊 Headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Login exitoso desde frontend!');
      console.log('   Token:', result.token ? 'Generado' : 'No generado');
      console.log('   Usuario:', result.username);
      console.log('   Success:', result.success);
    } else {
      const errorText = await response.text();
      console.log('❌ Error:', errorText);
    }

  } catch (error) {
    console.log('💥 Error de conexión:', error.message);
    console.log('🔧 Tipo de error:', error.name);
    
    if (error.message.includes('Failed to fetch')) {
      console.log('🔍 Posibles causas:');
      console.log('   1. Gateway no está ejecutándose en puerto 8080');
      console.log('   2. Problema de CORS');
      console.log('   3. Problema de red/firewall');
      console.log('   4. El frontend no puede acceder al backend');
    }
  }
}

testFrontendLogin();

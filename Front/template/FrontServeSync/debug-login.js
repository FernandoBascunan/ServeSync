// Script de diagnóstico para el login
console.log('🔍 Iniciando diagnóstico del login...');

// Datos de prueba
const loginData = {
  rutEmpresa: "78.856.546-5",
  password: "password123"
};

// Función para probar login
async function testLogin() {
  console.log('📡 Probando login directo al MS-Users...');
  
  try {
    const response = await fetch('http://localhost:8081/api/usuarios/login', {
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
      console.log('✅ Login exitoso!', result);
    } else {
      const errorText = await response.text();
      console.log('❌ Error:', errorText);
    }

  } catch (error) {
    console.log('💥 Error de conexión:', error.message);
    console.log('🔧 Tipo de error:', error.name);
  }
}

// Función para probar preflight OPTIONS
async function testPreflight() {
  console.log('\n📡 Probando preflight OPTIONS...');
  
  try {
    const response = await fetch('http://localhost:8081/api/usuarios/login', {
      method: 'OPTIONS',
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });

    console.log('📊 OPTIONS Status:', response.status);
    console.log('📊 OPTIONS Headers:', Object.fromEntries(response.headers.entries()));

  } catch (error) {
    console.log('💥 Error en OPTIONS:', error.message);
  }
}

// Ejecutar pruebas
async function runDiagnostics() {
  await testPreflight();
  await testLogin();
  console.log('\n✨ Diagnóstico completado');
}

runDiagnostics();

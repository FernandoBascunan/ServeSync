// Script que simula exactamente el comportamiento del navegador
console.log('🔍 Simulando comportamiento del navegador...');

const loginData = {
  rutEmpresa: "12345678-9",
  password: "test123"
};

async function testBrowserSimulation() {
  console.log('🌐 Simulando petición desde navegador...');
  
  try {
    // Configuración exacta del navegador
    const response = await fetch('http://localhost:8080/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify(loginData),
    });

    console.log('📊 Status:', response.status);
    console.log('📊 Status Text:', response.statusText);
    console.log('📊 Headers CORS:');
    console.log('   Access-Control-Allow-Origin:', response.headers.get('Access-Control-Allow-Origin'));
    console.log('   Access-Control-Allow-Methods:', response.headers.get('Access-Control-Allow-Methods'));
    console.log('   Access-Control-Allow-Headers:', response.headers.get('Access-Control-Allow-Headers'));

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Login exitoso!');
      console.log('   Token:', result.token ? 'Generado' : 'No generado');
      console.log('   Usuario:', result.username);
    } else {
      const errorText = await response.text();
      console.log('❌ Error:', errorText);
    }

  } catch (error) {
    console.log('💥 Error de conexión:', error.message);
    console.log('🔧 Tipo de error:', error.name);
    
    if (error.name === 'TypeError') {
      console.log('🔍 Error de tipo TypeError - posible problema de CORS o red');
    }
  }
}

// Probar también con diferentes URLs
async function testDifferentUrls() {
  const urls = [
    'http://localhost:8080/api/usuarios/login',
    'http://127.0.0.1:8080/api/usuarios/login',
    'http://localhost:8081/api/usuarios/login'
  ];

  for (const url of urls) {
    console.log(`\n🔍 Probando URL: ${url}`);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(loginData),
      });

      console.log(`   Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        console.log('   ✅ Funciona!');
        break;
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
}

async function runTests() {
  await testBrowserSimulation();
  await testDifferentUrls();
  console.log('\n✨ Pruebas completadas');
}

runTests();

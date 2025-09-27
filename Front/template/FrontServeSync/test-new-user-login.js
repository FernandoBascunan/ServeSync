// Script para probar login con el nuevo usuario de prueba
console.log('🔍 Probando login con usuario de prueba...');

const loginData = {
  rutEmpresa: "12345678-9",
  password: "test123"
};

async function testNewUserLogin() {
  try {
    console.log('📡 Probando login con usuario de prueba...');
    
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

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Login exitoso!');
      console.log('   Token:', result.token ? 'Generado correctamente' : 'No generado');
      console.log('   Usuario:', result.username);
      console.log('   Success:', result.success);
      console.log('   ID:', result.privateKey);
      
      console.log('\n🎉 ¡El login funciona perfectamente!');
      console.log('📝 Usa estas credenciales en el frontend:');
      console.log('   RUT Empresa: 12345678-9');
      console.log('   Contraseña: test123');
    } else {
      const errorText = await response.text();
      console.log('❌ Error:', errorText);
    }

  } catch (error) {
    console.log('💥 Error de conexión:', error.message);
  }
}

testNewUserLogin();

// Script para probar diferentes contraseñas
console.log('🔍 Probando diferentes contraseñas...');

const passwords = [
  "password123",
  "Password123", 
  "PASSWORD123",
  "123456",
  "admin",
  "test",
  "password",
  "123456789"
];

async function testPassword(password) {
  const loginData = {
    rutEmpresa: "78.856.546-5",
    password: password
  };

  try {
    const response = await fetch('http://localhost:8081/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ CONTRASEÑA CORRECTA: "${password}"`);
      console.log('   Token:', result.token ? 'Generado' : 'No generado');
      console.log('   Usuario:', result.username);
      return true;
    } else {
      console.log(`❌ "${password}" - Error ${response.status}`);
      return false;
    }

  } catch (error) {
    console.log(`💥 "${password}" - Error: ${error.message}`);
    return false;
  }
}

async function testAllPasswords() {
  console.log('🧪 Probando contraseñas comunes...\n');
  
  for (const password of passwords) {
    const success = await testPassword(password);
    if (success) {
      console.log(`\n🎉 ¡Contraseña encontrada! Usa: "${password}"`);
      break;
    }
  }
  
  console.log('\n✨ Prueba de contraseñas completada');
}

testAllPasswords();

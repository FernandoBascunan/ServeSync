// Script para verificar el usuario en la base de datos
console.log('🔍 Verificando usuario en la base de datos...');

async function checkUser() {
  try {
    // Primero, obtener información del usuario
    const response = await fetch('http://localhost:8081/api/usuarios/1', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('📊 Status:', response.status);
    
    if (response.ok) {
      const user = await response.json();
      console.log('✅ Usuario encontrado:');
      console.log('   ID:', user.id);
      console.log('   RUT Empresa:', user.rutEmpresa);
      console.log('   Nombre Empresa:', user.nombreEmpresa);
      console.log('   Correo:', user.correo);
      console.log('   Contraseña (hash):', user.password ? user.password.substring(0, 20) + '...' : 'No disponible');
      console.log('   Activo:', user.activo);
      
      // Verificar si la contraseña está encriptada
      if (user.password && user.password.startsWith('$2a$')) {
        console.log('✅ La contraseña está encriptada con BCrypt');
      } else {
        console.log('❌ La contraseña NO está encriptada');
      }
      
    } else {
      const errorText = await response.text();
      console.log('❌ Error al obtener usuario:', errorText);
    }

  } catch (error) {
    console.log('💥 Error de conexión:', error.message);
  }
}

checkUser();

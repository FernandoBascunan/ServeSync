package servesync.users.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// Desactiva la protección CSRF (útil en APIs REST), permite el acceso libre a las rutas de
// registro, login y edición de usuario,y exige autenticación para el resto de las peticiones.

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/usuarios/register",
                                "/api/usuarios/login",
                                "/api/usuarios/edit",
                                "/api/usuarios/password",
                                "/api/usuarios/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}

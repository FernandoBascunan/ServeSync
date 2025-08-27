package servesync.Inventario.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // Se obtiene el valor de la variable de entorno JWT_SECRET
    //@Value("${JWT_SECRET}")
    //private String jwtSecret;

    /*@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/inventario/**","/api/ordenCompra/**","/api/ventas/**").authenticated()
                        .anyRequest().permitAll()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtSecret),
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }*/

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // deshabilita CSRF para pruebas con Postman
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // permitimos register y login
                        .anyRequest().authenticated() // el resto requiere autenticación
                );

        return http.build();
    }
}

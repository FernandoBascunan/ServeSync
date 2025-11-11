package com.servesync.Gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

//Esta clase configura el CORS global para el API Gateway de ServeSync.
// Permite que el frontend se comunique con los microservicios sin errores de política de origen cruzado.

@Configuration // Indica que esta clase define una configuración de Spring.
public class GatewayCorsConfig {

    @Bean // Define un bean que se cargará en el contexto de Spring.
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // Permite peticiones desde el frontend local (React).
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        // Define los métodos HTTP permitidos.
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        // Permite todos los encabezados en las solicitudes.
        config.setAllowedHeaders(Arrays.asList("*"));
        // Habilita el envío de cookies o tokens en las solicitudes.
        config.setAllowCredentials(true);
        // Aplica la configuración CORS a todas las rutas del Gateway.
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        // Devuelve el filtro CORS configurado para el Gateway.
        return new CorsWebFilter(source);
    }
}
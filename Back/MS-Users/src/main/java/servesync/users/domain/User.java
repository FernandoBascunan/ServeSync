package servesync.users.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.time.LocalDate;

// La clase User representa la entidad JPA del usuario dentro del microservicio de usuarios de ServeSync.
// Mapea la tabla Usuario en la base de datos e incluye los atributos de la empresa y del usuario,
// junto con datos de auditoría (fechaRegistro y fechaActualizacion).

@Entity
@Table(name= "Usuario")
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nombreEmpresa;
    @Column(unique = true)
    private String rutEmpresa;
    private String correo;
    private String direccion;
    private String telefono;
    @CreatedDate
    private LocalDate fechaRegistro;
    @LastModifiedDate
    private LocalDate fechaActualizacion;
    private String nombreUsuario;
    private String rut;
    private String password;
    private Boolean activo= true;

}
